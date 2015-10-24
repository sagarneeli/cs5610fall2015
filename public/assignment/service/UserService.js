(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    //UserService.$inject = ['$timeout', '$filter', '$q'];

    //function UserService($timeout, $filter, $q)
    function UserService()
    {
        var users = [];

        var userService = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return userService;


        function findUserByUsernameAndPassword(username, password, callback) {
            var response;
            for (var x = 0; x < users.length; x++) {
                var currentUser = users[x];
                if (currentUser.username === username && currentUser.password === password) {
                    //response = { success: currentUser , message: 'Username found'};
                    response = currentUser;
                } else {
                    //response = { success: null, message: 'Username or password is incorrect' };
                    response = null;
                }
            }
            callback(response);
        }


        function findAllUsers(callback)
        {
            var users = getUsers();
            callback(users);
        }


        function createUser(user, callback) {

            var users = getUsers();
            user.id = guid();
            users.push(user);
            callback(user);

        }

        function deleteUserById(userId, callback) {

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === userId) {
                    users.splice(i, 1);
                    break;
                }
            }
            //setUsers(users);
            callback(users);

        }


        function updateUser(userId, user, callback) {

            var users = getUsers();
            var updatedUser;
            for (var i = 0; i < users.length; i++) {
                var currentUser = users[i];
                if (currentUser.id === userId) {
                    for (var property in currentUser) {
                        if (currentUser[property]) {
                            currentUser[property] = user[property];
                        }
                    }
                    currentUser.id = userId;
                    updatedUser = currentUser;
                    break;
                }
            }
            //setUsers(users);
            callback(updatedUser);

        }

        // private functions

        function getUsers() {
            return users;
        }

        function setUsers(users) {
            this.users = users;
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();