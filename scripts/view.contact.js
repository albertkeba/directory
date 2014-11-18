App.Views.Contact = (function(){
	var _template = null;

	function View( options ){
		options || (options={});

		this.id 		= options.id 		? options.id : null;
		this.className	= options.className	? options.className : null;
		this.model		= options.model		? options.model : null;
		this.template	= options.template	? options.template : null;

		this.events 	= {
			click: [{
				element	: 'li',
				attach	: 'get'
			}]
		};
	};

	View.prototype.get	= function(e){
		var card = new App.Views.Card({
			model	: e.data,
			template: App.Utils.templateLoader.get('card')
		});

		$('#test').empty().append( card.render() );

		Lungo.Router.article('main','contact-view');
	};

	View.prototype.render = function(){
		if ( this.template && this.model )
		{
			this._template = $( Mustache.render(this.template, this.model.model.attributes) );
			this.bindEvents();

			return this._template;
		}

		return {};
	};

	View.prototype.bindEvents = function(){

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

	return View;
}());