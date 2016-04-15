(function() {
	'use strict';

	angular.module('hanabiApp').directive('playerHand', PlayerHand);
	angular.module('hanabiApp').controller('playerHandCtrl', PlayerHandCtrl);

	function PlayerHand() {
    return {
      restrict : 'E',
      scope : {
      	player : '=',
      	turn : '='
      },
      transclude : true,
      templateUrl : 'app/views/templates/playerHand.html',
      controller : 'playerHandCtrl'
    };
	}

	PlayerHandCtrl.$inject = ['$scope', '$rootScope'];
	function PlayerHandCtrl($scope, $rootScope) {
		$scope.cardClicked = cardClicked;

		function cardClicked(card, playerId) {
			$rootScope.$broadcast('cardClicked', {
				card : card,
				playerId : playerId
			});
		}
	}

})();