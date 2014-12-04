/*jslint devel: true, nomen: true, plusplus: true, white: true*/
/*global $, Mustache*/
var View = (function () {
	'use strict';
	var _template = null;
	
	function Class(){
		console.log('construct Class');
	}
	
	Class.prototype.render = function () {
		
		if ( this.template && this.model )
		{
			this._template = $( Mustache.render(this.template, this.model) );
			this.bindEvents();

			return this._template;
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

						element.on( key, {self:this},this[events[key][el].attach] );
					}
				}
			}
		}
	};
	
	return Class;
}());

var Child = (function () {
	'use strict';
	
	function Class(){
		View.call(this);
	}
	
	Class.prototype = Object.create(View.prototype);
	
	Class.prototype.testbis = function() {
		console.log('testbis');
	};
	
	return Class;
}());

var V = new View();
console.log(V);
//V.test();

var C = new Child();
console.log(C);