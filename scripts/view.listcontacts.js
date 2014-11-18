App.Views.ListContacts = (function(){
	var _itemViews = {};

	function List( options ){
		options || (options={});

		this.collection = options.collection ? options.collection : {};
		this.$el 		= options.el ? $(options.el) : null; 
		//this.init();
	};

	List.prototype.init = function(){
		console.log('init list');
	};

	List.prototype.render = function(){
		var self = this,
			$element = $(document.createDocumentFragment());

		for ( var i=0; i<this.collection.models.length; i++ )
		{
			_itemViews[ i ] = new App.Views.Contact({
				id	 : i,
				model: this.collection.models[i],
				template: App.Utils.templateLoader.get('list-contact')
			}).render();

			$element.append( _itemViews[ i ] );
		}

		if ( this.$el != null )
			this.$el.append( $element  );
	};

	return List;
}());