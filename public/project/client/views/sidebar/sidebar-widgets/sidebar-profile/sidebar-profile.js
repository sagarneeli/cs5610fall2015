'use strict';


angular.module('AniTheme')
	.directive('sidebarProfile',function(){
		return {
        templateUrl:'views/sidebar/sidebar-widgets/sidebar-profile/sidebar-profile.html',
        restrict: 'E',
        replace: true,
    	}
	});
