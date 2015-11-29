"use strict";
var mongoose = require("mongoose");

module.exports = function(app, formModel){
	app.get("/api/assignment/form/:formId/field", getFormFields);
	app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
	app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
	app.post("/api/assignment/form/:formId/field", createField);
	app.post("/api/assignment/form/:formId/field/:index", cloneField);
	app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

	function updateField(req, res, next){
		var inputField = req.body || {};
		var formId = req.params.formId, fieldId = req.params.fieldId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			var fields = requiredForm.fields || [];
			fields.forEach(function(field, index){
				if (field.id.equals(fieldId)){
					field = inputField;
				}
			});
			requiredForm.fields = fields || [];
			formModel.updateForm(formId, requiredForm)
			.then(function(updatedForm){
				res.json(inputField);
			});
		})
		.catch(function(error){
			console.log('updateForm error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function cloneField(req, res, next){
		var clonedField = req.body || {};
		//clonedField.id = guid();
		clonedField.id = clonedField._id = mongoose.Types.ObjectId();
		var index = req.params.index, formId = req.params.formId;
		formModel.findFormById(formId)
		.then(function(form){
			var fields = form.fields;
			fields.splice(index, 0, clonedField);
			formModel.updateForm(formId, form)
			.then(function(updatedForm){
				res.json(updatedForm.fields);
			});
		})
		.catch(function(error){
			console.log('updateForm error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function createField(req, res, next){
		var queryFormModel = formModel;
		var field = req.body || {};
		//field.id = guid();
		field.id = field._id = mongoose.Types.ObjectId();
		var formId = req.params.formId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			requiredForm.fields = requiredForm.fields || [];
			requiredForm.fields.push(field);
			formModel.updateForm(formId, requiredForm)
			.then(function(updatedForm){
				var newFields = updatedForm.fields || [];
				res.json(newFields);
			});
		})
		.catch(function(error){
			console.log('createField error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function deleteFieldById(req, res, next){
		var formId = req.params.formId, fieldId = req.params.fieldId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			var fields = requiredForm.fields || [];
			var remainingFields = [];

			fields.forEach(function(field, index){
				if (field.id.equals(fieldId)){
					fields.splice(index, 1);
				}
			});
			formModel.updateForm(formId, requiredForm)
			.then(function(updatedForm){
				res.json(requiredForm.fields);
			});
		})
		.catch(function(error){
			console.log('deleteFieldById error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getFieldById(req, res, next){
		var formId = req.params.formId, fieldId = req.params.fieldId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			var fields = requiredForm.fields || [];
			var requiredField;
			fields.forEach(function(field, index){
				if (field.id.equals(fieldId)){
					requiredField = field;
				}
			});
			if (requiredField){
				res.json(fields);
			} else {
				res.status(400).send("no field found with id:"+fieldId);
			}
		})
		.catch(function(error){
			console.log('getFieldById error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getFormFields(req, res, next){
		var formId = req.params.formId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			var fields = requiredForm.fields || [];
			res.json(fields);
		})
		.catch(function(error){
			console.log('getFormFields error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

};
