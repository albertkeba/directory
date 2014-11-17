App.Utils = {
	serviceUrl: 'http://localhost/service/',
	templateLoader: {
		templates: {},
		load: function ( names, callback ) {
			var deffereds 	= [],
				self 		= this;

			$.each(names, function(index, name) {
				deffereds.push( $.get('tmpl/' + name + '.html', function ( data ) {
					self.templates[ name ] = data;
				}));
			});

			$.when.apply(null, deffereds).done( callback );
		},
		get: function ( name ) { 
			return this.templates[ name ];
		}
	},
	showDebug: function( log ){
		if ( app.config.debug )
		{
			if ( typeof console !== 'undefined' || typeof console.log !== 'undefined' )
			{
				console.log( log );
			}
		}
	}
};