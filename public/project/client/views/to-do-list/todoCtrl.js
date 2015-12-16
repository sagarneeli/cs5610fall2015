'use strict';

/**
 * @ngdoc function
 * @name AniTheme.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of AniTheme
 */
 angular.module('AniTheme').controller('todoCtrl', function ($scope) {
 	$scope.todos = [
 	];
 	function makeid()
 	{
 		var text = "";
 		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

 		for( var i=0; i < 5; i++ )
 			text += possible.charAt(Math.floor(Math.random() * possible.length));
 		return text;
 	}
 	$scope.addTodo = function () {
 		$scope.todos.push({text:$scope.formTodoText, done:false, id:makeid()});
 		$scope.formTodoText = '';
 	};
 });
