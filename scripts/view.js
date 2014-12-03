/*jslint devel: true, nomen: true, plusplus: true, white: true*/
var View = (function () {
	'use strict';
	
	function Class(){}
	
	Class.prototype.test = function() {
		console.log('test View');
	};
	
	return Class;
}());

var Child = (function () {
	'use strict';
	
	function Class(){}
	
	Class.prototype = Object.create(View.prototype);
	
	/*Class.prototype.test = function(){
		console.log('test Child');
	};*/
	
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

C.test();
C.testbis();