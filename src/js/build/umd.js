(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'moment'], function($, moment) {
			return (factory(root, $, moment));
		});
	} else {
		factory(root, root.$, root.moment);
	}

}(this, function(root, $, moment) {
	'use strict';

	// @include ../moment-datepicker.js

}));
