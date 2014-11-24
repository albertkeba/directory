/*jslint nomen: true, plusplus: true, white: true, indent: 4*/
var Event = (function () {
    'use strict';
    function Event(sender) {
		this._sender      = sender;
		this._listeners   = {
			change: []
		};
	}

	Event.prototype.notify = function( event, args ){
		var i = 0;
		for( i=0;  i<this._listeners[ event ].length; i++ )
		{
			this._listeners[ event ][ i ](this._sender, args);
		}
	};

	Event.prototype.on = function( event, listener ){
		this._listeners[ event ].push( listener );
	};

	return Event;
}());