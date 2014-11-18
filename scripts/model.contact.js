App.Models.Contact = (function(){
	function Model( options ){
		options || (options={});

		this.attributes	= {};

		this.init( options );
	};

	Model.prototype.init  	= function( options ){
		if ( options.data )
			this.parse( options.data );

		if ( options.initialize )
			options.initialize();
	};

	Model.prototype.parse 	= function( data ){
		var _c = {
			id			: parseInt(data.id),
			firstname	: data.firstName,
			lastname	: data.lastName,
			email		: data.email,
			city		: data.city,
			phone		: data.cellPhone,
			position	: data.title,
			picture		: data.picture,
			title		: data.title
		};

		this.attributes = _c;
		_c = null;
		
		return this;
	};

	Model.prototype.get		= function( id ){
		if ( this.attributes[ id ] )
			return this.attributes[ id ];
		else
			return {};
	};

	Model.prototype.set		= function( id, value){
		if ( this.attributes[id] )
		{
			this.attributes[id] = value;
			App.Event.notify('change', this.attributes);

			return this.attributes[ id ];
		}
	};

	return Model;
}());