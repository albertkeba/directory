/*jslint devel: true, nomen: true, plusplus: false, white: true, indent: 4*/
/*global App*/
App.Models.Contact = (function () {
	'use strict';
	function Model(options) {
		options = options || {};

		this.attributes	= {};

		this.init(options);
	}

	Model.prototype.init = function( options ){
		if (options.data) {
			this.parse(options.data);
		}

		if (options.initialize) {
			options.initialize();
		}
	};

	Model.prototype.parse = function( data ){
		var _c = {
			id			: parseInt(data.id, 10),
			firstname	: data.firstName,
			lastname	: data.lastName,
			email		: data.email,
			city		: data.city,
			phone		: data.cellPhone,
			position	: data.title,
			picture		: data.picture,
			title		: data.title,
			department	: data.department
		};

		this.attributes = _c;
		_c = null;
		
		return this;
	};

	Model.prototype.get	= function ( id ){
		if ( this.attributes[ id ] )  {
			return this.attributes[ id ];
		} else {
			return {};
		}
	};

	Model.prototype.set	= function( id, value ){
		if ( this.attributes[id] )
		{
			this.attributes[id] = value;
			App.Event.notify('change', this.attributes);

			return this.attributes[ id ];
		}
	};
	
	Model.prototype.setAttibutes = function( id, model ){
		this.attributes.firstname	= model.firstName;
		this.attributes.lastname	= model.lastName;
		this.attributes.cellPhone	= model.cellPhone;
		this.attributes.email		= model.email;
		this.attributes.title		= model.title;
		this.attributes.department	= model.department;
		
		App.Event.notify('change', id);
	};

	return Model;
}());