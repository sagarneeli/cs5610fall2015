'use strict';


angular.module('AniTheme')
	.directive('sidebarCalendar',function(){
		return {
        templateUrl:'views/sidebar/sidebar-widgets/sidebar-calendar/sidebar-calendar.html',
        restrict: 'E',
        replace: true,
    	}
	});
