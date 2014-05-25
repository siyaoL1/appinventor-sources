/* Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Checkbox field.  Checked or not checked.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.RadioButtonGroup');


Blockly.RadioButtonGroup = function() {  
	this.elements = [];
	this.selectedElement = undefined;
};

Blockly.RadioButtonGroup.prototype.addToGroup = function(button) {
	if !(button in this.elements) {
	this.elements.push(button);
	}
	if (this.elements.length == 1) {
		button.setValue('TRUE');
	}
};

Blockly.RadioButtonGroup.prototype.getSelected = function() {
	return this.selectedElement;
};

Blockly.RadioButtonGroup.prototype.setSelected = function(button) {
	if ((button in this.elements) && (button != this.selectedElement)) {
		if (this.selectedElement) {
			Blockly.FieldCheckbox.setValue(this.selectedElement,'FALSE');
		}
		Blockly.FieldCheckbox.setValue(button,'TRUE');
		this.selectedElement = button;
	}
};
