// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2013-2014 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @license
 * @fileoverview Lists blocks for Blockly, modified for MIT App Inventor.
 * @author mckinney@mit.edu (Andrew F. McKinney)
 */

'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks.Utilities');

Blockly.Blocks['lists_create_with'] = {
  // Create a list with any number of elements of any type.
  category: 'Lists',
  helpUrl: Blockly.Msg.LANG_LISTS_CREATE_WITH_EMPTY_HELPURL,
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('ADD0')
        .appendField(Blockly.Msg.LANG_LISTS_CREATE_WITH_TITLE_MAKE_LIST);
    this.appendValueInput('ADD1');
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.OUTPUT));
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.Msg.LANG_LISTS_CREATE_WITH_TOOLTIP);
    this.itemCount_ = 2;
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'ADD';
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function(workspace){
    return Blockly.decompose(workspace,'lists_create_with_item',this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function(){
    this.appendDummyInput(this.emptyInputName)
      .appendField(Blockly.Msg.LANG_LISTS_CREATE_EMPTY_TITLE);
  },
  addInput: function(inputNum){
    var input = this.appendValueInput(this.repeatingInputName + inputNum);
    if(inputNum === 0){
      input.appendField(Blockly.Msg.LANG_LISTS_CREATE_WITH_TITLE_MAKE_LIST);
    }
    return input;
  },
  updateContainerBlock: function(containerBlock) {
    containerBlock.setFieldValue(Blockly.Msg.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD,"CONTAINER_TEXT");
  },
  // create type blocks for both make a list (two items) and create empty list
  typeblock: [
      { translatedName: Blockly.Msg.LANG_LISTS_CREATE_WITH_TITLE_MAKE_LIST,
        mutatorAttributes: { items: 2 } },
      { translatedName: Blockly.Msg.LANG_LISTS_CREATE_EMPTY_TITLE,
        mutatorAttributes: { items: 0 } }]
};

Blockly.Blocks['lists_create_with_item'] = {
  // Add items.
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LANG_LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};


Blockly.Blocks['lists_add_items'] = {
  // Create a list with any number of elements of any type.
  category: 'Lists',
  helpUrl: Blockly.Msg.LANG_LISTS_ADD_ITEMS_HELPURL,
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_ADD_ITEMS_TITLE_ADD)
      .appendField(Blockly.Msg.LANG_LISTS_ADD_ITEMS_INPUT_LIST);
    this.appendValueInput('ITEM0')
      .appendField(Blockly.Msg.LANG_LISTS_ADD_ITEMS_INPUT_ITEM)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_ADD_ITEMS_TOOLTIP);
    this.setMutator(new Blockly.Mutator(['lists_add_items_item']));
    this.itemCount_ = 1;
    this.emptyInputName = null;
    this.repeatingInputName = 'ITEM';
    this.changeList = true;
  },
  updateBlock_: function() {
	  if (this.changeList) {
	    if (this.outputConnection && this.outputConnection.targetConnection) {
	      this.outputConnection.disconnect();
	         
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;
	    }
	       
	    if (this.outputConnection) {
	      if (this.outputConnection.inDB_) {
	        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	      }
	      this.outputConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.outputConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.outputConnection) {
	        Blockly.localConnection_ = null;
	      } 
	    }
	       
	    this.outputConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_DEST_TITLE_MAP, 'TITLE');
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	    this.render();
	       
	  } else {
	    if (this.previousConnection && this.previousConnection.targetConnection) {
	      this.previousConnection.disconnect();
	        
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;      
	   }
	       
	    if (this.previousConnection) {
	      if (this.previousConnection.inDB_) {
	        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	      }
	      this.previousConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.previousConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.previousConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    if (this.nextConnection) { 
	      if (this.nextConnection.inDB_) {
	        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	      }
	      this.nextConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.nextConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    this.previousConnection = null;
	    this.nextConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_NONDEST_TITLE_MAP, 'TITLE');
	    this.setOutput(true, null);
	    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	    this.render();
	     }
	  },
	  mutationToDom: function() {
	    var container = document.createElement('mutation');
	    if (! this.changeList) {
	      container.setAttribute('destructive', this.changeList);
	    }
	    container.setAttribute('items', this.itemCount_);
	    return container;
	  },
	  domToMutation: function(xmlElement) {
		  if(this.valuesToSave != null){
			    for (var name in this.valuesToSave) {
			      this.valuesToSave[name] = this.getFieldValue(name);
			    }
			  }

			  for (var x = 0; x < this.itemCount_; x++) {
			    this.removeInput(this.repeatingInputName + x);
			  }
			  this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
			  for (var x = 0; x < this.itemCount_; x++) {
			    this.addInput(x);
			  }
			  if (this.itemCount_ == 0) {
			    this.addEmptyInput();
			  }  
		  
	    if(!xmlElement.getAttribute('destructive')){
	      this.changeList = true;
	    } else {
	      this.changeList = (xmlElement.getAttribute('destructive') == "true");
	    }    
	    this.updateBlock_();
	  },
	  decompose: function(workspace) {
		  var containerBlockName = 'mutator_container';
		  //var itemBlockName = 'mutator_item';
		  var containerBlock = new Blockly.Block.obtain(workspace,containerBlockName);
		  containerBlock.setColour(this.getColour());
		  if(this.updateContainerBlock != null){
		    this.updateContainerBlock(containerBlock);
		  }
		  containerBlock.initSvg();
		  var connection = containerBlock.getInput('STACK').connection;
		  for (var x = 0; x < this.itemCount_; x++) {
		    var itemBlock = new Blockly.Block.obtain(workspace, 'lists_add_items_item');
		    itemBlock.initSvg();
		    connection.connect(itemBlock.previousConnection);
		    connection = itemBlock.nextConnection;
		  }
	    //var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
	    //containerBlock.initSvg();
	    var changeListButton = containerBlock.getField_('CHANGE_LIST');
	    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
	    var group = changeListButton.group;
	    if (this.changeList) {
	      group.setSelected(changeListButton);
	    } else {
	      group.setSelected(makeNewListButton);
	    }    
	    return containerBlock;
	  },
	  compose: function(containerBlock) {
		  if(this.valuesToSave != null){
			    for (var name in this.valuesToSave) {
			      this.valuesToSave[name] = this.getFieldValue(name);
			    }
			  }
			  // Disconnect all input blocks and destroy all inputs.
			  if (this.itemCount_ == 0) {
			    if(this.emptyInputName != null) {
			      this.removeInput(this.emptyInputName);
			    }
			  } else {
			    for (var x = this.itemCount_ - 1; x >= 0; x--) {
			      this.removeInput(this.repeatingInputName + x);
			    }
			  }
			  this.itemCount_ = 0;
			  // Rebuild the block's inputs.
			  var itemBlock = containerBlock.getInputTargetBlock('STACK');
			  while (itemBlock) {

			    var input = this.addInput(this.itemCount_)

			    // Reconnect any child blocks.
			    if (itemBlock.valueConnection_) {
			      input.connection.connect(itemBlock.valueConnection_);
			    }
			    this.itemCount_++;
			    itemBlock = itemBlock.nextConnection &&
			      itemBlock.nextConnection.targetBlock();
			  }
			  if (this.itemCount_ == 0) {

			    this.addEmptyInput();
			  }  
		  
	    this.oldChangeList = this.changeList;
	    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
	    if (this.oldChangeList != this.changeList) {
	     this.updateBlock_();
	    }
	  },
	  saveConnections: Blockly.saveConnections,
	  addEmptyInput: function(){},
	  addInput: function(inputNum){
	    var input = this.appendValueInput(this.repeatingInputName + inputNum);
	    input.appendField('item').setAlign(Blockly.ALIGN_RIGHT);
	    return input;
	  },
	  updateContainerBlock: function(containerBlock) {
		var group = new Blockly.RadioButtonGroup();
		containerBlock.appendDummyInput()
		   .appendField(new Blockly.FieldRadioButton(group), 'CHANGE_LIST')
		   .appendField("changes existing list");
		containerBlock.appendDummyInput()
		   .appendField(new Blockly.FieldRadioButton(group), 'MAKE_NEW_LIST')
		   .appendField("makes new list");
	    containerBlock.setFieldValue(Blockly.Msg.LANG_LISTS_ADD_ITEMS_CONTAINER_TITLE_ADD,"CONTAINER_TEXT");
	    containerBlock.setTooltip(Blockly.Msg.LANG_LISTS_ADD_ITEMS_CONTAINER_TOOLTIP);
	  },
	  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_ADD_ITEMS_TITLE_ADD }]
	};

Blockly.Blocks['lists_add_items_item'] = {
  // Add items.
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LANG_LISTS_ADD_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_ADD_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['lists_is_in'] = {
  // Is in list?.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_IS_IN_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_IS_IN_INPUT,
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("boolean",Blockly.Blocks.Utilities.OUTPUT));
    this.setTooltip(Blockly.Msg.LANG_LISTS_IS_IN_TOOLTIP);
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_IS_IN_TITLE_IS_IN }]
};


Blockly.Blocks['lists_length'] = {
  // Length of list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_LENGTH_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('LIST')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_LENGTH_INPUT_LENGTH)
      .appendField(Blockly.Msg.LANG_LISTS_LENGTH_INPUT_LIST);
    this.setTooltip(Blockly.Msg.LANG_LISTS_LENGTH_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_LENGTH_INPUT_LENGTH }]
};

Blockly.Blocks['lists_is_empty'] = {
  // Is the list empty?.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_IS_EMPTY_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("boolean",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('LIST')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_TITLE_IS_EMPTY)
      .appendField(Blockly.Msg.LANG_LISTS_INPUT_LIST);
    this.setTooltip(Blockly.Msg.LANG_LISTS_IS_EMPTY_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_TITLE_IS_EMPTY }]
};

Blockly.Blocks['lists_pick_random_item'] = {
  // Length of list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_PICK_RANDOM_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    this.appendValueInput('LIST')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_PICK_RANDOM_TITLE_PICK_RANDOM)
      .appendField(Blockly.Msg.LANG_LISTS_PICK_RANDOM_ITEM_INPUT_LIST);
    this.setTooltip(Blockly.Msg.LANG_LISTS_PICK_RANDOM_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_PICK_RANDOM_TITLE_PICK_RANDOM }]
};

Blockly.Blocks['lists_position_in'] = {
  // Postion of item in list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_POSITION_IN_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.OUTPUT));
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_POSITION_IN_INPUT,
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.Msg.LANG_LISTS_POSITION_IN_TOOLTIP);
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_POSITION_IN_TITLE_POSITION }]
};


Blockly.Blocks['lists_select_item'] = {
  // Select from list an item.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_SELECT_ITEM_TITLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    var checkTypeNumber = Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_SELECT_ITEM_INPUT,
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NUM', checkTypeNumber, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.Msg.LANG_LISTS_SELECT_ITEM_TOOLTIP);
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_SELECT_ITEM_TITLE_SELECT }]
};

Blockly.Blocks['lists_insert_item'] = {
  // Insert Item in list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_INSERT_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    var checkTypeNumber = Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.INPUT);
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_INSERT_INPUT,
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['INDEX', checkTypeNumber, Blockly.ALIGN_RIGHT],
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_INSERT_TOOLTIP);
    this.setInputsInline(false);
    this.setMutator(new Blockly.Mutator([]));
    this.changeList = true;
  },
  updateBlock_: function() {
	  if (this.changeList) {
	    if (this.outputConnection && this.outputConnection.targetConnection) {
	      this.outputConnection.disconnect();
	         
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;
	    }
	       
	    if (this.outputConnection) {
	      if (this.outputConnection.inDB_) {
	        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	      }
	      this.outputConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.outputConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.outputConnection) {
	        Blockly.localConnection_ = null;
	      } 
	    }
	       
	    this.outputConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_DEST_TITLE_MAP, 'TITLE');
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	    this.render();
	       
	  } else {
	    if (this.previousConnection && this.previousConnection.targetConnection) {
	      this.previousConnection.disconnect();
	        
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;      
	   }
	       
	    if (this.previousConnection) {
	      if (this.previousConnection.inDB_) {
	        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	      }
	      this.previousConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.previousConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.previousConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    if (this.nextConnection) { 
	      if (this.nextConnection.inDB_) {
	        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	      }
	      this.nextConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.nextConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    this.previousConnection = null;
	    this.nextConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_NONDEST_TITLE_MAP, 'TITLE');
	    this.setOutput(true, null);
	    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	    this.render();
	     }
	  },
	  mutationToDom: function() {
	    var container = document.createElement('mutation');
	    if (! this.changeList) {
	      container.setAttribute('destructive', this.changeList);
	    }     
	    return container;
	  },
	  domToMutation: function(xmlElement) {
	    if(!xmlElement.getAttribute('destructive')){
	      this.changeList = true;
	    } else {
	      this.changeList = (xmlElement.getAttribute('destructive') == "true");
	    }    
	    this.updateBlock_();
	  },
	  decompose: function(workspace) {
	    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
	    containerBlock.initSvg();
	    var changeListButton = containerBlock.getField_('CHANGE_LIST');
	    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
	    var group = changeListButton.group;
	    if (this.changeList) {
	      group.setSelected(changeListButton);
	    } else {
	      group.setSelected(makeNewListButton);
	    }    
	    return containerBlock;
	  },
	  compose: function(containerBlock) {
	 this.oldChangeList = this.changeList;
	    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
	    if (this.oldChangeList != this.changeList) {
	     this.updateBlock_();
	    }
	  },
	  saveConnections: Blockly.saveConnections,
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_INSERT_TITLE_INSERT_LIST }]
};

Blockly.Blocks['lists_replace_item'] = {
  // Replace Item in list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_REPLACE_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    var checkTypeNumber = Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.INPUT);
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_REPLACE_ITEM_INPUT,
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NUM', checkTypeNumber, Blockly.ALIGN_RIGHT],
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_REPLACE_ITEM_TOOLTIP);
    this.setInputsInline(false);
    this.setMutator(new Blockly.Mutator([]));
    this.changeList = true;
  },
  updateBlock_: function() {
	  if (this.changeList) {
	    if (this.outputConnection && this.outputConnection.targetConnection) {
	      this.outputConnection.disconnect();
	         
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;
	    }
	       
	    if (this.outputConnection) {
	      if (this.outputConnection.inDB_) {
	        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	      }
	      this.outputConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.outputConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.outputConnection) {
	        Blockly.localConnection_ = null;
	      } 
	    }
	       
	    this.outputConnection = null;
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	    this.render();
	       
	  } else {
	    if (this.previousConnection && this.previousConnection.targetConnection) {
	      this.previousConnection.disconnect();
	        
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;      
	   }
	       
	    if (this.previousConnection) {
	      if (this.previousConnection.inDB_) {
	        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	      }
	      this.previousConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.previousConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.previousConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    if (this.nextConnection) { 
	      if (this.nextConnection.inDB_) {
	        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	      }
	      this.nextConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.nextConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    this.previousConnection = null;
	    this.nextConnection = null;
	    this.setOutput(true, null);
	    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	    this.render();
	     }
	  },
	  mutationToDom: function() {
	    var container = document.createElement('mutation');
	    if (! this.changeList) {
	      container.setAttribute('destructive', this.changeList);
	    }     
	    return container;
	  },
	  domToMutation: function(xmlElement) {
	    if(!xmlElement.getAttribute('destructive')){
	      this.changeList = true;
	    } else {
	      this.changeList = (xmlElement.getAttribute('destructive') == "true");
	    }    
	    this.updateBlock_();
	  },
	  decompose: function(workspace) {
	    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
	    containerBlock.initSvg();
	    var changeListButton = containerBlock.getField_('CHANGE_LIST');
	    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
	    var group = changeListButton.group;
	    if (this.changeList) {
	      group.setSelected(changeListButton);
	    } else {
	      group.setSelected(makeNewListButton);
	    }    
	    return containerBlock;
	  },
	  compose: function(containerBlock) {
	 this.oldChangeList = this.changeList;
	    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
	    if (this.oldChangeList != this.changeList) {
	     this.updateBlock_();
	    }
	  },
	  saveConnections: Blockly.saveConnections,
	  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_REPLACE_ITEM_TITLE_REPLACE }]
	};

Blockly.Blocks['lists_remove_item'] = {
  // Remove Item in list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_REMOVE_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    var checkTypeNumber = Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_REMOVE_ITEM_INPUT,
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['INDEX', checkTypeNumber, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_REMOVE_ITEM_TOOLTIP);
    this.setInputsInline(false);
    this.setMutator(new Blockly.Mutator([]));
    this.changeList = true;
  },
  updateBlock_: function() {
	  if (this.changeList) {
	    if (this.outputConnection && this.outputConnection.targetConnection) {
	      this.outputConnection.disconnect();
	         
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;
	    }
	       
	    if (this.outputConnection) {
	      if (this.outputConnection.inDB_) {
	        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	      }
	      this.outputConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.outputConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.outputConnection) {
	        Blockly.localConnection_ = null;
	      } 
	    }
	       
	    this.outputConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_DEST_TITLE_MAP, 'TITLE');
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	    this.render();
	       
	  } else {
	    if (this.previousConnection && this.previousConnection.targetConnection) {
	      this.previousConnection.disconnect();
	        
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;      
	   }
	       
	    if (this.previousConnection) {
	      if (this.previousConnection.inDB_) {
	        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	      }
	      this.previousConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.previousConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.previousConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    if (this.nextConnection) { 
	      if (this.nextConnection.inDB_) {
	        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	      }
	      this.nextConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.nextConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    this.previousConnection = null;
	    this.nextConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_NONDEST_TITLE_MAP, 'TITLE');
	    this.setOutput(true, null);
	    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	    this.render();
	     }
	  },
	  mutationToDom: function() {
	    var container = document.createElement('mutation');
	    if (! this.changeList) {
	      container.setAttribute('destructive', this.changeList);
	    }     
	    return container;
	  },
	  domToMutation: function(xmlElement) {
	    if(!xmlElement.getAttribute('destructive')){
	      this.changeList = true;
	    } else {
	      this.changeList = (xmlElement.getAttribute('destructive') == "true");
	    }    
	    this.updateBlock_();
	  },
	  decompose: function(workspace) {
	    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
	    containerBlock.initSvg();
	    var changeListButton = containerBlock.getField_('CHANGE_LIST');
	    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
	    var group = changeListButton.group;
	    if (this.changeList) {
	      group.setSelected(changeListButton);
	    } else {
	      group.setSelected(makeNewListButton);
	    }    
	    return containerBlock;
	  },
	  compose: function(containerBlock) {
	 this.oldChangeList = this.changeList;
	    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
	    if (this.oldChangeList != this.changeList) {
	     this.updateBlock_();
	    }
	  },
	  saveConnections: Blockly.saveConnections,
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_REMOVE_ITEM_TITLE_REMOVE }]
};

Blockly.Blocks['lists_append_list'] = {
  // Append to list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_APPEND_LIST_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_APPEND_LIST_INPUT,
            ['LIST0', checkTypeList, Blockly.ALIGN_RIGHT],
            ['LIST1', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_APPEND_LIST_TOOLTIP);
    this.setInputsInline(false);
    this.setMutator(new Blockly.Mutator([]));
    this.changeList = true;
  },
  updateBlock_: function() {
	  if (this.changeList) {
	    if (this.outputConnection && this.outputConnection.targetConnection) {
	      this.outputConnection.disconnect();
	         
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;
	    }
	       
	    if (this.outputConnection) {
	      if (this.outputConnection.inDB_) {
	        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	      }
	      this.outputConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.outputConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.outputConnection) {
	        Blockly.localConnection_ = null;
	      } 
	    }
	       
	    this.outputConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_DEST_TITLE_MAP, 'TITLE');
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	    this.render();
	       
	  } else {
	    if (this.previousConnection && this.previousConnection.targetConnection) {
	      this.previousConnection.disconnect();
	        
	      var children = this.parentBlock_.childBlocks_;
	      for (var child, x = 0; child = children[x]; x++) {
	        if (child == this) {
	          children.splice(x, 1);
	          break;
	        }
	      }
	      this.setParent(null);
	      this.parentBlock_ = null;      
	   }
	       
	    if (this.previousConnection) {
	      if (this.previousConnection.inDB_) {
	        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	      }
	      this.previousConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.previousConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.previousConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    if (this.nextConnection) { 
	      if (this.nextConnection.inDB_) {
	        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	      }
	      this.nextConnection.inDB_ = false;
	      if (Blockly.highlightedConnection_ == this.nextConnection) {
	        Blockly.highlightedConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	      if (Blockly.localConnection_ == this.nextConnection) {
	        Blockly.localConnection_ = null;
	      }
	    }
	       
	    this.previousConnection = null;
	    this.nextConnection = null;
	    //this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_NONDEST_TITLE_MAP, 'TITLE');
	    this.setOutput(true, null);
	    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	    this.render();
	     }
	  },
	  mutationToDom: function() {
	    var container = document.createElement('mutation');
	    if (! this.changeList) {
	      container.setAttribute('destructive', this.changeList);
	    }     
	    return container;
	  },
	  domToMutation: function(xmlElement) {
	    if(!xmlElement.getAttribute('destructive')){
	      this.changeList = true;
	    } else {
	      this.changeList = (xmlElement.getAttribute('destructive') == "true");
	    }    
	    this.updateBlock_();
	  },
	  decompose: function(workspace) {
	    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
	    containerBlock.initSvg();
	    var changeListButton = containerBlock.getField_('CHANGE_LIST');
	    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
	    var group = changeListButton.group;
	    if (this.changeList) {
	      group.setSelected(changeListButton);
	    } else {
	      group.setSelected(makeNewListButton);
	    }    
	    return containerBlock;
	  },
	  compose: function(containerBlock) {
	 this.oldChangeList = this.changeList;
	    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
	    if (this.oldChangeList != this.changeList) {
	     this.updateBlock_();
	    }
	  },
	  saveConnections: Blockly.saveConnections,
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_APPEND_LIST_TITLE_APPEND }]
};


Blockly.Blocks['lists_copy'] = {
  // Make a copy of list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_COPY_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('LIST')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_COPY_TITLE_COPY)
      .appendField(Blockly.Msg.LANG_LISTS_COPY_INPUT_LIST);
    this.setTooltip(Blockly.Msg.LANG_LISTS_COPY_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_COPY_TITLE_COPY }]
};

Blockly.Blocks['lists_is_list'] = {
  // Is a list?
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_IS_LIST_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("boolean",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('ITEM')
      .appendField(Blockly.Msg.LANG_LISTS_IS_LIST_TITLE_IS_LIST)
      .appendField(Blockly.Msg.LANG_LISTS_IS_LIST_INPUT_THING);
    this.setTooltip(Blockly.Msg.LANG_LISTS_IS_LIST_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_IS_LIST_TITLE_IS_LIST }]
};

Blockly.Blocks['lists_to_csv_row'] = {
  // Make a csv row from list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_TO_CSV_ROW_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('LIST')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_TO_CSV_ROW_TITLE_TO_CSV)
      .appendField(Blockly.Msg.LANG_LISTS_TO_CSV_ROW_INPUT_LIST);
    this.setTooltip(Blockly.Msg.LANG_LISTS_TO_CSV_ROW_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_TO_CSV_ROW_TITLE_TO_CSV }]
};

Blockly.Blocks['lists_to_csv_table'] = {
  // Make a csv table from list.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_TO_CSV_TABLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('LIST')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_TO_CSV_TABLE_TITLE_TO_CSV)
      .appendField(Blockly.Msg.LANG_LISTS_TO_CSV_TABLE_INPUT_LIST);
    this.setTooltip(Blockly.Msg.LANG_LISTS_TO_CSV_TABLE_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_TO_CSV_TABLE_TITLE_TO_CSV }]
};

Blockly.Blocks['lists_from_csv_row'] = {
  // Make list from csv row.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_FROM_CSV_ROW_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("text",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_FROM_CSV_ROW_TITLE_FROM_CSV)
      .appendField(Blockly.Msg.LANG_LISTS_FROM_CSV_ROW_INPUT_TEXT);
    this.setTooltip(Blockly.Msg.LANG_LISTS_FROM_CSV_ROW_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_FROM_CSV_ROW_TITLE_FROM_CSV }]
};

Blockly.Blocks['lists_from_csv_table'] = {
  // Make list from csv table.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_FROM_CSV_TABLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.OUTPUT));
    this.appendValueInput('TEXT')
      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("text",Blockly.Blocks.Utilities.INPUT))
      .appendField(Blockly.Msg.LANG_LISTS_FROM_CSV_TABLE_TITLE_FROM_CSV)
      .appendField(Blockly.Msg.LANG_LISTS_FROM_CSV_TABLE_INPUT_TEXT);
    this.setTooltip(Blockly.Msg.LANG_LISTS_FROM_CSV_TABLE_TOOLTIP);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_FROM_CSV_TABLE_TITLE_FROM_CSV }]
};

Blockly.Blocks['lists_lookup_in_pairs'] = {
  // Look up in a list of pairs (key, value).
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_LOOKUP_IN_PAIRS_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.OUTPUT));
    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
    var checkTypeNumber = Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.INPUT);
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(Blockly.Msg.LANG_LISTS_LOOKUP_IN_PAIRS_INPUT,
            ['KEY', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NOTFOUND', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.Msg.LANG_LISTS_LOOKUP_IN_PAIRS_TOOLTIP);
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_LOOKUP_IN_PAIRS_TITLE_LOOKUP_IN_PAIRS }]
};

Blockly.Blocks['lists_mutatorcontainer'] = {
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var group = new Blockly.RadioButtonGroup();
    this.appendDummyInput()
        .appendField(new Blockly.FieldRadioButton(group), 'CHANGE_LIST')
        .appendField("changes existing list");
    this.appendDummyInput()
        .appendField(new Blockly.FieldRadioButton(group), 'MAKE_NEW_LIST')
        .appendField("makes new list");
    this.contextMenu = false;
  }
};

Blockly.Blocks['lists_map'] = {
  // For each loop.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_MAP_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
       .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
       .appendField(Blockly.Msg.LANG_LISTS_MAP_DEST_TITLE_MAP, 'TITLE')
       .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput('DESCRIPTION')
        .appendField(Blockly.Msg.LANG_LISTS_MAP_INPUT_ITEM)
        .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_LISTS_MAP_INPUT_VAR,
                                                       true, // name is editable
                                                       Blockly.FieldFlydown.DISPLAY_BELOW),
                     'VAR')
        .appendField(Blockly.Msg.LANG_LISTS_MAP_INPUT_TO)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendIndentedValueInput('TO');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_MAP_TOOLTIP);
    this.setMutator(new Blockly.Mutator([]));
    this.changeList = true;
  },
  // onchange: Blockly.WarningHandler.checkErrors,
  updateBlock_: function() {
	 if (this.changeList) {
	   if (this.outputConnection && this.outputConnection.targetConnection) {
	     this.outputConnection.disconnect();
	        
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;
	   }
	      
	   if (this.outputConnection) {
	     if (this.outputConnection.inDB_) {
	       this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	     }
	     this.outputConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.outputConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.outputConnection) {
	       Blockly.localConnection_ = null;
	     } 
	   }
	      
	   this.outputConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_DEST_TITLE_MAP, 'TITLE');
	   this.setPreviousStatement(true);
	   this.setNextStatement(true);
	   this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	   this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	   this.render();
	      
	 } else {
	   if (this.previousConnection && this.previousConnection.targetConnection) {
	     this.previousConnection.disconnect();
	       
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;      
	  }
	      
	   if (this.previousConnection) {
	     if (this.previousConnection.inDB_) {
	       this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	     }
	     this.previousConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.previousConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.previousConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   if (this.nextConnection) { 
	     if (this.nextConnection.inDB_) {
	       this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	     }
	     this.nextConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.nextConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   this.previousConnection = null;
	   this.nextConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_MAP_NONDEST_TITLE_MAP, 'TITLE');
	   this.setOutput(true, null);
	   this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	   this.render();
     }
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    if (! this.changeList) {
      container.setAttribute('destructive', this.changeList);
    }     
    return container;
  },
  domToMutation: function(xmlElement) {
    if(!xmlElement.getAttribute('destructive')){
      this.changeList = true;
    } else {
      this.changeList = (xmlElement.getAttribute('destructive') == "true");
    }    
    this.updateBlock_();
  },
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
    containerBlock.initSvg();
    var changeListButton = containerBlock.getField_('CHANGE_LIST');
    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
    var group = changeListButton.group;
    if (this.changeList) {
      group.setSelected(changeListButton);
    } else {
      group.setSelected(makeNewListButton);
    }    
    return containerBlock;
  },
  compose: function(containerBlock) {
	this.oldChangeList = this.changeList;
    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
    if (this.oldChangeList != this.changeList) {
    	this.updateBlock_();
    }
  },
  saveConnections: Blockly.saveConnections,
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  blocksInScope: function() {
    var toBlock = this.getInputTargetBlock('TO');
    if (toBlock) {
      return [toBlock];
    } else {
      return [];
    }
  },
  declaredNames: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_MAP_INPUT_COLLAPSED_TEXT }]
};


Blockly.Blocks['lists_filter'] = {
  // For each loop.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_FILTER_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
        .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
        .appendField(Blockly.Msg.LANG_LISTS_FILTER_DEST_TITLE_FILTER, 'TITLE')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput('DESCRIPTION')
        .appendField(Blockly.Msg.LANG_LISTS_FILTER_INPUT_ITEM)
        .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_LISTS_FILTER_INPUT_VAR,
                                                       true, // name is editable
                                                       Blockly.FieldFlydown.DISPLAY_BELOW),
                     'VAR')
      .appendField(Blockly.Msg.LANG_LISTS_FILTER_INPUT_PASSING)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendIndentedValueInput('TEST')
        .appendField(Blockly.Msg.LANG_LISTS_FILTER_INPUT_TEST);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator([]));
    this.setTooltip(Blockly.Msg.LANG_LISTS_FILTER_TOOLTIP);
    this.changeList = true;
  },
  //  onchange: Blockly.WarningHandler.checkErrors,
//onchange: Blockly.WarningHandler.checkErrors,
  updateBlock_: function() {
	 if (this.changeList) {
	   if (this.outputConnection && this.outputConnection.targetConnection) {
	     this.outputConnection.disconnect();
	        
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;
	   }
	      
	   if (this.outputConnection) {
	     if (this.outputConnection.inDB_) {
	       this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	     }
	     this.outputConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.outputConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.outputConnection) {
	       Blockly.localConnection_ = null;
	     } 
	   }
	      
	   this.outputConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_FILTER_DEST_TITLE_FILTER, 'TITLE');
	   this.setPreviousStatement(true);
	   this.setNextStatement(true);
	   this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	   this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	   this.render();
	      
	 } else {
	   if (this.previousConnection && this.previousConnection.targetConnection) {
	     this.previousConnection.disconnect();
	       
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;      
	  }
	      
	   if (this.previousConnection) {
	     if (this.previousConnection.inDB_) {
	       this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	     }
	     this.previousConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.previousConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.previousConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   if (this.nextConnection) { 
	     if (this.nextConnection.inDB_) {
	       this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	     }
	     this.nextConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.nextConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   this.previousConnection = null;
	   this.nextConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_FILTER_NONDEST_TITLE_FILTER, 'TITLE');
	   this.setOutput(true, null);
	   this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	   this.render();
     }
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    if (! this.changeList) {
      container.setAttribute('destructive', this.changeList);
    }     
    return container;
  },
  domToMutation: function(xmlElement) {
    if(!xmlElement.getAttribute('destructive')){
      this.changeList = true;
    } else {
      this.changeList = (xmlElement.getAttribute('destructive') == "true");
    }    
    this.updateBlock_();
  },
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
    containerBlock.initSvg();
    var changeListButton = containerBlock.getField_('CHANGE_LIST');
    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
    var group = changeListButton.group;
    if (this.changeList) {
      group.setSelected(changeListButton);
    } else {
      group.setSelected(makeNewListButton);
    }    
    return containerBlock;
  },
  compose: function(containerBlock) {
	this.oldChangeList = this.changeList;
    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
    if (this.oldChangeList != this.changeList) {
    	this.updateBlock_();
    }
  },
  saveConnections: Blockly.saveConnections,
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  blocksInScope: function() {
    var testBlock = this.getInputTargetBlock('TEST');
    if (testBlock) {
      return [testBlock];
    } else {
      return [];
    }
  },
  declaredNames: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_FILTER_INPUT_COLLAPSED_TEXT }]
};


Blockly.Blocks['lists_reduce'] = {
  // For each loop.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_REDUCE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
        .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
        .appendField(Blockly.Msg.LANG_LISTS_REDUCE_TITLE_REDUCE)
        .appendField(Blockly.Msg.LANG_LISTS_REDUCE_INPUT_INLIST)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('INITANSWER')
        .appendField(Blockly.Msg.LANG_LISTS_REDUCE_INPUT_INITIAL_ANSWER)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput('DESCRIPTION')
        .appendField(Blockly.Msg.LANG_LISTS_REDUCE_INPUT_COMBINE)
        .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_LISTS_REDUCE_INPUT_VAR,
                                                       true, // name is editable
                                                       Blockly.FieldFlydown.DISPLAY_BELOW),
                     'VAR1')
        .appendField(Blockly.Msg.LANG_LISTS_REDUCE_INPUT_AND)
        .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_LISTS_REDUCE_INPUT_ANSWER,
                                                       true, // name is editable
                                                       Blockly.FieldFlydown.DISPLAY_BELOW),
                     'VAR2') 
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendIndentedValueInput('COMBINE');
    this.setOutput(true, null);
    this.setTooltip(Blockly.Msg.LANG_LISTS_REDUCE_TOOLTIP);
  },
  // onchange: Blockly.WarningHandler.checkErrors,
  getVars: function() {
    var names = []
    names.push(this.getFieldValue('VAR1'));
    names.push(this.getFieldValue('VAR2'));
    return names;
  },
  blocksInScope: function() {
    var combineBlock = this.getInputTargetBlock('COMBINE');
    if (combineBlock) {
      return [combineBlock];
    } else {
      return [];
    }
  },
  declaredNames: function() {
    return this.getVars();
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR1'))) {
      this.setFieldValue(newName, 'VAR1');
    }
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR2'))) {
      this.setFieldValue(newName, 'VAR2');
    }
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_REDUCE_TITLE_REDUCE }]
};

Blockly.Blocks['lists_reverse'] = {
  // For each loop.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_REVERSE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
        .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
        .appendField(Blockly.Msg.LANG_LISTS_REVERSE_DEST_TITLE_REVERSE, 'TITLE')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator([]));
    this.setTooltip(Blockly.Msg.LANG_LISTS_REVERSE_TOOLTIP);
    this.changeList = true;
  },
//onchange: Blockly.WarningHandler.checkErrors,
  updateBlock_: function() {
	 if (this.changeList) {
	   if (this.outputConnection && this.outputConnection.targetConnection) {
	     this.outputConnection.disconnect();
	        
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;
	   }
	      
	   if (this.outputConnection) {
	     if (this.outputConnection.inDB_) {
	       this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	     }
	     this.outputConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.outputConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.outputConnection) {
	       Blockly.localConnection_ = null;
	     } 
	   }
	      
	   this.outputConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_REVERSE_DEST_TITLE_REVERSE, 'TITLE');
	   this.setPreviousStatement(true);
	   this.setNextStatement(true);
	   this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	   this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	   this.render();
	      
	 } else {
	   if (this.previousConnection && this.previousConnection.targetConnection) {
	     this.previousConnection.disconnect();
	       
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;      
	  }
	      
	   if (this.previousConnection) {
	     if (this.previousConnection.inDB_) {
	       this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	     }
	     this.previousConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.previousConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.previousConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   if (this.nextConnection) { 
	     if (this.nextConnection.inDB_) {
	       this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	     }
	     this.nextConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.nextConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   this.previousConnection = null;
	   this.nextConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_REVERSE_NONDEST_TITLE_REVERSE, 'TITLE');
	   this.setOutput(true, null);
	   this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	   this.render();
     }
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    if (! this.changeList) {
      container.setAttribute('destructive', this.changeList);
    }     
    return container;
  },
  domToMutation: function(xmlElement) {
    if(!xmlElement.getAttribute('destructive')){
      this.changeList = true;
    } else {
      this.changeList = (xmlElement.getAttribute('destructive') == "true");
    }    
    this.updateBlock_();
  },
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
    containerBlock.initSvg();
    var changeListButton = containerBlock.getField_('CHANGE_LIST');
    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
    var group = changeListButton.group;
    if (this.changeList) {
      group.setSelected(changeListButton);
    } else {
      group.setSelected(makeNewListButton);
    }    
    return containerBlock;
  },
  compose: function(containerBlock) {
	this.oldChangeList = this.changeList;
    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
    if (this.oldChangeList != this.changeList) {
    	this.updateBlock_();
    }
  },
  saveConnections: Blockly.saveConnections,
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_REVERSE_INPUT_COLLAPSED_TEXT }]
};

Blockly.Blocks['lists_sort'] = {
  // For each loop.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_SORT_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
        .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
        .appendField(Blockly.Msg.LANG_LISTS_SORT_DEST_TITLE_SORT, 'TITLE')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator([]));
    this.setTooltip(Blockly.Msg.LANG_LISTS_SORT_TOOLTIP);
    this.changeList = true;
  },
  // onchange: Blockly.WarningHandler.checkErrors,
  updateBlock_: function() {
	 if (this.changeList) {
	   if (this.outputConnection && this.outputConnection.targetConnection) {
	     this.outputConnection.disconnect();
	        
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;
	   }
	      
	   if (this.outputConnection) {
	     if (this.outputConnection.inDB_) {
	       this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	     }
	     this.outputConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.outputConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.outputConnection) {
	       Blockly.localConnection_ = null;
	     } 
	   }
	      
	   this.outputConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_SORT_DEST_TITLE_SORT, 'TITLE');
	   this.setPreviousStatement(true);
	   this.setNextStatement(true);
	   this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	   this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	   this.render();
	      
	 } else {
	   if (this.previousConnection && this.previousConnection.targetConnection) {
	     this.previousConnection.disconnect();
	       
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;      
	  }
	      
	   if (this.previousConnection) {
	     if (this.previousConnection.inDB_) {
	       this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	     }
	     this.previousConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.previousConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.previousConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   if (this.nextConnection) { 
	     if (this.nextConnection.inDB_) {
	       this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	     }
	     this.nextConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.nextConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   this.previousConnection = null;
	   this.nextConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_SORT_NONDEST_TITLE_SORT, 'TITLE');
	   this.setOutput(true, null);
	   this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	   this.render();
     }
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    if (! this.changeList) {
      container.setAttribute('destructive', this.changeList);
    }     
    return container;
  },
  domToMutation: function(xmlElement) {
    if(!xmlElement.getAttribute('destructive')){
      this.changeList = true;
    } else {
      this.changeList = (xmlElement.getAttribute('destructive') == "true");
    }    
    this.updateBlock_();
  },
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
    containerBlock.initSvg();
    var changeListButton = containerBlock.getField_('CHANGE_LIST');
    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
    var group = changeListButton.group;
    if (this.changeList) {
      group.setSelected(changeListButton);
    } else {
      group.setSelected(makeNewListButton);
    }    
    return containerBlock;
  },
  compose: function(containerBlock) {
	this.oldChangeList = this.changeList;
    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
    if (this.oldChangeList != this.changeList) {
    	this.updateBlock_();
    }
  },
  saveConnections: Blockly.saveConnections,
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_SORT_INPUT_COLLAPSED_TEXT }]
};

Blockly.Blocks['lists_sort_comparator'] = {
  // For each loop.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
        .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
        .appendField(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_DEST_TITLE_SORT, 'TITLE')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput('DESCRIPTION')
        .appendField(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_INPUT_COMPARATOR)
        .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_INPUT_VAR1,
                                                       true, // name is editable
                                                       Blockly.FieldFlydown.DISPLAY_BELOW),
                     'VAR1')
        .appendField(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_INPUT_AND)
        .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_INPUT_VAR2,
                                                       true, // name is editable
                                                       Blockly.FieldFlydown.DISPLAY_BELOW),
                     'VAR2')  
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendIndentedValueInput('COMPARE');
    this.setMutator(new Blockly.Mutator([]));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_TOOLTIP);
    this.changeList = true;
  },
//onchange: Blockly.WarningHandler.checkErrors,
  updateBlock_: function() {
	 if (this.changeList) {
	   if (this.outputConnection && this.outputConnection.targetConnection) {
	     this.outputConnection.disconnect();
	        
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;
	   }
	      
	   if (this.outputConnection) {
	     if (this.outputConnection.inDB_) {
	       this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
	     }
	     this.outputConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.outputConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.outputConnection) {
	       Blockly.localConnection_ = null;
	     } 
	   }
	      
	   this.outputConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_DEST_TITLE_SORT, 'TITLE');
	   this.setPreviousStatement(true);
	   this.setNextStatement(true);
	   this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
	   this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
	   this.render();
	      
	 } else {
	   if (this.previousConnection && this.previousConnection.targetConnection) {
	     this.previousConnection.disconnect();
	       
	     var children = this.parentBlock_.childBlocks_;
	     for (var child, x = 0; child = children[x]; x++) {
	       if (child == this) {
	         children.splice(x, 1);
	         break;
	       }
	     }
	     this.setParent(null);
	     this.parentBlock_ = null;      
	  }
	      
	   if (this.previousConnection) {
	     if (this.previousConnection.inDB_) {
	       this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
	     }
	     this.previousConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.previousConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.previousConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   if (this.nextConnection) { 
	     if (this.nextConnection.inDB_) {
	       this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
	     }
	     this.nextConnection.inDB_ = false;
	     if (Blockly.highlightedConnection_ == this.nextConnection) {
	       Blockly.highlightedConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	     if (Blockly.localConnection_ == this.nextConnection) {
	       Blockly.localConnection_ = null;
	     }
	   }
	      
	   this.previousConnection = null;
	   this.nextConnection = null;
	   this.setFieldValue(Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_NONDEST_TITLE_SORT, 'TITLE');
	   this.setOutput(true, null);
	   this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
	   this.render();
     }
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    if (! this.changeList) {
      container.setAttribute('destructive', this.changeList);
    }     
    return container;
  },
  domToMutation: function(xmlElement) {
    if(!xmlElement.getAttribute('destructive')){
      this.changeList = true;
    } else {
      this.changeList = (xmlElement.getAttribute('destructive') == "true");
    }    
    this.updateBlock_();
  },
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
    containerBlock.initSvg();
    var changeListButton = containerBlock.getField_('CHANGE_LIST');
    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
    var group = changeListButton.group;
    if (this.changeList) {
      group.setSelected(changeListButton);
    } else {
      group.setSelected(makeNewListButton);
    }    
    return containerBlock;
  },
  compose: function(containerBlock) {
	this.oldChangeList = this.changeList;
    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
    if (this.oldChangeList != this.changeList) {
    	this.updateBlock_();
    }
  },
  saveConnections: Blockly.saveConnections,
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  blocksInScope: function() {
    var compareBlock = this.getInputTargetBlock('COMPARE');
    if (compareBlock) {
      return [compareBlock];
    } else {
      return [];
    }
  },
  declaredNames: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_SORT_COMPARATOR_INPUT_COLLAPSED_TEXT }]
};




Blockly.Blocks['lists_sort_key'] = {
  // For each loop.
  category : 'Lists',
  helpUrl : Blockly.Msg.LANG_LISTS_SORT_KEY_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
        .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
        .appendField(Blockly.Msg.LANG_LISTS_SORT_KEY_DEST_TITLE_SORT, 'TITLE')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput('DESCRIPTION')
      .appendField(Blockly.Msg.LANG_LISTS_SORT_KEY_INPUT_KEY)     
      .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_LISTS_SORT_KEY_INPUT_VAR,
                                                     true, // name is editable
                                                     Blockly.FieldFlydown.DISPLAY_BELOW),
                   'VAR')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendIndentedValueInput('KEY');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator([]));
    this.setTooltip( Blockly.Msg.LANG_LISTS_SORT_KEY_TOOLTIP);
    this.changeList = true;
  },
  onchange: Blockly.WarningHandler.checkErrors,
  updateBlock_: function() {
		 if (this.changeList) {
		   if (this.outputConnection && this.outputConnection.targetConnection) {
		     this.outputConnection.disconnect();
		        
		     var children = this.parentBlock_.childBlocks_;
		     for (var child, x = 0; child = children[x]; x++) {
		       if (child == this) {
		         children.splice(x, 1);
		         break;
		       }
		     }
		     this.setParent(null);
		     this.parentBlock_ = null;
		   }
		      
		   if (this.outputConnection) {
		     if (this.outputConnection.inDB_) {
		       this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
		     }
		     this.outputConnection.inDB_ = false;
		     if (Blockly.highlightedConnection_ == this.outputConnection) {
		       Blockly.highlightedConnection_ = null;
		     }
		     if (Blockly.localConnection_ == this.outputConnection) {
		       Blockly.localConnection_ = null;
		     } 
		   }
		      
		   this.outputConnection = null;
		   this.setFieldValue(Blockly.Msg.LANG_LISTS_SORT_KEY_DEST_TITLE_SORT, 'TITLE');
		   this.setPreviousStatement(true);
		   this.setNextStatement(true);
		   this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
		   this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
		   this.render();
		      
		 } else {
		   if (this.previousConnection && this.previousConnection.targetConnection) {
		     this.previousConnection.disconnect();
		       
		     var children = this.parentBlock_.childBlocks_;
		     for (var child, x = 0; child = children[x]; x++) {
		       if (child == this) {
		         children.splice(x, 1);
		         break;
		       }
		     }
		     this.setParent(null);
		     this.parentBlock_ = null;      
		  }
		      
		   if (this.previousConnection) {
		     if (this.previousConnection.inDB_) {
		       this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
		     }
		     this.previousConnection.inDB_ = false;
		     if (Blockly.highlightedConnection_ == this.previousConnection) {
		       Blockly.highlightedConnection_ = null;
		     }
		     if (Blockly.localConnection_ == this.previousConnection) {
		       Blockly.localConnection_ = null;
		     }
		   }
		      
		   if (this.nextConnection) { 
		     if (this.nextConnection.inDB_) {
		       this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
		     }
		     this.nextConnection.inDB_ = false;
		     if (Blockly.highlightedConnection_ == this.nextConnection) {
		       Blockly.highlightedConnection_ = null;
		     }
		     if (Blockly.localConnection_ == this.nextConnection) {
		       Blockly.localConnection_ = null;
		     }
		     if (Blockly.localConnection_ == this.nextConnection) {
		       Blockly.localConnection_ = null;
		     }
		   }
		      
		   this.previousConnection = null;
		   this.nextConnection = null;
		   this.setFieldValue(Blockly.Msg.LANG_LISTS_SORT_KEY_NONDEST_TITLE_SORT, 'TITLE');
		   this.setOutput(true, null);
		   this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
		   this.render();
	     }
	  },
	  mutationToDom: function() {
	    var container = document.createElement('mutation');
	    if (! this.changeList) {
	      container.setAttribute('destructive', this.changeList);
	    }     
	    return container;
	  },
	  domToMutation: function(xmlElement) {
	    if(!xmlElement.getAttribute('destructive')){
	      this.changeList = true;
	    } else {
	      this.changeList = (xmlElement.getAttribute('destructive') == "true");
	    }    
	    this.updateBlock_();
	  },
	  decompose: function(workspace) {
	    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
	    containerBlock.initSvg();
	    var changeListButton = containerBlock.getField_('CHANGE_LIST');
	    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
	    var group = changeListButton.group;
	    if (this.changeList) {
	      group.setSelected(changeListButton);
	    } else {
	      group.setSelected(makeNewListButton);
	    }    
	    return containerBlock;
	  },
	  compose: function(containerBlock) {
		this.oldChangeList = this.changeList;
	    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
	    if (this.oldChangeList != this.changeList) {
	    	this.updateBlock_();
	    }
	  },
	  saveConnections: Blockly.saveConnections,
	  getVars: function() {
	    return [this.getFieldValue('VAR')];
	  },
	  blocksInScope: function() {
	    var keyBlock = this.getInputTargetBlock('KEY');
	    if (keyBlock) {
	      return [keyBlock];
	    } else {
	      return [];
	    }
	  },
	  declaredNames: function() {
	    return [this.getFieldValue('VAR')];
	  },
	  renameVar: function(oldName, newName) {
	    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
	      this.setFieldValue(newName, 'VAR');
	    }
	  },
	  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_SORT_KEY_INPUT_COLLAPSED_TEXT }]
	};

Blockly.Blocks['lists_minimum'] = {
	  category : 'Lists',
	  helpUrl : Blockly.Msg.LANG_LISTS_MIN_HELPURL,
	  init : function() {
	    this.setColour(Blockly.LIST_CATEGORY_HUE);
	    this.setOutput(true, null);
	    this.appendValueInput('LIST')
	      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
	      .appendField(Blockly.Msg.LANG_LISTS_MIN_INPUT_MIN);
	    this.setTooltip(Blockly.Msg.LANG_LISTS_MIN_TOOLTIP);
	  },
	  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_MIN_INPUT_MIN }]
	};

Blockly.Blocks['lists_maximum'] = {
	  category : 'Lists',
	  helpUrl : Blockly.Msg.LANG_LISTS_MAX_HELPURL,
	  init : function() {
	    this.setColour(Blockly.LIST_CATEGORY_HUE);
	    this.setOutput(true, null);
	    this.appendValueInput('LIST')
	      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
	      .appendField(Blockly.Msg.LANG_LISTS_MAX_INPUT_MAX);
	    this.setTooltip(Blockly.Msg.LANG_LISTS_MAX_TOOLTIP);
	  },
	  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_MAX_INPUT_MAX }]
	};

Blockly.Blocks['lists_but_first'] = {
	  category : 'Lists',
	  helpUrl : Blockly.Msg.LANG_LISTS_BUT_FIRST_HELPURL,
	  init : function() {
	    this.setColour(Blockly.LIST_CATEGORY_HUE);
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.appendValueInput('LIST')
	      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
		      .appendField(Blockly.Msg.LANG_LISTS_BUT_FIRST_INPUT_BUT_FIRST);
		this.setTooltip(Blockly.Msg.LANG_LISTS_BUT_FIRST_TOOLTIP);
		this.setMutator(new Blockly.Mutator([]));
	    this.changeList = true;
	   },
	   updateBlock_: function() {
			  if (this.changeList) {
			    if (this.outputConnection && this.outputConnection.targetConnection) {
			      this.outputConnection.disconnect();
			         
			      var children = this.parentBlock_.childBlocks_;
			      for (var child, x = 0; child = children[x]; x++) {
			        if (child == this) {
			          children.splice(x, 1);
			          break;
			        }
			      }
			      this.setParent(null);
			      this.parentBlock_ = null;
			    }
			       
			    if (this.outputConnection) {
			      if (this.outputConnection.inDB_) {
			        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
			      }
			      this.outputConnection.inDB_ = false;
			      if (Blockly.highlightedConnection_ == this.outputConnection) {
			        Blockly.highlightedConnection_ = null;
			      }
			      if (Blockly.localConnection_ == this.outputConnection) {
			        Blockly.localConnection_ = null;
			      } 
			    }
			       
			    this.outputConnection = null;
			    this.setPreviousStatement(true);
			    this.setNextStatement(true);
			    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
			    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
			    this.render();
			       
			  } else {
			    if (this.previousConnection && this.previousConnection.targetConnection) {
			      this.previousConnection.disconnect();
			        
			      var children = this.parentBlock_.childBlocks_;
			      for (var child, x = 0; child = children[x]; x++) {
			        if (child == this) {
			          children.splice(x, 1);
			          break;
			        }
			      }
			      this.setParent(null);
			      this.parentBlock_ = null;      
			   }
			       
			    if (this.previousConnection) {
			      if (this.previousConnection.inDB_) {
			        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
			      }
			      this.previousConnection.inDB_ = false;
			      if (Blockly.highlightedConnection_ == this.previousConnection) {
			        Blockly.highlightedConnection_ = null;
			      }
			      if (Blockly.localConnection_ == this.previousConnection) {
			        Blockly.localConnection_ = null;
			      }
			    }
			       
			    if (this.nextConnection) { 
			      if (this.nextConnection.inDB_) {
			        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
			      }
			      this.nextConnection.inDB_ = false;
			      if (Blockly.highlightedConnection_ == this.nextConnection) {
			        Blockly.highlightedConnection_ = null;
			      }
			      if (Blockly.localConnection_ == this.nextConnection) {
			        Blockly.localConnection_ = null;
			      }
			      if (Blockly.localConnection_ == this.nextConnection) {
			        Blockly.localConnection_ = null;
			      }
			    }
			       
			    this.previousConnection = null;
			    this.nextConnection = null;
			    this.setOutput(true, null);
			    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
			    this.render();
			     }
			  },
			  mutationToDom: function() {
			    var container = document.createElement('mutation');
			    if (! this.changeList) {
			      container.setAttribute('destructive', this.changeList);
			    }     
			    return container;
			  },
			  domToMutation: function(xmlElement) {
			    if(!xmlElement.getAttribute('destructive')){
			      this.changeList = true;
			    } else {
			      this.changeList = (xmlElement.getAttribute('destructive') == "true");
			    }    
			    this.updateBlock_();
			  },
			  decompose: function(workspace) {
			    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
			    containerBlock.initSvg();
			    var changeListButton = containerBlock.getField_('CHANGE_LIST');
			    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
			    var group = changeListButton.group;
			    if (this.changeList) {
			      group.setSelected(changeListButton);
			    } else {
			      group.setSelected(makeNewListButton);
			    }    
			    return containerBlock;
			  },
			  compose: function(containerBlock) {
			 this.oldChangeList = this.changeList;
			    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
			    if (this.oldChangeList != this.changeList) {
			     this.updateBlock_();
			    }
			  },
			  saveConnections: Blockly.saveConnections,
      typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_BUT_FIRST_INPUT_BUT_FIRST }]
   };

Blockly.Blocks['lists_but_last'] = {
	  category : 'Lists',
	  helpUrl : Blockly.Msg.LANG_LISTS_BUT_LAST_HELPURL,
	  init : function() {
	    this.setColour(Blockly.LIST_CATEGORY_HUE);
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    this.appendValueInput('LIST')
	      .setCheck(Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT))
	      .appendField(Blockly.Msg.LANG_LISTS_BUT_LAST_INPUT_BUT_LAST);
	    this.setTooltip(Blockly.Msg.LANG_LISTS_BUT_LAST_TOOLTIP);
	    this.setMutator(new Blockly.Mutator([]));
	    this.changeList = true;
	  },
	  updateBlock_: function() {
		  if (this.changeList) {
		    if (this.outputConnection && this.outputConnection.targetConnection) {
		      this.outputConnection.disconnect();
		         
		      var children = this.parentBlock_.childBlocks_;
		      for (var child, x = 0; child = children[x]; x++) {
		        if (child == this) {
		          children.splice(x, 1);
		          break;
		        }
		      }
		      this.setParent(null);
		      this.parentBlock_ = null;
		    }
		       
		    if (this.outputConnection) {
		      if (this.outputConnection.inDB_) {
		        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
		      }
		      this.outputConnection.inDB_ = false;
		      if (Blockly.highlightedConnection_ == this.outputConnection) {
		        Blockly.highlightedConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.outputConnection) {
		        Blockly.localConnection_ = null;
		      } 
		    }
		       
		    this.outputConnection = null;
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
		    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
		    this.render();
		       
		  } else {
		    if (this.previousConnection && this.previousConnection.targetConnection) {
		      this.previousConnection.disconnect();
		        
		      var children = this.parentBlock_.childBlocks_;
		      for (var child, x = 0; child = children[x]; x++) {
		        if (child == this) {
		          children.splice(x, 1);
		          break;
		        }
		      }
		      this.setParent(null);
		      this.parentBlock_ = null;      
		   }
		       
		    if (this.previousConnection) {
		      if (this.previousConnection.inDB_) {
		        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
		      }
		      this.previousConnection.inDB_ = false;
		      if (Blockly.highlightedConnection_ == this.previousConnection) {
		        Blockly.highlightedConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.previousConnection) {
		        Blockly.localConnection_ = null;
		      }
		    }
		       
		    if (this.nextConnection) { 
		      if (this.nextConnection.inDB_) {
		        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
		      }
		      this.nextConnection.inDB_ = false;
		      if (Blockly.highlightedConnection_ == this.nextConnection) {
		        Blockly.highlightedConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.nextConnection) {
		        Blockly.localConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.nextConnection) {
		        Blockly.localConnection_ = null;
		      }
		    }
		       
		    this.previousConnection = null;
		    this.nextConnection = null;
		    this.setOutput(true, null);
		    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
		    this.render();
		     }
		  },
		  mutationToDom: function() {
		    var container = document.createElement('mutation');
		    if (! this.changeList) {
		      container.setAttribute('destructive', this.changeList);
		    }     
		    return container;
		  },
		  domToMutation: function(xmlElement) {
		    if(!xmlElement.getAttribute('destructive')){
		      this.changeList = true;
		    } else {
		      this.changeList = (xmlElement.getAttribute('destructive') == "true");
		    }    
		    this.updateBlock_();
		  },
		  decompose: function(workspace) {
		    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
		    containerBlock.initSvg();
		    var changeListButton = containerBlock.getField_('CHANGE_LIST');
		    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
		    var group = changeListButton.group;
		    if (this.changeList) {
		      group.setSelected(changeListButton);
		    } else {
		      group.setSelected(makeNewListButton);
		    }    
		    return containerBlock;
		  },
		  compose: function(containerBlock) {
		 this.oldChangeList = this.changeList;
		    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
		    if (this.oldChangeList != this.changeList) {
		     this.updateBlock_();
		    }
		  },
		  saveConnections: Blockly.saveConnections,
	  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_BUT_LAST_INPUT_BUT_LAST }]
	};

Blockly.Blocks['lists_splice'] = {
	  // Splices list at the two given index.
	  category : 'Lists',
	  helpUrl : Blockly.Msg.LANG_LISTS_SPLICE_HELPURL,
	  init : function() {
	    this.setColour(Blockly.LIST_CATEGORY_HUE);
	    this.setPreviousStatement(true);
	    this.setNextStatement(true);
	    var checkTypeList = Blockly.Blocks.Utilities.YailTypeToBlocklyType("list",Blockly.Blocks.Utilities.INPUT);
	    var checkTypeNumber = Blockly.Blocks.Utilities.YailTypeToBlocklyType("number",Blockly.Blocks.Utilities.INPUT);
	    this.interpolateMsg(Blockly.Msg.LANG_LISTS_SPLICE_INPUT,
	            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
	            ['INDEX1', checkTypeNumber, Blockly.ALIGN_RIGHT],
	            ['INDEX2', checkTypeNumber, Blockly.ALIGN_RIGHT],
	            Blockly.ALIGN_RIGHT);
	    this.setTooltip(Blockly.Msg.LANG_LISTS_SPLICE_TOOLTIP);
	    this.setInputsInline(false);
	    this.setMutator(new Blockly.Mutator([]));
	    this.changeList = true;
	  },
	  updateBlock_: function() {
		  if (this.changeList) {
		    if (this.outputConnection && this.outputConnection.targetConnection) {
		      this.outputConnection.disconnect();
		         
		      var children = this.parentBlock_.childBlocks_;
		      for (var child, x = 0; child = children[x]; x++) {
		        if (child == this) {
		          children.splice(x, 1);
		          break;
		        }
		      }
		      this.setParent(null);
		      this.parentBlock_ = null;
		    }
		       
		    if (this.outputConnection) {
		      if (this.outputConnection.inDB_) {
		        this.outputConnection.dbList_[this.outputConnection.type].removeConnection_(this.outputConnection);
		      }
		      this.outputConnection.inDB_ = false;
		      if (Blockly.highlightedConnection_ == this.outputConnection) {
		        Blockly.highlightedConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.outputConnection) {
		        Blockly.localConnection_ = null;
		      } 
		    }
		       
		    this.outputConnection = null;
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.previousConnection.dbList_[this.previousConnection.type].addConnection_(this.previousConnection);
		    this.nextConnection.dbList_[this.nextConnection.type].addConnection_(this.nextConnection);
		    this.render();
		       
		  } else {
		    if (this.previousConnection && this.previousConnection.targetConnection) {
		      this.previousConnection.disconnect();
		        
		      var children = this.parentBlock_.childBlocks_;
		      for (var child, x = 0; child = children[x]; x++) {
		        if (child == this) {
		          children.splice(x, 1);
		          break;
		        }
		      }
		      this.setParent(null);
		      this.parentBlock_ = null;      
		   }
		       
		    if (this.previousConnection) {
		      if (this.previousConnection.inDB_) {
		        this.previousConnection.dbList_[this.previousConnection.type].removeConnection_(this.previousConnection);
		      }
		      this.previousConnection.inDB_ = false;
		      if (Blockly.highlightedConnection_ == this.previousConnection) {
		        Blockly.highlightedConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.previousConnection) {
		        Blockly.localConnection_ = null;
		      }
		    }
		       
		    if (this.nextConnection) { 
		      if (this.nextConnection.inDB_) {
		        this.nextConnection.dbList_[this.nextConnection.type].removeConnection_(this.nextConnection);
		      }
		      this.nextConnection.inDB_ = false;
		      if (Blockly.highlightedConnection_ == this.nextConnection) {
		        Blockly.highlightedConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.nextConnection) {
		        Blockly.localConnection_ = null;
		      }
		      if (Blockly.localConnection_ == this.nextConnection) {
		        Blockly.localConnection_ = null;
		      }
		    }
		       
		    this.previousConnection = null;
		    this.nextConnection = null;
		    this.setOutput(true, null);
		    this.outputConnection.dbList_[this.outputConnection.type].addConnection_(this.outputConnection);
		    this.render();
		     }
		  },
		  mutationToDom: function() {
		    var container = document.createElement('mutation');
		    if (! this.changeList) {
		      container.setAttribute('destructive', this.changeList);
		    }     
		    return container;
		  },
		  domToMutation: function(xmlElement) {
		    if(!xmlElement.getAttribute('destructive')){
		      this.changeList = true;
		    } else {
		      this.changeList = (xmlElement.getAttribute('destructive') == "true");
		    }    
		    this.updateBlock_();
		  },
		  decompose: function(workspace) {
		    var containerBlock = Blockly.Block.obtain(workspace,'lists_mutatorcontainer');
		    containerBlock.initSvg();
		    var changeListButton = containerBlock.getField_('CHANGE_LIST');
		    var makeNewListButton = containerBlock.getField_('MAKE_NEW_LIST');
		    var group = changeListButton.group;
		    if (this.changeList) {
		      group.setSelected(changeListButton);
		    } else {
		      group.setSelected(makeNewListButton);
		    }    
		    return containerBlock;
		  },
		  compose: function(containerBlock) {
		 this.oldChangeList = this.changeList;
		    this.changeList = containerBlock.getFieldValue('CHANGE_LIST') == 'TRUE' ? true : false;
		    if (this.oldChangeList != this.changeList) {
		     this.updateBlock_();
		    }
		  },
		  saveConnections: Blockly.saveConnections,
	  typeblock: [{ translatedName: Blockly.Msg.LANG_LISTS_SPLICE_TITLE_SPLICE }]
	};
