/*jslint devel: true, nomen: true, plusplus: true, white: true*/
/*global App, $*/
App.Views.ListContacts = (function(){
	'use strict';
	var _itemViews = {};

	function List( options ){
		options = options || {};

		this.collection = options.collection || {};
		this.$el		= options.el ? $(options.el) : null; 
		//this.init();
	}

	List.prototype.init = function(){
		console.log('init list');
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
				model	: this.collection.models[i],
				template: App.Utils.templateLoader.get('list-contact')
			}).render();

			$element.append( _itemViews[ i ] );
		}

		if ( this.$el !== null ) {
			this.$el.append( $element  );
		}
	};

	return List;
}());