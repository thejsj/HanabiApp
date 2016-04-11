(function() {
	'use strict';

	angular.module('hanabiApp').controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['$scope', 'DeckFactory'];

	function GameCtrl($scope, DeckFactory) {
		$scope.deck = [ ];
		$scope.players = [ ];
		$scope.hints = 8;
		$scope.strikes = 0;

		load();

		function load() {
			$scope.deck = DeckFactory.buildDeck();
			getPlayers();
			dealCards();
		}

		function getPlayers() {
			for (var i = 1; i <= 4; i++) {
				var newPlayer = { 
					name : 'player' + i,
					hand : [ ],
					id : i
				};
				newPlayer.position = getCardPosition(newPlayer);
				$scope.players.push(newPlayer);
			};
		}

		function getCardPosition(player) {
			if (player.id === 1) {
				return 'bottomHand';
			} else if (player.id === 2) {
				return 'leftHand';
			} else if (player.id === 3) {
				return 'topHand';
			} else {
				return 'rightHand';
			}
		}

		function dealCards() {
			$scope.players.forEach(function(player) {
				for (var i = 0; i < 5; i++) {
					dealCard(player);
				}
			});
		}

		function dealCard(player) {
			var currentCard = angular.copy($scope.deck[0]);
			$scope.deck.splice(0, 1);
			currentCard.numberHinted = false;
			currentCard.colorHinted = false;
			currentCard.html = generateCardHtml(currentCard, player);
			player.hand.push(currentCard);
			player.hand.sort(sortHand);
		}

		function generateCardHtml(card, player) {
			var htmlObj = {};
			htmlObj.color = card.color + 'Card';
			htmlObj.orientation = getCardOrientation(player);
			//...
			return htmlObj;
		}

		function getCardOrientation(player) {
			if (player.id % 2) {
				return 'verticalCard';
			} else {
				return 'horizontalCard';
			}
		}

		function sortHand(a, b) {
			if (a.numberHinted) {
				return -1;
			}
			if (a.colorHinted) {
				return -1;
			}
		}

	};
})();