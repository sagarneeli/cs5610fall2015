(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .config(function($routeProvider)
    {
      $routeProvider
        .when("/home",
          {
            templateUrl: "views/home/home.view.html"
          })
        .when("/login",
          {
            templateUrl: "views/login/login.view.html",
            controller: "LoginController"
          })
        .when("/register",
          {
            templateUrl: "views/register/register.view.html",
            controller: "RegisterController"
          })
        .when("/profile",
          {
            templateUrl: "views/profile/profile.view.html",
            controller: "ProfileController"
          })
        .when("/forms",
          {
            templateUrl: "views/form/form.view.html",
            controller: "FormController"
          })
        //.when('/user/:userId/form/:formId/fields', {
        //  templateUrl: "views/field/field.view.html",
        //  controller: 'FieldController',
        //  controllerAs: 'model'
        //})
        .when("/", {
          redirectTo : "/home"
        })
        .otherwise({
          redirectTo: "/"
        });
    });
})();
