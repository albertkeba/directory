/*jslint devel: true, nomen: true, plusplus: true, white: true*/
/*global $, Mustache, App*/
var View = (function () {
	'use strict';
	var _template = null;
	
	function Class( options ){
		options = options || {};
		
		this.template	= options.template ? App.Utils.templateLoader.get( options.template ) : null;
		this.model		= options.model		|| null;
		this.id			= options.id		|| null;
		this.$el		= options.el ? $( options.el ) : null;
		this.className	= options.className	|| null;
		this.events		= {};
	}
	
	Class.prototype.constructor = View;
	
	Class.prototype.render = function () {
		if ( this.template )
		{
			this._template = $( Mustache.render(this.template, this.model) );
			this.bindEvents();

			if ( this.$el )
			{
				this.$el.prepend( this._template );
			}
			else
			{
				return this._template;
			}
		}

		return {};
	};
	
	Class.prototype.bindEvents = function() {
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

						element.on( key, {self:this, model:this.model},this[events[key][el].attach] );
					}
				}
			}
		}
	};
	
	return Class;
}());