'use strict';

angular.module('AniTheme')
.directive('todolist',function(){
		return {
	    templateUrl:'views/to-do-list/to-do.html',
	    restrict: 'E',
	    replace: true,
    	controller: function($scope){

			setTimeout(function(){
    			$('.todo-list-wrap').perfectScrollbar();
			}, 100);

        }
	}
});
