App.Views.Card = (function(){
	var _template = null;

	function View( options ){
		options || (options={});

		this.template 	= options.template 	? options.template : null;
		this.model		= options.model		? options.model : null;
	};

	View.prototype.render = function(){
		if ( this.template && this.model )
		{
			this._template = $( Mustache.render(this.template, this.model) );
			return this._template;
		}

		return null;
	};

	return View;
}());