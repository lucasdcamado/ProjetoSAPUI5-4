/*global QUnit*/

sap.ui.define([
	"sapfiori/simpleform1/controller/SimpleForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SimpleForm Controller");

	QUnit.test("I should test the SimpleForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
