(function() {
	'use strict';

	angular.module('hanabiApp').controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['$scope'];

	function GameCtrl($scope) {
		console.log('gameCtrl...');
	};
})();