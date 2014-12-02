/*jslint browser: true, devel: true, nomen: true, white: true*/
/*global App, $, Mustache, Lungo*/

App.Views.Card = (function () {
	'use strict';
	var _template = null;

	function View( options ){
		options = options || {};

		this.template	= options.template	|| null;
		this.model		= options.model		|| null;
		
		this.events		= {
			click: [{
				element	: '#btn-update',
				attach	: 'gotoUpdateContact'
			}]
		};
	}

	View.prototype.render = function(){
		if ( this.template && this.model )
		{
			this._template = $( Mustache.render(this.template, this.model) );
			this.bindEvents();
			return this._template;
		}

		return null;
	};
	
	View.prototype.bindEvents = function () {

		var events = this.events, key, el, element = null, model = this.model;

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

						element.on( key, {self: this, model: model}, this[events[key][el].attach] );
					}
				}
			}
		}
	};
	
	View.prototype.gotoUpdateContact = function(e){
		var $form= $('#contact-form').find('form'),
			model= e.data.model;
		
		if ( $form.length === 0 )
		{
			new App.Views.Form({
				el: '#contact-form',
				template: 'form'
			}).render();
			
			$form = $('#contact-form').find('form');
		}
		
		$form.find('#contactid').val( model.id );
		$form.find('#firstname').val( model.firstname );
		$form.find('#lastname').val( model.lastname );
		$form.find('#title').val( model.title );
		$form.find('#department').val( model.department );
		$form.find('#officePhone').val( model.phone );
		$form.find('#email').val( model.email );
		
		Lungo.Router.article('main','contact-form');
	};

	return View;
}());