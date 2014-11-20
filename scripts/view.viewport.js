App.Views.Viewport = (function(){
	var _template = null;

	function Viewport( options ){
		options || (options={});

		this.title 		= options.title ? options.title : '';
		this.$el 		= options.el ? $(options.el) : null; 
		this.template	= options.template ? App.Utils.templateLoader.get( options.template ) : null;
		this.events		= {
			click: [{
				element	: '',
				attach	: ''
			}]
		};

		return this;
	};

	Viewport.prototype.render = function(){
		if ( this.template )
		{
			this._template = $( Mustache.render(this.template));
			//this.bindEvents();
			//
			if ( this.$el  )
				this.$el.prepend( this._template );
		}
	};

	Viewport.prototype.bindEvents = function(){

		var events = this.events;

		for ( key in events )
		{
			for ( el in events[key] )
			{
				var elment = null;

				if (this._template.prop('tagName').toLowerCase() == events[key][el].element )
					element = this._template;
				else
					element = this._template.find( events[key][el].element, this );

				element.on( key, this.model.model.attributes, this[events[key][el].attach] );
			}
		}
	};

	return Viewport;
}());

