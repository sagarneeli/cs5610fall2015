"use strict";

module.exports = function(app, userModel){
	app.post("/api/assignment/user", createUser);

	//		 /api/assignment/user

	app.get("/api/assignment/user", handleGetUserRequets);
	// app.get("/api/assignment/user", getUsers);
	// app.get("/api/assignment/user/:username", getUserByUsername);
	// app.get("/api/assignment/user/:username/:password", getUserByUsernameAndPassword);

	app.get("/api/assignment/user/id/:id", getUserById);
	app.put("/api/assignment/user/:id", updateUser);
	app.delete("/api/assignment/user/:id", deleteUserById);

	function handleGetUserRequets(req, res, next){
		if (req && req.query && req.query.username && req.query.password){
			return getUserByUsernameAndPassword(req,res,next);
		} else if (req && req.query && req.query.username){
			return getUserByUsername(req,res,next);
		} else {
			return getUsers(req,res,next);
		}
	}


	function createUser(req, res, next){
		var user = req.body;
		userModel.createUser(user)
		.then(function(newUser){
			res.json(newUser);
		})
		.catch(function(error){
			console.log('create user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	};

	function updateUser(req, res, next){
		var updatedUser = req.body || {};
		var userId = req.params.id || "";
		userModel.updateUser(userId, updatedUser)
		.then(function(userAfterUpdate){
			res.json(userAfterUpdate);
		})
		.catch(function(error){
			console.log('create user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getUsers(req, res, next){
		var query = req.query || {};

		userModel.findAllUsers()
		.then(function(users){
			res.json(users);
		})
		.catch(function(error){
			console.log('getUsers error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getUserByUsernameAndPassword(req, res, next){
		//var username = req.params.username, password = req.params.password;
		var username = req.query.username, password = req.query.password;
		if (!username){
			res.status(400).send("Please supply a username");
		} else if(!password){
			res.status(400).send("Please supply a password");
		} else {
			var credentials = {
				"username" : username,
				"password" : password
			}
			userModel.findUserByCredentials(credentials)
			.then(function(user){
				res.json(user);
			})
			.catch(function(error){
				console.log('getUserByUsernameAndPassword user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function getUserByUsername(req, res, next){
		//var username = req.params.username;
		var username = req.query.username;
		if (!username){
			res.status(400).send("Please supply a username");
		} else {
			userModel.findUserByUsername(username)
			.then(function(user){
				res.json(user);
			})
			.catch(function(error){
				console.log('getUserByUsername user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function deleteUserById(req, res, next){
		var userId = req.params.id;
		userModel.deleteUserById(userId)
		.then(function(users){
			res.json(users);
		})
		.catch(function(error){
			console.log('delete user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getUserById(req, res, next){
		var userId = req.params.id;
		userModel.findUserById(userId)
		.then(function(user){
			res.json(user);
		})
		.catch(function(error){
			console.log('delete user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}
};
