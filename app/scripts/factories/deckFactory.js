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

		return {
			buildDeck : buildDeck
		};

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

	};
})();