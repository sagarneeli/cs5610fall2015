(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    //UserService.$inject = ['$timeout', '$filter', '$q'];

    //function UserService($timeout, $filter, $q)
    function UserService()
    {
        var users = [
            {id: "", username: "Alex", password: "xxx"},
            {id: "", username: "Bob", password: "yyy"},
            {id: "", username: "Charlie", password: "zzz"},
        ];

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
                var current = users[x];
                if (current.username === username && current.password === password) {
                    response = { success: true , message: 'Username found'};
                } else {
                    response = { success: false, message: 'Username or password is incorrect' };
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
            var response;

            GetByUsername(user.username)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                    } else {
                        var users = getUsers();

                        // assign id
                        //var lastUser = users[users.length - 1] || { id: 0 };
                        //user.id = lastUser.id + 1;

                        user.id = guid();
                        // save to local storage
                        users.push(user);
                        setUsers(users);
                    }
                });

            callback(user);
        }

        function deleteUserById(id, callback) {

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);

            callback(users);
        }


        function Update(id, user, callback) {

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);

            callback(user);
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