angular.module('AniTheme')
  .controller('MainCtrl', function ($scope, $http, geolocation) {
    $scope.city = "Determining location...";
    $scope.woeid = 0;
    $scope.error = 0;
    $scope.detected = false;

    $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];

    $scope.words = [];
    //$scope.words = [
    //  {text: "Lorem", weight: 13},
    //  {text: "Ipsum", weight: 10.5},
    //  {text: "Dolor", weight: 9.4},
    //  {text: "Sit", weight: 8},
    //  {text: "Amet", weight: 6.2},
    //  {text: "Consectetur", weight: 5},
    //  {text: "Adipiscing", weight: 5},
    //  {text: "Elit", weight: 5},
    //  {text: "Nam et", weight: 5},
    //  {text: "Leo", weight: 4},
    //  {text: "Sapien", weight: 4},
    //  {text: "Pellentesque", weight: 3},
    //  {text: "habitant", weight: 3},
    //  {text: "morbi", weight: 3},
    //  {text: "tristisque", weight: 3},
    //  {text: "senectus", weight: 3},
    //  {text: "et netus", weight: 3},
    //  {text: "et malesuada", weight: 3},
    //  {text: "fames", weight: 2},
    //  {text: "ac turpis", weight: 2},
    //  {text: "egestas", weight: 2},
    //  {text: "Aenean", weight: 2},
    //  {text: "vestibulum", weight: 2},
    //  {text: "elit", weight: 2},
    //  {text: "sit amet", weight: 2},
    //  {text: "metus", weight: 2},
    //  {text: "adipiscing", weight: 2},
    //  {text: "ut ultrices", weight: 2}
    //];

    geolocation.getLocation().then(function(data) {
      $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22'+data.coords.latitude+'%2C'+data.coords.longitude+'%22%20and%20gflags%3D%22R%22&format=json').success(function(data) {
            $scope.city = data.query.results.Result.city
            $scope.detected = true;
        }).error(function(error) {
          $scope.error = 1;
          $scope.errorMsg(error);
        });

      $scope.getTrends = function() {
        if ($scope.woeid === 0) {
          $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text=%22'+$scope.city+'%22&format=json')
            .success(function(data) {
                if (Object.prototype.toString.call(data.query.results.Result) === '[object Array]') {
                  $scope.detected = false;
                  $scope.multicity = true;
                  $scope.cities = data.query.results.Result;
                } else {
                  $scope.woeid = data.query.results.Result.woeid;
                  $scope.detected = true;
                  woeid = $scope.woeid;
                  $http.get('/api/trends/' + woeid)
                      .success(function(data, status, headers, config) {
                        if (data.status) {
                            console.log("I am in trending full data " + data);
                            console.log("I am in trending part data " + data.trends[0]);
                            //console.log("I am in trending actual data - Name " + data.trends[0].trends[0].name + " URL " + data.trends[0].trends[0].url + " Random " + Math.floor(Math.random() * (20 - 3 + 1)) + 3);
                            //$scope.words = data;
                          if (data.trends[0] != null) {
                            console.log("Here");
                            $scope.trends = data.trends[0].trends;
                            for (var i = 0; i < data.trends[0].trends.length; i++)
                              $scope.words.push(
                                {
                                  text: data.trends[0].trends[i].name,
                                  weight: Math.random(),
                                  link: data.trends[0].trends[i].url
                                }
                              );
                          } else {
                            console.log("In else");
                            $scope.words = [];
                            $scope.words.push(
                              {
                                text: "Nothing is Trending",
                                weight: Math.floor(Math.random() * (20 - 3 + 1)) + 3,
                                link: " "
                              }
                            );
                          }


                        } else {
                          $scope.errorMsg = "Can't find trends around " + $scope.city + ". Try another search.";
                          $scope.error = 1;
                        }
                      });
                  }
                });
        }
      }

      $scope.select = function(city) {
        $scope.woeid = 0;
        $scope.city = city;
        $scope.multicity = 0;
        $scope.detected = true;
      }

      $scope.reset = function() {
        $scope.woeid = 0;
        $scope.city = ""
        $scope.multicity = 0;
        $scope.detected = true;
        $scope.error = 0;
      }

    });
});
