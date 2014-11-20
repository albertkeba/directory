/*jslint browser: true*/
/*global App, $, jQuery, Mustache, alert*/

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
				element	: '',
				attach	: ''
			}]
		};
	}

	Viewport.prototype.render = function () {
		if ( this.template )
		{
			this._template = $( Mustache.render(this.template));
			//this.bindEvents();
			//
			if ( this.$el  )
			{
				this.$el.prepend( this.template );
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
						if ( this.template.prop('tagName').toLowerCase() === events[key][el].element )
						{
							element = this._template;
						}
						else
						{
							element = this._template.find( events[key][el].element, this );
						}

						element.on( key, this.model.model.attributes, this[events[key][el].attach] );
					}
				}
			}
		}
	};

	return Viewport;
}());

