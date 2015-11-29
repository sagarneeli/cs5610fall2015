"use strict";

var q = require("q"),
Promise = require('bluebird');
//mongoose = require("mongoose");

module.exports = function(formBuilderDb, mongoose){

	// Defining UserModel
	var FormSchema = require('./form.schema.js')(mongoose),
	FormModel = formBuilderDb.model('FormModel', FormSchema);

	//TODO: Add form title duplication check, mebbe later on
	function createForm(userId, form){
		try {
			return new Promise(function(resolve, reject){
				if (!userId || typeof userId === "undefined"){
					return callback("please provide a valid userid");
				} else if (!form || typeof form !== "object") {
					return reject("please provide a valid form object");
				} else {
					form.id = form._id = mongoose.Types.ObjectId();
					form.userId = userId;

					FormModel.create(form, function(err, newlyCreatedForm){
						if (err){
							console.log("Error while createForm : ", err);
							return reject(err);
						} else {
							return resolve(newlyCreatedForm);
						}
					});
				}
			});
		} catch(error){
			console.log("catched an Exception in 'createForm' method", error);
			return Promise.reject(error);
		}
	}

	function findAllForms(){
		try {
			return new Promise(function(resolve, reject){
				FormModel.find({}, function(err, dbForms){
					if (err){
						console.log("Error while findAllUsers : ", err);
						return reject(err);
					} else {
						return resolve(dbForms);
					}
				});
			});
		} catch(error){
			console.log("catched an Exception in 'findAllForms' method", error);
			return Promise.reject(error);
		}
	}

	function findAllFormsForUser(userId){
		try {
			return new Promise(function(resolve, reject){
				if (!userId || typeof userId === "undefined"){
					return reject("please provide a valid userId");
				} else {
					FormModel.find({userId: userId}, function(err, userForms){
						if (err){
							console.log("Error while findAllFormsForUser : ", err);
							return reject(err);
						} else {
							return resolve(userForms);
						}
					});
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findAllFormsForUser' method", error);
			return Promise.reject(error);
		}
	}

	function findFormById(formId){
		try {
			return new Promise(function(resolve, reject){
				if (!formId || typeof formId === "undefined"){
					return reject("please provide a formId");
				} else {
					FormModel.findOne({id: formId}, function(err, userFormsById){
						if (err){
							console.log("Error while findFormById : ", err);
							return reject(err);
						} else {
							return resolve(userFormsById);
						}
					});
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findFormById' method", error);
			return Promise.reject(error);
		}
	}

	function findFormByTitle(title){
		try {
			return new Promise(function(resolve, reject){
				if (!title || typeof title === "undefined"){
					return reject("Please provide a valid form title");
				} else {
					FormModel.findOne({title: title}, function(err, requiredForm){
						if (err){
							console.log("Error while findFormByTitle : ", err);
							return reject(err);
						} else {
							return resolve(requiredForm);
						}
					});
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findFormByTitle' method", error);
			return Promise.reject(error);
		}
	}

	function updateForm(formId, newForm){
		try {
			return new Promise(function(resolve, reject){
				FormModel.findOne({id: formId}, function(err, form){
					if (err || !form){
						return reject(err || "no form found for updateForm with id:"+formId);
					} else {
		  				//Updating only newly properties from the input updatedUser object
		  				for(var prop in form){
		  					if (!(typeof newForm[prop] == 'undefined')){
		  						form[prop] = newForm[prop];
		  					}
		  				}
		  				form.save(function(error){
		  					if (error){
		  						return reject("Error while saving after updating form : "+error);
		  					} else {
		  						return resolve(form);
		  					}
		  				});
		  			}
		  		});
			});
		} catch(error){
			console.log("catched an Exception in 'updateForm' method", error);
			return Promise.reject(error);
		}
	}

	function deleteFormById(formId){
		try {
			return new Promise(function(resolve, reject){
				if (!formId || typeof formId === "undefined"){
					return callback("please provide a valid formId");
				} else {
					findFormById(formId)
					.then(function(retrievedForm){
						var userId = retrievedForm.userId || "";
						FormModel.remove({id: formId}, function(err){
							if(err){
								return reject(err || "error deleting formId with id:"+formId+" \n error being "+err);
							} else {
								findAllFormsForUser(userId)
								.then(function(userForms){
									return resolve(userForms);
								});
							}
						})
					})
					.catch(function(error){
						return reject(error);
					});
				}
			});
		} catch(error){
			console.log("catched an Exception in 'deleteFormById' method", error);
			return Promise.reject(error);
		}
	}


	/**
	 * [guid generates a unique id]
	 * @return String [a unique id]
	 */
	 function guid() {
	 	function s4() {
	 		return Math.floor((1 + Math.random()) * 0x10000)
	 		.toString(16)
	 		.substring(1);
	 	}
	 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	 	s4() + '-' + s4() + s4() + s4();
	 }

	 return {
	 	"createForm": createForm,
	 	"findAllForms": findAllForms,
	 	"findAllFormsForUser": findAllFormsForUser,
	 	"findFormById": findFormById,
	 	"findFormByTitle": findFormByTitle,
	 	"updateForm": updateForm,
	 	"deleteFormById": deleteFormById
	 };
	};
