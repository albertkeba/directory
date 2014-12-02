/*jslint devel: true, newcap: false, nomen: true, plusplus: true, white: true, indent: 4*/
/*global App, $, Mustache, alert, directory,Lungo*/
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
		var self = e.data.self,
			data = {},
			url	 = App.Utils.serviceUrl + 'addContact',
			form = self.$el.find('form'),
			type = 'POST',
			msg  = 'Succès';
		
		form.serializeArray().map(function( input ){
			data[input.name] = input.value;
		});
		
		if ( data.contactid !== '' )
		{
			url = App.Utils.serviceUrl + 'updateContact/' + data.contactid;
			type= 'PUT';
		}
		
		$.ajax({
			url		: url,
			type	: type,
			data	: JSON.stringify( data ),
			dataType: 'json',
			success	: function( rs ) {
				if ( rs.success === 1 )
				{
					if ( data.contactid === '' )
					{
						App.global.directory.add(new App.Models.Contact({data: {
							id			: rs.id,
							firstName	: data.firstname,
							lastName	: data.lastname,
							title		: data.title,
							department	: data.department,
							cellPhone	: data.officePhone,
							email		: data.email
						}}));
						
						msg = 'Contact ajouté';
					}
					
					form[0].reset();
					
					Lungo.Notification.show('check', msg, 2, function(){
						Lungo.Notification.hide();
						Lungo.Router.article('main','main-article');
					});
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