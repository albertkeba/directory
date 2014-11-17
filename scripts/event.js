var Event = (function(){
	function Event( sender ){
		this._sender	= sender;
		this._listeners = {
			change: []
		};
	};

	Event.prototype.notify = function( event, args ){
		for( var i=0;  i<this._listeners[ event ].length; i++ )
		{
			this._listeners[ event ][ i ](this._sender, args);
		}
	};

	Event.prototype.on = function( event, listener ){
		this._listeners[ event ].push( listener );
	};

	return Event;
}());