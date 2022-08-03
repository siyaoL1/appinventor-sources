// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2013-2014 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @license
 * @fileoverview Visual blocks editor for App Inventor
 * Methods to handle serialization of the blocks workspace
 *
 * @author sharon@google.com (Sharon Perl)
 */

'use strict';

goog.provide('Blockly.FieldProcedure');
goog.provide('Blockly.AIProcedure');


Blockly.FieldProcedure.defaultValue = ["",""];

Blockly.FieldProcedure.onChange = function(procedureId) {
  var workspace = this.block.getTopWorkspace();
  if(!this.block.editable_){ // [lyn, 10/14/13] .editable is undefined on blocks. Changed to .editable_
    workspace = Blockly.Drawer.flyout_.workspace_;
    return;
  }

  var def = workspace.getProcedureDatabase().getProcedure(procedureId);
  if (!def) return;  // loading but the definition block hasn't been processed yet.
  var text = def.getFieldValue('NAME');
  if(text == "" || text != this.getValue()) {
    for(var i=0;this.block.getInput('ARG' + i) != null;i++){
      this.block.removeInput('ARG' + i);
    }
    //return;
  }
  this.setValue(text);
  if(def) {
    // [lyn, 10/27/13] Lyn sez: this causes complications (e.g., might open up mutator on collapsed procedure
    //   declaration block) and is no longer necessary with changes to setProedureParameters.
    // if(def.paramIds_ == null){
    //  def.mutator.setVisible(true);
    //  def.mutator.shouldHide = true;
    //}
    this.block.setProcedureParameters(def.arguments_, def.paramIds_, true); // It's OK if def.paramIds is null
  }
};

Blockly.AIProcedure.getProcedureNames = function(returnValue, opt_workspace) {
  var workspace = opt_workspace || Blockly.mainWorkspace;
  var topBlocks = workspace.getTopBlocks();
  var procNameArray = [Blockly.FieldProcedure.defaultValue];
  for(var i=0;i<topBlocks.length;i++){
    var procName = topBlocks[i].getFieldValue('NAME')
    if(topBlocks[i].type == "procedures_defnoreturn" && !returnValue) {
      procNameArray.push([procName,procName]);
    } else if (topBlocks[i].type == "procedures_defreturn" && returnValue) {
      procNameArray.push([procName,procName]);
    }
  }
  if(procNameArray.length > 1 ){
    procNameArray.splice(0,1);
  }
  return procNameArray;
};

// [lyn, 10/22/13] Return a list of all procedure declaration blocks
// If returnValue is false, lists all fruitless procedure declarations (defnoreturn)
// If returnValue is true, lists all fruitful procedure declaraations (defreturn)
Blockly.AIProcedure.getProcedureDeclarationBlocks = function(returnValue, opt_workspace) {
  var workspace = opt_workspace || Blockly.mainWorkspace;
  var topBlocks = workspace.getTopBlocks(false);
  var blockArray = [];
  for(var i=0;i<topBlocks.length;i++){
    if(topBlocks[i].type == "procedures_defnoreturn" && !returnValue) {
      blockArray.push(topBlocks[i]);
    } else if (topBlocks[i].type == "procedures_defreturn" && returnValue) {
      blockArray.push(topBlocks[i]);
    }
  }
  return blockArray;
};

Blockly.AIProcedure.getAllProcedureDeclarationBlocksExcept = function (block) {
  var topBlocks = block.workspace.getTopBlocks(false);
  var blockArray = [];
  for (var i=0;i<topBlocks.length;i++){
    if(topBlocks[i].type === "procedures_defnoreturn" || topBlocks[i].type === "procedures_defreturn") {
      if (topBlocks[i] !== block) {
        blockArray.push(topBlocks[i]);
      }
    }
  }
  return blockArray;
};

Blockly.AIProcedure.getAllProcedureDeclarationNames = function () {
  var procBlocks = Blockly.AIProcedure.getAllProcedureDeclarationBlocks();
  return procBlocks.map(function (decl) { return decl.getFieldValue('NAME'); });
};

Blockly.AIProcedure.removeProcedureValues = function(name, workspace) {
  if (workspace  // [lyn, 04/13/14] ensure workspace isn't undefined
      && workspace === Blockly.mainWorkspace) {
    var blockArray = workspace.getAllBlocks();
    for(var i=0;i<blockArray.length;i++){
      var block = blockArray[i];
      if(block.type == "procedures_callreturn" || block.type == "procedures_callnoreturn") {
        if(block.getFieldValue('PROCNAME') == name) {
          block.removeProcedureValue();
        }
      } else if (block.type == "lists_map_proc") {
        block.updateProcedureDropdown(true);
      }
    }
  }
};

// [lyn, 10/27/13] Defined as a replacement for Blockly.Procedures.rename
/**
 * Rename a procedure definition to a new name.
 *
 * @this AI.Blockly.FieldProcedureName
 * @param {!string} newName New name for the procedure represented by the field's source block
 * @returns {string} The new, validated name of the block
 */
Blockly.AIProcedure.renameProcedure = function (newName) {
  // this is bound to field_textinput object
  var oldName = this.oldName_ || this.text_;

  // [lyn, 10/27/13] now check legality of identifiers
  newName = Blockly.LexicalVariable.makeLegalIdentifier(newName);

  // [lyn, 10/28/13] Prevent two procedures from having the same name.
  var procBlocks = Blockly.AIProcedure.getAllProcedureDeclarationBlocksExcept(this.sourceBlock_);
  var procNames = procBlocks.map(function (decl) { return decl.getFieldValue('NAME'); });
  newName = Blockly.FieldLexicalVariable.nameNotIn(newName, procNames);
  // Rename any callers.
  var blocks = this.sourceBlock_.workspace.getAllBlocks();
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].renameProcedure;
    if (func) {
      func.call(blocks[x], oldName, newName);
    }
  }
  this.oldName_ = newName;
  return newName;
};
