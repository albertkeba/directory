/*jslint devel: true, newcap: false, nomen: true, plusplus: true, white: true, indent: 4*/
/*global App, $, Mustache, alert, directory,Lungo, View*/
App.Views.Form = (function () {
	'use strict';
	
	function ViewForm( options ) {
		View.call(this, options);

		this.events	= {
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
	
	ViewForm.prototype = Object.create( View.prototype );
	
	ViewForm.prototype.AddUser = function( e ){
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
					var model = {
						id			: rs.id,
						firstName	: data.firstname,
						lastName	: data.lastname,
						title		: data.title,
						department	: data.department,
						cellPhone	: data.officePhone,
						email		: data.email
					},viewContact;
					
					if ( data.contactid === '' )
					{
						App.global.directory.add(new App.Models.Contact({data: model}));
						
						msg = 'Contact ajouté';
					}
					else
					{
						App.global.directory.setModel(data.idx, model);
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
	
	ViewForm.prototype.onChangePosition = function( e,c ){
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
	
	return ViewForm;
}());
