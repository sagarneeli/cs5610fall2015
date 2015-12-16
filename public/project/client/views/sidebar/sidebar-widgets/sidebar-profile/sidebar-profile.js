'use strict';


angular.module('AniTheme')
	.directive('sidebarProfile',function(){
		return {
        templateUrl:'views/sidebar/sidebar-widgets/sidebar-profile/sidebar-profile.html',
        restrict: 'E',
        replace: true,
    	}
	})
  .controller("SideBarProfileCtrl", SideBarProfileCtrl);

function SideBarProfileCtrl(UserService, $scope) {

  UserService.findProfileImage()
    .then(function (user) {
      //console.log(user);
      $scope.image = user.image;
      $scope.username = user.displayName;
    });

}
