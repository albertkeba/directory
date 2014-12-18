/*jslint browser: true, devel: true, nomen: true, white: true*/
/*global App, $, Mustache, Lungo, View*/

App.Views.Card = (function () {
	'use strict';

	function ViewCard( options ){
		View.call(this, options);
	
		this.events		= {
			click: [{
				element	: '#btn-update',
				attach	: 'gotoUpdateContact'
			},{
				element	: '#btn-delete',
				attach	: 'deleteContact'
			}]
		};
	}

	ViewCard.prototype = Object.create( View.prototype );
	
	ViewCard.prototype.render = function() {
		this.$el.empty();
		
		View.prototype.render.call(this);
	};
	
	ViewCard.prototype.gotoUpdateContact = function( e ){
		var $form= $('#contact-form').find('form'),
			model= e.data.model,
			idx	 = e.currentTarget.attributes['data-id'].value;
		
		if ( $form.length === 0 )
		{
			new App.Views.Form({
				el: '#contact-form',
				template: 'form'
			}).render();
			
			$form = $('#contact-form').find('form');
		}
		
		$form.find('#idx').val( idx );
		$form.find('#contactid').val( model.id );
		$form.find('#firstname').val( model.firstname );
		$form.find('#lastname').val( model.lastname );
		$form.find('#title').val( model.title );
		$form.find('#department').val( model.department );
		$form.find('#officePhone').val( model.phone );
		$form.find('#email').val( model.email );
		
		Lungo.Router.article('main','contact-form');
	};
	
	ViewCard.prototype.deleteContact = function(){
		Lungo.Notification.confirm({
			icon		: 'user',
			title		: 'Supprimer le contact',
			description	: 'Voulez-vous supprimer ce contact?',
			accept		: {
				icon	: 'checkmark',
				label	: 'Confirmer',
				callback: function(){
					alert('ok');
				}
			},
			cancel		: {
				icon	: 'close',
				label	: 'Annuler',
				callback: function(){
					alert('cancel');
				}
			}
		});
	};

	return ViewCard;
}());