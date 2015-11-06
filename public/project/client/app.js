'use strict';

/**
 * @ngdoc overview
 * @name TrendsCaster
 * @description
 * # TrendsCaster
 *
 * Main module of the application.
 */

angular
  .module('AniTheme', [
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.view.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/dashboard.view.html'
      })
  });
