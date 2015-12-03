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
    'ui.router',
    'ngAnimate',
    'ui.calendar',
    'chart.js',
    'textAngular',
    //'gridshore.c3js.chart',
    'angular-growl',
    'growlNotifications',
    'angular-loading-bar',
    'angular-progress-button-styles',
    'pascalprecht.translate',
    'ui.bootstrap',
    'geolocation',
    'ngResource',
    'ngSanitize'
  ])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 5;
    cfpLoadingBarProvider.includeSpinner = false;
  }])
  .config(function(progressButtonConfigProvider) {
    progressButtonConfigProvider.profile('login', {
      style: 'shrink',
      direction: 'vertical'
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/home');
    $urlRouterProvider.otherwise('login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html',
        controller: 'DashboardCtrl'
      })

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.view.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        parent: 'base',
        templateUrl: 'views/register/register.view.html',
        controller: 'LoginCtrl'
      })
      .state('404-page', {
        url: '/404-page',
        parent: 'base',
        templateUrl: 'views/404-page.html'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/dashboard.view.html'
      })
      .state('home', {
        url: '/home',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/home/home.view.html',
        controller: 'HomeCtrl'
      })
      .state('calendar', {
        url: '/calendar',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/calender/calendar.html'
      })
      .state('trending', {
        url: '/trending',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/trending/trending.html'
      })
      .state('tweets', {
        url: '/tweets',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/tweets/tweets.html'
      })
  });
