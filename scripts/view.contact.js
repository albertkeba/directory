/*jslint browser: true, devel: true, nomen: true, white: true*/
/*global App, $, Mustache, Lungo*/

App.Views.Contact = (function () {
	'use strict';
	
	var _template = null;

	function View(options) {
		options = options || {};

		this.id			= options.id		|| null;
		this.$el		= options.el ? $( options.el ) : null;
		this.className	= options.className	|| null;
		this.model		= options.model		|| null;
		this.template	= options.template	|| null;

		this.events		= {
			click: [{
				element	: 'li',
				attach	: 'get'
			}]
		};
	}

	View.prototype.get	= function (e) {
		var self = e.data.self,
			card = new App.Views.Card({
			model	: e.data.model,
			template: App.Utils.templateLoader.get('card')
		});
		
		self.$el.empty().append( card.render() );

		Lungo.Router.article('main','contact-view');
	};

	View.prototype.render = function () {
		if ( this.template && this.model )
		{
			this._template = $( Mustache.render(this.template, this.model) );
			this.bindEvents();

			return this._template;
		}

		return {};
	};

	View.prototype.bindEvents = function () {

		var events = this.events, key, el, element = null, model = this.model;

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

						element.on( key, {self: this, model: model}, this[events[key][el].attach] );
					}
				}
			}
		}
	};

	return View;
}());