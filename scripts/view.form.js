/*jslint devel: true, newcap: false, nomen: true, plusplus: true, white: true, indent: 4*/
/*global App, $, Mustache, alert, directory*/
App.Views.Form = (function () {
	'use strict';
	var _template = null;
	
	function Form(options) {
		options = options || {};
		
		this.$el = options.el ? $( options.el ) : null;
		this.template = options.template ? App.Utils.templateLoader.get( options.template ) : null;
		
		this.events		= {
			click: [{
				element	: '#btn-add',
				attach	: 'AddUser'
			}],
			change: [{
				element	: '#title',
				attach	: 'onChangePosition'
			}]
		};
	}
	
	Form.prototype.render = function () {
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
	
	Form.prototype.bindEvents = function () {
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
	
	Form.prototype.AddUser = function (e) {
		var self= e.data.self,
			data= {},
			url	= App.Utils.serviceUrl + 'addContact';
		
		self.$el.find('form').serializeArray().map(function( input ){
			data[input.name] = input.value;
		});
		
		$.ajax({
			url		: url,
			type	: 'POST',
			data	: JSON.stringify( data ),
			dataType: 'json',
			success	: function( rs ) {
				if ( rs.success === 1 )
				{
					App.global.directory.add(new App.Models.Contact({
						id			: rs.id,
						firstname	: data.firstname,
						lastname	: data.lastname,
						position	: data.title,
						department	: data.department,
						phone		: data.officePhone,
						email		: data.email
					}));
				}
			}
		});
	};
	
	Form.prototype.onChangePosition = function (e,c) {
		var department,
			self = e.data.self;
		
		switch ( $(this).val() )
		{
			case 'VP of Sales':
			case 'Sales Representative': department = 'Sales';
				break;
			case 'VP of Marketing': 
			case 'Marketing': department = 'Marketing';
				break;
			case 'VP of Engineering':
			case 'QA Manager':
			case 'Software Architect': department = 'Engineering';
				break;
			case 'CFO': department = 'Accounting';
				break;
			case 'President and CEO': department = 'Corporate';
				break;
		}
		
		self.$el.find('#department').val( department );
	};
	
	return Form;
}());