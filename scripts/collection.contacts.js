/*jslint devel: true, nomen: true, plusplus: true, white: true, indent: 4*/
/*global $,App*/

App.Collections.Contacts = (function(){
	'use strict';
	//-- private objects
	var _model	= {},
		_service= '';

	function Collection( options ){
		options = options || {};

		_model		= options.model || null;
		_service	= 'http://localhost/service/contacts';
		this.models	= [];
		this.init( options );

		return this;
	}

	Collection.prototype.init = function( options ){
		if ( options.models )
		{
			this.add( options.models );
		}
	};

	Collection.prototype.add = function( model, id ){
		id = id || (this.models.length+1);

		this.models.push({
			id	 : id, 
			model: model
		});
		
		App.Event.notify('add', model);
	};

	Collection.prototype.fetch = function( callback ){
		var self = this,
			tab  = [],
			i = 0;

		$.ajax({
			url		: _service,
			type	: 'GET',
			dataType: 'json',
			success	: function( result ){
				var Model = _model;
				for( i=0; i<result.length; i++ )
				{
					tab.push( new Model({data: result[i]}) );
				}

				for ( i=0; i<tab.length; i++ )
				{
					self.add( tab[i], i );
				}

				tab = null;

				if ( callback )
				{
					callback( self );
				}
			}
		});
	};

	Collection.prototype.get = function( id ){
		return this.models[ id ].model;
	};

	Collection.prototype.set = function( id, value ){
		this.get( id ).set( id, value );
	};
	
	Collection.prototype.setModel = function( id, model ){
		this.models[ id ].model.setAttibutes( id, model );
	};

	return Collection;
}());