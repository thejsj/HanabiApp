(function() {
	'use strict';

	angular.module('hanabiApp').controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['$scope', '$rootScope', '$compile', 'DeckFactory', 'AnimationSvc'];

	function GameCtrl($scope, $rootScope, $compile, DeckFactory, AnimationSvc) {
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
		$scope.makeHintClicked = makeHintClicked;
		$scope.actionClass = '';
		$scope.currentPlayerAction = '';

		var cardMap = {};

		$rootScope.$on('cardClicked', function(event, data) {
			switch ($scope.currentPlayerAction) {
				case 'd':
					if ($scope.turn.player.id === data.playerId) {
						discard(data.card);
					}
					break;
				case 'h':
					if ($scope.turn.player.id !== data.playerId) {
						makeHint(data.card);
					}
					break;
				case 'p':
					if ($scope.turn.player.id === data.playerId) {
						playCard(data.card);
					}
					break;
				default:
					break;
			}
		});

		$rootScope.$on('hintSubmitted', function(event, data) {
			if (isNaN(data.hint)) {
				applyColorHints(data.cards, data.player);
			} else {
				applyNumberHints(data.cards, data.player);
			}
		});

		load();

		function load() {
			$scope.message = 'Waiting for players...';
			// TODO
			getPlayers();
			$scope.message = 'Dealing...';
			$scope.deck = DeckFactory.buildDeck();
			dealCards();
			$scope.message = 'Starting game...';
			$scope.turn = {
				'player' : $scope.players[0],
				'playingCard' : false,
				'makingHint' : false,
				'discarding' : false
			};
			$scope.message = $scope.turn.player.name + "'s turn...";
			cardMap = {};
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
			if ($scope.deck.length > 0) {
				var currentCard = angular.copy($scope.deck[0]);
				$scope.deck.splice(0, 1);
				currentCard.numberHinted = false;
				currentCard.colorHinted = false;
				currentCard.html = DeckFactory.getCardHtml(currentCard, player);
				player.hand.push(currentCard);
				cardMap[currentCard.id] = player.id;
				player.hand.sort(sortHand);
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
			$scope.currentPlayerAction = 'p';
			$scope.actionClass = 'playCardClicked';
			$scope.message = $scope.turn.player.name + ' is playing a card...';
			AnimationSvc.removeHovers();
			AnimationSvc.addHoverAnimation($scope.turn.player, 'playHover');	
		}

		function discardClicked() {
			$scope.message = $scope.turn.player.name + ' is discarding...';
			AnimationSvc.removeHovers();
			AnimationSvc.addHoverAnimation($scope.turn.player, 'discardHover');
			$scope.currentPlayerAction = 'd';
			$scope.actionClass = 'discardClicked';
		}

		function makeHintClicked() {
			$scope.message = $scope.turn.player.name + ' is making a hint...';
			AnimationSvc.removeHovers();
			$scope.players.forEach(function(player) {
				if (player !== $scope.turn.player) {
					AnimationSvc.addHoverAnimation(player, 'hintHover');
				}
			});
			$scope.currentPlayerAction = 'h';
			$scope.actionClass = 'makeHintClicked';
		}

		function discard(card) {
			var currPlayerId = $scope.turn.player.id;
			var currPlayerObj = $scope.players.filter(function(player) {
				if (player.id === $scope.turn.player.id) {
					return true;
				}
				return false;
			})[0];
			var cardIx = currPlayerObj.hand.indexOf(card);
			if (cardIx > -1) {
				currPlayerObj.hand.splice(cardIx, 1);
			}
			$scope.discards[card.color][card.number]++;
			dealCard(currPlayerObj);
			if ($scope.hints < 8) {
				$scope.hints++;
			}
			nextTurn();
		}

		function playCard(card) {
			var currPlayerId = $scope.turn.player.id;
			var currPlayerObj = $scope.players.filter(function(player) {
				if (player.id === $scope.turn.player.id) {
					return true;
				}
				return false;
			})[0];
			var cardIx = currPlayerObj.hand.indexOf(card);
			if (cardIx > -1) {
				if (($scope.stacks[card.color] + 1) === card.number) {
					$scope.stacks[card.color]++;
				} else {
					$scope.strikes++;
				}
				$scope.discards[card.color][card.number]++;
				currPlayerObj.hand.splice(cardIx, 1);
			}
			dealCard(currPlayerObj);
			nextTurn();
		}

		function makeHint(card) {
			$scope.hints--;
			nextTurn();
		}

		function nextTurn() {
			var currPlayerIx = $scope.players.indexOf($scope.turn.player);
			if (currPlayerIx === 3) {
				$scope.turn.player = $scope.players[0];
			} else if (currPlayerIx > -1) {
				$scope.turn.player = $scope.players[currPlayerIx + 1];
			} 
			AnimationSvc.removeHovers();
			$scope.message = $scope.turn.player.name + "'s turn...";
			$scope.actionClass = '';
			$scope.currentPlayerAction = '';
		}

		function applyColorHints(cards, player) {
			var playerIx = $scope.players.indexOf(player);
			cards.forEach(function(card) {
				var cardIx = $scope.players[playerIx].hand.indexOf(card);
				var currCard = $scope.players[playerIx].hand[cardIx];
				currCard.colorHinted = true;
				currCard.html.color = colorMap[card.color];
			});
		}

	};
})();