"use strict";

var q = require("q"),
Promise = require('bluebird');
//mongoose = require("mongoose");

module.exports = function(formBuilderDb, mongoose){

	// Defining UserModel
	var UserSchema = require('./user.schema.js')(mongoose),
	UserModel = formBuilderDb.model('UserModel', UserSchema);

	function createUser(user){
		try {
			return new Promise(function(resolve, reject){

				if (!user || typeof user !== 'object'){
					return reject("please provide a valid user object");
				} else {
					user.id = user._id = mongoose.Types.ObjectId();
					user.role = [];

					UserModel.create(user, function(err, newlyCreatedUser){
						if (err){
							console.log("Error while createUser : ", err);
							return reject(err);
						} else {
							return resolve(newlyCreatedUser);
						}
					});
				}

			});
		} catch(error){
			console.log("catched an Exception in 'createUser' method", error);
			return Promise.reject(error);
		}
	}

	function findAllUsers(){
		try {
			return new Promise(function(resolve, reject){
				UserModel.find({}, function(err, dbUsers){
					if (err){
						console.log("Error while findAllUsers : ", err);
						return reject(err);
					} else {
						resolve(dbUsers);
					}
				})
			});
		} catch(error){
			console.log("catched an Exception in 'findAllUsers' method", error);
			return Promise.reject(error);
		}
	}

	function findUserById(instanceId){
		try{
			return new Promise(function(resolve, reject){
				UserModel.findOne({id: instanceId}, function(err, user){
					if (err || !user){
						return reject(err || "no user found with id:"+instanceId);
					} else {
						return resolve(user);
					}
				});
			});
		} catch(error){
			console.log("catched an Exception in 'findUserById' method", error);
			return Promise.reject(error);
		}
	}

	function updateUser(userId, updatedUser){
		try{
			return new Promise(function(resolve, reject){
				UserModel.findOne({id: userId}, function(err, user){
					if (err || !user){
						return reject(err || "no user found for updateUser with id:"+userId);
					} else {
		  				//Updating only newly properties from the input updatedUser object
		  				for(var prop in user){
		  					if (!(typeof updatedUser[prop] == 'undefined')){
		  						user[prop] = updatedUser[prop];
		  					}
		  				}
		  				user.save(function(error){
		  					if (error){
		  						return reject("Error while saving after updating user : "+error);
		  					} else {
		  						return resolve(user);
		  					}
		  				});
		  			}
		  		});
			});
} catch(error){
	console.log("catched an Exception in 'updateUser' method", error);
	return Promise.reject(error);
}
}

function deleteUserById(userId){
	try {
		return new Promise(function(resolve, reject){
			if (typeof userId==="undefined" || !userId){
				return reject("please provide a valid userId");
			} else {
				UserModel.remove({id: userId}, function(err){
					if(err){
						return reject(err || "error deleting user with id:"+userId+" \n error being "+err);
					} else {
						findAllUsers()
						.then(function(dbUsers){
							return resolve(dbUsers);
						})
						.catch(function(error){
							return reject(error);
						});
					}
				});
			}
		});
	} catch(error){
		console.log("catched an Exception in 'removeUser' method", error);
		return Promise.reject(error);
	}
}

function findUserByUsername(username){
	try {
		var currentUser, currentIndex;
		return new Promise(function(resolve, reject){
			if (!username){
				return reject("Please provide valid username");
			} else {
				UserModel.findOne({username: username}, function(err, user){
					if (err || !user){
						return reject(err || "no user found while findUserByUsername : "+username);
					} else {
						return resolve(user);
					}
				});
			}
		});
	} catch(error){
		console.log("catched an Exception in 'findUserByUsername' method", error);
		return Promise.reject(error);
	}
}

function findUserByCredentials(credentials){
	try{
		return new Promise(function(resolve, reject){
			if (!credentials || typeof credentials !== 'object'){
				return reject("Please provide a valid credential object");
			} else if(!credentials.username ) {
				return reject("No username found in the credentials");
			} else if(!credentials.password ) {
				return reject("No password found in the credentials");
			} else {
				UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, user){
					if (err || !user){
						return reject(err || "no user found while findUserByCredentials : "+credentials.username+","+credentials.password);
					} else {
						return resolve(user);
					}
				});
			}
		});
	} catch(error){
		console.log("catched an Exception in 'findUserByCredentials' method", error);
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
	 	"createUser": createUser,
	 	"findAllUsers": findAllUsers,
	 	"findUserById": findUserById,
	 	"updateUser": updateUser,
	 	"deleteUserById": deleteUserById,
	 	"findUserByUsername": findUserByUsername,
	 	"findUserByCredentials": findUserByCredentials
	 };


	};
