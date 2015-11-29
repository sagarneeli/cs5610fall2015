(function() {
  'use strict';

  angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $location, $rootScope)
  {
    var model = this;
    $scope.$location = $location;
    //$scope.user = $rootScope.loggedInUser;
    //model.user.username = $rootScope.loggedInUser.username;

    //$rootScope.$on("auth", function(event, user){
    //  $scope.user = $rootScope.loggedInUser = user;
    //});

    model.logout = function() {
      $rootScope.loggedInUser = null;
      $location.url( "/home" );
    }

    var model = this;
    model.registerShow = registerShow;
    model.isLogin = isLogin;
    model.loginShow = loginShow;
    model.logoutShow = logoutShow;
    //model.logoutUser = logoutUser;


    function registerShow(){
      if($rootScope.loggedInUser != null){
        return true;
      }
      else { return false; }
    }


    function isLogin(){
      //console.log("checking if user is logged in");
      //console.log($rootScope.user);
      if($rootScope.loggedInUser == null)
      {
        return true;
      }
      else{
        var loggedInUser = $rootScope.loggedInUser.username;
        model.username = loggedInUser[0].toUpperCase() + loggedInUser.slice(1);
      }
    }

    function loginShow(){
      if($rootScope.loggedInUser != null){
        return true;
      }
      return false;
    }

    function logoutShow(){
      if($rootScope.loggedInUser == null){
        return true;
      }
      return false;
    }

    //function logoutUser(){
    //  $rootScope.user = null;
    //  $location.url("/home");
    //}


  }
})();
