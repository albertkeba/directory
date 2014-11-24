/*jslint devel: true, white: true*/
/*global App, $*//*
(function () {
	//'use strict';
	
	this.Class = function(){}
	
	Class.extend = function (prop) {
		function Class() {}
		
		Class.prototype = new this();
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		
		return Class;
	};
})();

App.Views.Test = Class.extend({
	test: function(){}
});*/

//http://esbueno.noahstokes.com/post/77292606977/self-executing-anonymous-functions-or-how-to-write
//http://ejohn.org/blog/simple-javascript-inheritance/

var View = (function () {
	'use strict';
	
	function Class(options) {
		options = options || null;
		
		this.template = options.template || null;
	}
	
	Class.extend = function (options) {
		var prop,
			extended = {};
		
		for (prop in options) 
		{
			/*if ( Object.prototype.hasOwnProperty.call(options, prop) )
			{
				extended[prop] = options[prop];
			}*/
			
			//console.log(prop, this.[prop]);
			console.log(Object.prototype.hasOwnProperty.call(Class, this[prop]));
		}
	};
	
	return Class;
})();

var v = View.extend({
	template: 'View'
});

console.log(v);