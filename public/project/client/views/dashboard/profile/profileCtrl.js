"use strict";

(function() {
  angular
    .module("AniTheme")
    .controller("ProfileCtrl", ProfileCtrl);

  function ProfileCtrl($http, $rootScope, $scope, $resource) {

    function init () {
      // empty tweet model
      $scope.tweetsResult = []
      //$scope.getTweets = function() {
        var params = {
          action: 'user_timeline',
          user: $rootScope.currentUser.displayName
        };

        if ($scope.maxId) {
          params.max_id = $scope.maxId;
        }

        // create Tweet data resource
        $scope.tweets = $resource('/tweets/:action/:user', params);

        // GET request using the resource
        $scope.tweets.query( { }, function (res) {
          console.log(res);
          var results = $scope.tweetsResult = $scope.tweetsResult.concat(res);
          console.log("Results " + results[0].text);
        });
      //};
    }

    init();


  }

})();
