'use strict';

var app = angular.module('hanabiApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/home',
    {
      templateUrl: 'app/views/home.html',
      controller: 'HomeCtrl'
    }
  ).when('/play',
    {
      templateUrl: 'app/views/game.html',
      controller: 'GameCtrl'
    }
  );
});