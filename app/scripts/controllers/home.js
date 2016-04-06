(function() {
	'use strict';

	angular.module('hanabiApp').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$scope'];

	function HomeCtrl($scope) {
		console.log('homeCtrl...');
	};
})();