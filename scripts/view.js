/*jslint devel: true, white: true*/
/*global App, $, Mustache*/

//http://esbueno.noahstokes.com/post/77292606977/self-executing-anonymous-functions-or-how-to-write
//http://ejohn.org/blog/simple-javascript-inheritance/
//http://krasimirtsonev.com/blog/article/JavaScript-dependency-free-extend-method
//http://www.htmlgoodies.com/html5/javascript/extending-javascript-objects-in-the-classical-inheritance-style.html#fbid=tlutCPMf82L
//http://www.htmlgoodies.com/html5/javascript/calling-parent-methods-in-javascript.html#fbid=tlutCPMf82L

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
			extended = {},
			prototype= new this();
		
		for ( prop in options ) 
		{
			if ( Object.prototype.hasOwnProperty.call(options, prop) && Object.prototype.hasOwnProperty.call(prototype, prop) )
			{
				prototype[prop] = options[prop];
			}
		}
			
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
		
		Class.prototype = prototype;
		Class.extend = arguments.callee;
		prototype = null;
		
		return Class;
	};
	
	return Class;
})();

var V = View.extend({
	template: 'View'
});

var vv = new V({template: 'Test'});

console.log(vv);