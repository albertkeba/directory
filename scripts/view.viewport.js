/*jslint devel: true, newcap: false, nomen: true, plusplus: true, white: true, indent: 4*/
/*global App, $, Mustache, Lungo, alert, View*/
App.Views.Viewport = (function () {
    'use strict';
    var _template = null;

    function Viewport( options ) {
		View.call(this, options);

		this.title	= options.title || '';
		this.events	= {
			click: [{
				element	: '#add',
				attach	: 'AddUser'
			}]
		};
	}

	Viewport.prototype = Object.create( View.prototype );
	
	Viewport.prototype.AddUser = function () {
		if( $('.form').length === 0 )
		{
			new App.Views.Form({
				el: '#contact-form',
				template: 'form'
			}).render();
		}
		
		Lungo.Router.article('main','contact-form');
	};

	return Viewport;
}());