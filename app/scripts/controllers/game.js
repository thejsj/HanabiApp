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
		$scope.playCardClicked = playCardClicked;
		$scope.discardClicked = discardClicked;
		$scope.discard = discard;

		var colorMap = {
			'white' : 'white',
			'yellow' : '#EFEA53',
			'red' : '#F75151',
			'blue' : '#5BC0DE',
			'green' : '#0E9D57',
			'hidden' : '#9E9E9E'
		}

		load();

		function load() {
			$scope.deck = DeckFactory.buildDeck();
			getPlayers();
			dealCards();
			$scope.turn = {
				'player' : 1,
				'playingCard' : false,
				'makingHint' : false,
				'discarding' : false
			};
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
			var htmlObj = {}
			if (player.id !== 1) {
				htmlObj.color = colorMap[card.color];
			} else {
				htmlObj.color = colorMap['hidden'];
			}
			
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

		function playCardClicked() {
			addHoverAnimation();	
		}

		function discardClicked() {
			addHoverAnimation();

			$('#player' + $scope.turn.player + 'hand').find('.playerCard')
				.attr('ng-click', 'discard(card)').$compile();
		}

		function discard(card) {
			console.log('discarded...');
		}

		function addHoverAnimation() {
			$('#player' + $scope.turn.player + 'hand').find('.playerCard')
				.hover(function() {
					$(this).addClass('cardHover');
				}, function() {
					$(this).removeClass('cardHover');
				}).attr('ng-click', 'showCardMenu(card)');	
		}

		function showCardMenu() {

		}

	};
})();