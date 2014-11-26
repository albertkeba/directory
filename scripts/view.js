/*jslint devel: true, nomen: true, white: true*/
/*global App, $, Mustache*/

var View = (function () {
	'use strict';
	var _template = null;
	function Class( options ) {
		options = options || null;
		
		if (options)
		{
			this.template	= options.template || null;
			this.events		= options.events || null;
			this.$el		= options.el ? $( options.el ) : null;
			this.model		= options.model || null;
		}
	}
	
	Class.extend = function ( options ) {
		var prop,
			extended= {},
			prototype= new this();
		
		for ( prop in options ) 
		{
			if ( options.hasOwnProperty( prop) )
			{
				if ( Object.prototype.hasOwnProperty.call(options, prop) )
				{
					prototype[prop] = options[prop];
				}

				if ( /function/.test(options[prop]) )
				{
					if ( this.prototype.hasOwnProperty( prop) )
					{
						prototype[prop] = options[prop];
					}
				}
			}
		}
		
		Class.prototype = prototype;
		prototype = null;
		
		return Class;
	};
	
	Class.prototype.render = function(){
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
		
	Class.prototype.bindEvents = function () {
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
	
	return Class;
})();

var V = View.extend({
	template: 'Temp',
	model: {},
	render: function(){
		'use strict';
		console.log('render child');
	}
});

var v = new V();

console.log(v);
v.render();