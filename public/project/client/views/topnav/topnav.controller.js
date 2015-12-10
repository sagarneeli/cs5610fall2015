'use strict';

angular.module('AniTheme')
  .directive('topnav',function(){
    return {
      templateUrl:'views/topnav/topnav.html',
      restrict: 'E',
      replace: true,
      controller: function($scope, UserService){

        $scope.showMenu = function(){

          $('.dashboard-page').toggleClass('push-right');

        }
        $scope.changeTheme = function(setTheme){

          $('<link>')
            .appendTo('head')
            .attr({type : 'text/css', rel : 'stylesheet'})
            .attr('href', 'css/app-'+setTheme+'.css');

          // $.get('/api/change-theme?setTheme='+setTheme);

        }
        $scope.rightToLeft = function(){
          // alert('message');
          $('body').toggleClass('rtl');

          // var t = $('body').hasClass('rtl');
          // console.log(t);

          if($('body').hasClass('rtl')) {
            $('.stat').removeClass('hvr-wobble-horizontal');
          }


        }

        UserService.findProfileImage()
          .then(function (user) {
            console.log(user);
            $scope.image = user.image;
            $scope.username = user.displayName;
          });


      }
    }
  });
