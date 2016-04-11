(function() {
	'use strict';

	angular.module('hanabiApp').directive('playerHand', PlayerHand);

	function PlayerHand() {
    return {
      restrict : 'E',
      scope : {
      	player : '=',
      	sideBySide : '='
      },
      transclude : true,
      templateUrl : 'app/views/templates/playerHand.html'
    };
	}
})();