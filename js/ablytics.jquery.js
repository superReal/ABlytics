/*
 *  Project: ABlytics
 *  Description: A/B tests for any html element with Google Analytics event tracking.
 *  Notices: Check tracking events on GA > Content > Event Tracking
 *  Author: Sergej Müller / superreal.de
 *  Version: 1.0.1
 *  License: GPL v2
 */


(function($) {


	/* Core */
	$.fn.ablytics = function(options) {


		/* < IE9 shit */
		if ( ! $.support.leadingWhitespace ) {
			return;
		}


		/* No variants */
		if ( jQuery.isEmptyObject(options) || typeof (_gaq) === 'undefined' ) {
			return;
		}


		/* Random variant */
		var random = {
			'char': function(keys) {
				return keys[ Math.floor(Math.random() * keys.length) ];
			}
		};


		/* Cookie handling */
		var cookie = {
			/* Prefix */
			'prefix': 'ablytics-',


			/* Getter */
			'get': function(key) {
				return (document.cookie.match('(^|; )' + key + '=([^;]*)') || 0)[2];
			},


			/* Setter */
			'set': function(key, value) {
				/* Init */
				var date = new Date();

				/* Set expires */
				date.setTime( + date + options.expires * 86400000);

				/* Set cookie */
				document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
			}
		};


		/* Do it! */
		return this.each(
			function() {
				/* Init */
				var obj = $(this),
					variant = null,
					variants = options.variants,
					event_id = '',
					variant_id = '';

				/* Event name */
				event_id = cookie.prefix + obj.attr('id');

				/* Variant from cookie */
				variant_id = cookie.get(event_id);

				/* Randomize a variant */
				if ( ! variant_id ) {
					variant_id = random.char( Object.keys(variants) );

					/* Save */
					cookie.set(event_id, variant_id);
				}

				/* Current variant */
				variant = variants[variant_id];

				/* No variant object? */
				if ( jQuery.isEmptyObject(variant) ) {
					return;
				}

				/* Track event */
				_gaq.push(
					[
						'_trackEvent',
						options['name'],
						variant['name'],
						'',
						0,
						true
					]
				);

				/* Apply callback function */
				variant['callback'].apply(this);
			}
		);
	}
})(jQuery);