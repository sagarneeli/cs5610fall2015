'use strict';

angular.module('AniTheme')
  .directive('sidebar',function(){
    return {
      templateUrl:'views/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,

      controller: function($scope){

        setTimeout(function(){
          $('.sidenav-outer').perfectScrollbar();
        }, 100);

      }


    }
  });
