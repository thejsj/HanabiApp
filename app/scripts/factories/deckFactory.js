(function() {
	'use strict';

	angular.module('hanabiApp').factory('DeckFactory', DeckFactory);

	// DeckFactory.$inject = [''];

	function DeckFactory() {
		var colors = ['white', 'blue', 'red', 'yellow', 'green'];
		var numbersMap = {
			1 : 3,
			2 : 2,
			3 : 2,
			4 : 2,
			5 : 1
		};

		var colorMap = {
			'white' : 'white',
			'yellow' : '#EFEA53',
			'red' : '#F75151',
			'blue' : '#5BC0DE',
			'green' : '#0E9D57',
			'hidden' : '#9E9E9E'
		}

		var fct = {
			buildDeck : buildDeck,
			getCardHtml : getCardHtml
		}

		return fct;

		function buildDeck(mode) {
			var deck = [ ];

			colors.forEach(function(color) {
				for (var i = 1; i <= 5; i++) {
					for (var j = 1; j <= numbersMap[i]; j++) {
						deck.push({
							id : color + i + '-' + j,
							color : color,
							number : i
						});
					};
				};
			});

			return shuffle(deck);
		}

		function shuffle(array) {
		  var m = array.length, t, i;

		  while (m) {
		    i = Math.floor(Math.random() * m--);

		    t = array[m];
		    array[m] = array[i];
		    array[i] = t;
		  }

		  return array;
		}

		function getCardHtml(card, player) {
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



	};
})();