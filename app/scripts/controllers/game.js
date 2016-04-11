(function() {
	'use strict';

	angular.module('hanabiApp').controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['$scope', 'DeckFactory'];

	function GameCtrl($scope, DeckFactory) {
		$scope.deck = [ ];
		$scope.players = [ ];
		$scope.hints = 8;
		$scope.strikes = 0;
		$scope.stacks = {
			'white' : 0,
			'yellow' : 0,
			'red' : 0,
			'blue' : 0,
			'green' : 0
		};
		$scope.discards = {
			'white' : {
				1 : 0,
				2 : 0,
				3 : 0,
				4 : 0,
				5 : 0
			},
			'yellow' : {
				1 : 0,
				2 : 0,
				3 : 0,
				4 : 0,
				5 : 0
			},
			'red' : {
				1 : 0,
				2 : 0,
				3 : 0,
				4 : 0,
				5 : 0
			},
			'blue' : {
				1 : 0,
				2 : 0,
				3 : 0,
				4 : 0,
				5 : 0
			},
			'green' : {
				1 : 0,
				2 : 0,
				3 : 0,
				4 : 0,
				5 : 0
			}
		};
		$scope.playCard = playCard;

		load();

		function load() {
			$scope.deck = DeckFactory.buildDeck();
			getPlayers();
			dealCards();
			$scope.turn = 1;
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

		function playCard() {
			console.log('playing card...');
			$('#player' + $scope.turn + 'hand').find('.playerCard')
				.hover(function() {
					$(this).addClass('cardHover');
				}, function() {
					$(this).removeClass('cardHover');
				}).attr('ng-click', 'showCardMenu()');	
		}

		function showCardMenu() {

		}

	};
})();