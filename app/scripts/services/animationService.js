(function() {
	'use strict';

	angular.module('hanabiApp').service('AnimationSvc', AnimationService);

	// AnimationService.$inject = [ ];

	function AnimationService() {
		var svc = {
			removeHovers : removeHovers,
			addHoverAnimation : addHoverAnimation
		};

		return svc;

		function removeHovers() {
			$('.playerCardHover').addClass('playerCard')
				.removeClass('playerCardHover')
				.removeClass('discardHover')
				.removeClass('playHover')
				.removeClass('hintHover');
		}

		function addHoverAnimation(player, clazz) {
			// $('#player' + player.id + 'hand').find('.playerCard')
			// 	.addClass('playerCardHover')
			// 	.removeClass('playerCard')
			// 	.removeClass('discardHover')
			// 	.removeClass('playHover')
			// 	.removeClass('hintHover') 
			// 	.addClass(clazz);

			$('#playDiscardDisplay').find('.playerCard')
				.addClass('playerCardHover')
				.removeClass('playerCard')
				.removeClass('discardHover')
				.removeClass('playHover')
				.removeClass('hintHover') 
				.addClass(clazz);
		}
	}
})();