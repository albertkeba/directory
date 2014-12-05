/*jslint browser: true, devel: true, nomen: true, white: true*/
/*global App, $, Mustache, Lungo, View*/

App.Views.Contact = (function () {
	'use strict';

	function ViewContact( options ) {
		View.call(this, options);

		this.events	= {
			click: [{
				element	: 'li',
				attach	: 'get'
			}]
		};
	}
	
	ViewContact.prototype = Object.create( View.prototype );

	ViewContact.prototype.get = function (e) {
		new App.Views.Card({
			model	: e.data.model,
			el		: '#contact-view',
			template: 'card'
		}).render();

		Lungo.Router.article('main','contact-view');
	};

	return ViewContact;
}());