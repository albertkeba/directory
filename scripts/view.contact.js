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
				element	: 'h4',
				attach	: 'test'
			},{
				element	: 'span',
				attach	: 'retest'
			}],
			mouseenter: [{
				element	: 'span',
				attach	: 'mouseenter'
			}]
		};
	};

	View.prototype.get	= function(){};

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
				this._template.find( events[key][el].element ).on( key, this.model.model.attributes, this[events[key][el].attach] );
			}
		}
	};

	View.prototype.test = function(e){
		console.log('-- test --',e.data);
	};

	View.prototype.retest = function(){
		console.log('-- reTest -- ');
	};

	View.prototype.mouseenter = function(e){
		console.log('mouseenter', e.data);
	};

	return View;
}());