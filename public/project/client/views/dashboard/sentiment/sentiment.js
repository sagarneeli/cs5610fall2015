'use strict';

(function() {
  angular
    .module("AniTheme")
    .controller("SentimentCtrl", SentimentCtrl);

  function SentimentCtrl($http, $rootScope, $scope, $q) {

    $scope.result = " ";

    $scope.reset = function () {
      $scope.result = " ";
    }


    $scope.getDecision = function () {
      //if (!inputOne || !inputTwo) {
      //  console.log('requiredInputsError');
      //} else if (inputOne === inputTwo) {
      //  console.log('sameInputError');
      //} else {
      var choices = [];
        console.log($scope.choice1);
      console.log($scope.choice2);
        choices.push($scope.choice1);
        choices.push($scope.choice2);
      console.log(choices);
        console.log({'choices': JSON.stringify($scope.choice1, $scope.choice2)});
        $http.post('/search', {'choices': JSON.stringify(choices)})
          .success(function (data) {
          //var results = JSON.parse(data);
            console.log(data);
            $scope.result = data;
          console.log(data.choice + " " + data.score);
          //self.results(self.RESULTS_START_HTML + results.choice + self.RESULTS_END_HTML + results.score);
          //console.log(results.choice + " " + results.score);
            var config2 = liquidFillGaugeDefaultSettings();
            config2.circleThickness = 0.1;
            config2.circleFillGap = 0.2;
            config2.textVertPosition = 0.8;
            config2.waveAnimateTime = 2000;
            config2.waveHeight = 0.3;
            config2.waveCount = 1;
            var score = $scope.result.score * 10;
            loadLiquidFillGauge("fillgauge3", score, config2);
        });
      //}
    };


  }
})();
