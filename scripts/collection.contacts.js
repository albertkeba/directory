App.Collections.Contacts = (function(){
	//-- private objects
	var _model 	= {},
		_service= '';

	function Collection( options ){
		options || (options={});

		_model  	= options.model ? options.model : null;
		_service	= 'http://localhost/service/contacts';
		this.models = [];
		this.init( options );

		return this;
	};

	Collection.prototype.init	= function( options ){
		if ( options.models )
			this.add( options.models );
	};

	Collection.prototype.add	= function( model, id ){
		id || (id=this.models.length+1);

		this.models.push({
			id	 : id, 
			model: model
		});
	};

	Collection.prototype.fetch	= function( callback ){
		var self = this,
			tab  = [];

		$.ajax({
			url		: _service,
			type	: 'GET',
			dataType: 'json',
			success	: function( result ){
				for( var i=0; i<result.length; i++ )
				{
					tab.push( new _model({data: result[i]}) );
				}

				for ( var i=0; i<tab.length; i++ )
				{
					self.add( tab[i], i );
				}

				tab = null;

				if ( callback )
					callback( self );
			}
		});
	};

	Collection.prototype.get	= function( id ){
		return this.models[ id ].model;
	};

	Collection.prototype.set 	= function( id, value ){
		this.get( id ).set( id, value );
	}

	return Collection;
}());