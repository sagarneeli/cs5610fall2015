'use strict';

(function()
{
  /**
   * @ngdoc overview
   * @name TrendsCaster
   * @description
   * # TrendsCaster
   *
   * Main module of the application.
   */
  angular
    .module('AniTheme')
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
          controller: 'HomeCtrl',
          resolve: {
            loggedin: checkCurrentUser
          }
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
        .state('profile', {
          url: '/profile',
          parent: 'dashboard',
          templateUrl: 'views/dashboard/profile/profile.html',
          resolve: {
            loggedin: checkLoggedin
          }
        })
        //.state('typography', {
        //  url: '/typography',
        //  parent: 'dashboard',
        //  templateUrl: 'views/dashboard/typography/typography.html'
        //})
        .state('invoice', {
          url: '/invoice',
          parent: 'dashboard',
          templateUrl: 'views/dashboard/invoice.html'
        })
        .state('sentiment', {
          url: '/sentiment',
          parent: 'dashboard',
          templateUrl: 'views/dashboard/sentiment/sentiment.html'
        })
    });


  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/account').success(function(user) {
      $rootScope.errorMessage = null;
      // User is Authenticated
      if (user !== '0') {
        $rootScope.currentUser = user;
        deferred.resolve();
      }
      // User is Not Authenticated
      else {
        $rootScope.errorMessage = 'You need to log in.';
        deferred.reject();
        $location.path('login');
      }
    });
    return deferred.promise;
  };

  var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/account').success(function(user)
    {
      $rootScope.errorMessage = null;
      // User is Authenticated
      console.log("User at home " + user);
      if (user !== '0') {
        $rootScope.currentUser = user;
        console.log("Rootscope user " + $rootScope.currentUser);
      }
      deferred.resolve();
    });

    return deferred.promise;
  };

})();
