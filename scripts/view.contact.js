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
		
		this.init();
	}
	
	ViewContact.prototype = Object.create( View.prototype );
	
	ViewContact.prototype.init = function () {
		App.Event.on('change', function(sender,model){
			console.log('update view');
		});
	};

	ViewContact.prototype.get = function (e) {
		var model = e.data.model;
		model.idx = parseInt(e.currentTarget.attributes['data-id'].value, 10);

		new App.Views.Card({
			model	: e.data.model,
			el		: '#contact-view',
			template: 'card'
		}).render();
		
		model = null;

		Lungo.Router.article('main','contact-view');
	};
	
	ViewContact.prototype.refresh = function () {
		console.log(this.model, this._template[0]);
	};

	return ViewContact;
}());