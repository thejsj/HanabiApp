(function() {
	'use strict';

	angular.module('hanabiApp').directive('hintControls', HintControls);
	angular.module('hanabiApp').controller('hintControlsCtrl', HintControlsCtrl);

	function HintControls() {
    return {
      restrict : 'E',
      scope : false,
      transclude : true,
      templateUrl : 'app/views/templates/hintControls.html',
      controller : 'hintControlsCtrl'
    };
	}

	HintControlsCtrl.$inject = ['$scope', '$rootScope'];

	function HintControlsCtrl($scope, $rootScope) {
		$scope.hintablePlayers = [];
		$scope.chosenPlayer = false;
		$scope.choosePlayer = choosePlayer;
		$scope.ugh = {
			colors : ['white', '#EFEA53', '#F75151', '#5BC0DE','#0E9D57'],
			numbers : [1, 2, 3, 4, 5]
		};
		$scope.chosenColor = '';
		$scope.chosenNumber = 0;
		$scope.chooseColor = chooseColor;
		$scope.chooseNumber = chooseNumber;
		$scope.hintCardClicked = hintCardClicked;
		$scope.selectedCards = [];
		$scope.cardInfo = {};

		var colorMap = {
			'white' : 'white',
			'#EFEA53' : 'yellow',
			'#F75151' : 'red', 
			'#5BC0DE' : 'blue', 
			'#0E9D57' : 'green'
		}

		load();

		function load() {
			$scope.chosenPlayer = false;
			$scope.hintablePlayers = $scope.players.filter(function(player) {
				if (player.id === $scope.turn.player.id) {
					return false;
				}
				return true;
			});
		}

		function choosePlayer($event, player) {
			resetOptions();
			if (angular.equals(player, $scope.chosenPlayer)) {
				$scope.chosenPlayer = false;
				$('.hintPlayerSelected').removeClass('hintPlayerSelected');
			} else {
				$scope.chosenPlayer = player;
				addPlayerSelectedClass($event.target);
			}
		}

		function addPlayerSelectedClass(htmlElement) {
			$('.hintPlayerSelected').removeClass('hintPlayerSelected');
			angular.element(htmlElement).addClass('hintPlayerSelected');
		}

		function chooseColor($event, color) {
			$scope.filteredCards = $scope.chosenPlayer.hand.filter(function(card) {
				if (card.color === colorMap[color]) {
					return true;
				}
				return false;
			});
			$scope.filteringOn = colorMap[color];
			getFilteredCardsWidth();
			addOptionSelectedClass($event.target);
		}

		function chooseNumber($event, number) {
			$scope.filteredCards = $scope.chosenPlayer.hand.filter(function(card) {
				if (card.number === number) {
					return true;
				}
				return false;
			});
			$scope.filteringOn = number;
			getFilteredCardsWidth();
			addOptionSelectedClass($event.target);
		}

		function getFilteredCardsWidth() {
			var widths = (250 / $scope.filteredCards.length) - 10;
			$scope.filteredCards.forEach(function(card) {
				card.html.width = widths;
			});
		}

		function addOptionSelectedClass(htmlElement) {
			$('.hintBtnSelected').removeClass('hintBtnSelected');
			angular.element(htmlElement).addClass('hintBtnSelected');
		}


		function resetOptions() {
			$('.hintBtnSelected').removeClass('hintBtnSelected');
			$scope.filteredCards = [];
		}

		function hintCardClicked($event, card) {
			var cardIx = $scope.selectedCards.indexOf(card);
			if (cardIx > -1) {
				$scope.selectedCards.splice(cardIx, 1);
				$scope.cardInfo[card.id] = false;
				angular.element($event.target).removeClass('hintCardSelected');
			} else {
				$scope.selectedCards.push(card);
				$scope.cardInfo[card.id] = true;
				angular.element($event.target).addClass('hintCardSelected');
			}
		}
		
	}

})();