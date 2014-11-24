/*jslint devel: true, newcap: false, nomen: true, plusplus: true, white: true, indent: 4*/
/*global App, $, Mustache, alert*/
App.Views.Form = (function () {
	'use strict';
	var _template = null;
	
	function Form(options) {
		options = options || {};
		
		this.$el = options.el ? $( options.el ) : null;
		this.template = options.template ? App.Utils.templateLoader.get( options.template ) : null;
		
		this.events		= {
			click: [{
				element	: '#btn-add',
				attach	: 'AddUser'
			}],
			change: [{
				element	: '#position',
				attach	: 'test'
			}]
		};
	}
	
	Form.prototype.render = function () {
		if ( this.template )
		{
			this._template = $( Mustache.render(this.template) );
			this.bindEvents();

			if ( this.$el  )
			{
				this.$el.prepend( this._template );
			}
		}
	};
	
	Form.prototype.bindEvents = function () {
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
	
	Form.prototype.AddUser = function () {
		alert('add user');
	};
	
	Form.prototype.test = function () {
		alert('select');
	};
	
	return Form;
}());