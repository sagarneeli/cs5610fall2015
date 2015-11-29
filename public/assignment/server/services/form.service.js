"use strict";

module.exports = function(app, formModel){

	//  	 /api/assignment/user/:userId/form
	app.get("/api/assignment/user/:userId/form", getUserForms);
	app.get(" /api/assignment/form/:formId", getFormById);
	app.delete("/api/assignment/form/:formId", deleteFormById);
	app.post("/api/assignment/user/:userId/form", createForm);
	app.put("/api/assignment/form/:formId", updateForm);

	function updateForm(req, res, next){
		var form = req.body || {};
		var formId = req.params.formId;
		formModel.updateForm(formId, form)
		.then(function(updatedForm){
			res.json(updatedForm);
		})
		.catch(function(error){
			console.log('updateForm error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function createForm(req, res, next){
		var form = req.body || {};
		var userId = req.params.userId;
		formModel.createForm(userId, form)
		.then(function(newForm){
			res.json(newForm);
		})
		.catch(function(error){
			console.log('createForm error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function deleteFormById(req, res, next){
		var formId = req.params.formId;
		formModel.deleteFormById(formId)
		.then(function(userForms){
			res.json(userForms);
		})
		.catch(function(error){
			console.log('deleteFormById error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getFormById(req, res, next){
		var formId = req.params.formId;
		formModel.findFormById(formId)
		.then(function(form){
			res.json(form);
		})
		.catch(function(error){
			console.log('getFormById error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getUserForms(req, res, next){
		var userId = req.params.userId;
		formModel.findAllFormsForUser(userId)
		.then(function(userForms){
			res.json(userForms);
		})
		.catch(function(error){
			console.log('getUserForms error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}
};
