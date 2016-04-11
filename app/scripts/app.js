'use strict';

var app = angular.module('hanabiApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/home',
    {
      templateUrl: 'app/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
    }
  ).when('/play',
    {
      templateUrl: 'app/views/game.html',
      controller: 'GameCtrl',
      controllerAs: 'gameCtrl'
    }
  ).otherwise({
      templateUrl: 'app/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
  });
});