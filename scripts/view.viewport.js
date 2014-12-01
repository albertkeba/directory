/*jslint devel: true, newcap: false, nomen: true, plusplus: true, white: true, indent: 4*/
/*global App, $, Mustache, Lungo, alert*/
App.Views.Viewport = (function () {
    'use strict';
    var _template = null;

    function Viewport(options) {
		options = options || {};

		this.title		= options.title || '';
		this.$el		= options.el ? $(options.el) : null; 
		this.template	= options.template ? App.Utils.templateLoader.get( options.template ) : null;
		this.events		= {
			click: [{
				element	: '#add',
				attach	: 'AddUser'
			}]
		};
	}

	Viewport.prototype.render = function () {
		if ( this.template )
		{
			this._template = $( Mustache.render(this.template, {title: this.title}) );
			this.bindEvents();

			if ( this.$el  )
			{
				this.$el.prepend( this._template );
			}
		}
	};

	Viewport.prototype.bindEvents = function () {

		var events = this.events, key, el, element = null;

		for ( key in events )
		{
			if ( events.hasOwnProperty(key) )
			{
				for ( el in events[key] )
				{
					if ( (events[key]).hasOwnProperty(el) )
					{
						if ( this._template.prop('tagName').toLowerCase() === events[key][el].element )
						{
							element = this._template;
						}
						else
						{
							element = this._template.find( events[key][el].element, this );
						}

						element.on( key, this[events[key][el].attach] );
					}
				}
			}
		}
	};
	
	Viewport.prototype.AddUser = function () {
		if( $('.form').length === 0 )
		{
			var f = new App.Views.Form({
				el: '#contact-form',
				template: 'form'
			}).render();
		}
		
		Lungo.Router.article('main','contact-form');
	};

	return Viewport;
}());