/*jslint devel: true, nomen: true, plusplus: true, white: true*/
/*global App, $*/
App.Views.ListContacts = (function(){
	'use strict';
	var _itemViews = {};

	function List( options ){
		options = options || {};

		this.collection = options.collection || {};
		this.$el		= options.el ? $(options.el) : null;
		this.listener	= false;
		this.init();
	}

	List.prototype.init = function(e){
		var self	= this,
			$element= $(document.createDocumentFragment()),
			i		= _itemViews.length;

		App.Event.on('add', function(sender,model){
			_itemViews[ i ] = new App.Views.Contact({
				id		: i,
				el		: '#contact-view',
				model	: model.attributes,
				template: App.Utils.templateLoader.get('list-contact')
			}).render();

			$element.append( _itemViews[ i ] );

			if ( self.$el !== null ) {
				self.$el.append( $element  );
			}
		});
	};

	List.prototype.render = function(){
		var self = this,
			$element = $(document.createDocumentFragment()),
			i = 0;

		for ( i=0; i<this.collection.models.length; i++ )
		{
			_itemViews[ i ] = new App.Views.Contact({
				id		: i,
				el		: '#contact-view',
				model	: this.collection.models[i].model.attributes,
				template: App.Utils.templateLoader.get('list-contact')
			}).render();

			$element.append( _itemViews[ i ] );
		}

		if ( this.$el !== null ) {
			this.$el.append( $element  );
		}
	};

	List.prototype.set = function(param, value){
		
		if ( this.hasOwnProperty(param) )
		{
			this[param] = value;
		}
	};
	
	List.prototype.get = function(param){
		
		if ( this.hasOwnProperty(param) )
		{
			return this[param];
		}
	};
	
	return List;
}());