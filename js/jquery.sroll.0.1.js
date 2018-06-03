(function($) {
	$.fn.sRoll = function(opt){

		var settings, $body, $this, $selector, $actionUrl;

		settings = $.extend({
			startClass: 'test2',
			startOn: '.test2',
			moderator: '.content',
			mClass: 'scroll-controller',
			minHeight: '80',
			maxHeight: '90vh',
			onMinHeight: function () {},
			offMinHeight: function () {},
			onUpdate: function () {},
			onReach: function () {},
			offReach: function () {}
		}, opt);

		$body = $('body');
		$this = $(this);
		$selector = $(this).selector;
		let $thisStart = $($selector+''+settings.startOn);
		const $minHeight = parseFloat($this.css('min-height')) +5;
		const $maxHeight = parseFloat($this.css('max-height'));
		$(settings.moderator).addClass(settings.mClass);
		$this.find(settings.moderator).removeClass(settings.mClass).addClass('h9eZUIgfi4hm5tjBI8i4');
		const $moderator = $(settings.moderator+'.'+settings.mClass+':not(.h9eZUIgfi4hm5tjBI8i4)');

		let dst = $(document).scrollTop();
		let newHeight = parseFloat($moderator.css('margin-top')) - dst;
		let onOff = 1;
		let reached = 1;
		$(document).scroll(function() {
			if ( $this.hasClass(settings.startClass) ) {
				let mo = $moderator.offset();
				let to = $this.offset();
				let cst = $moderator.scrollTop();
				dst = $(document).scrollTop();
				newHeight = parseFloat($moderator.css('margin-top')) - dst;
				//console.log('cst', cst, 'dst', dst, header);
				//$('.content').css('margin-bottom', (dst + 10))
				if ( newHeight < $minHeight ) {
					$this.addClass('ss-nn');
					settings.onMinHeight.call(this, $minHeight);
					onOff = 1;
				}else{
					if ( onOff == 1 ) {
						settings.offMinHeight.call(this, $maxHeight);
						onOff = 0;
					}
					settings.onUpdate.call(this, $maxHeight);
					$this.removeClass('ss-nn');
				}

				if ( (to.top + $minHeight) > mo.top ) {
					if ( reached ) {
						settings.onReach.call($this);
						reached = 0;
					}
				}else{
					if ( !reached ) {
						settings.offReach.call($this);
						reached = 1;
					}
				}
				if ( ($minHeight / 2) < newHeight ) {
					$this.height(newHeight);
				}
				
			}
		});

		$this.toContent = function () {
			let mo = $moderator.offset()
			let moTop = (mo.top - $minHeight + 5);
			$('html, body').stop().animate({scrollTop:moTop}, 500, function() { 
				// alert scroll done
			});
			return $this;
		}

		return $this;

	};
})(jQuery);
