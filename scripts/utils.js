/*jslint devel: true, white: true*/
/*global App, $*/
App.Utils = {
	serviceUrl: 'http://localhost/service/',
	templateLoader: {
		templates: {},
		load: function ( names, callback ) {
			'use strict';
			var deffereds	= [],
				self		= this;

			$.each(names, function(index, name) {
				deffereds.push( $.get('tmpl/' + name + '.html', function ( data ) {
					self.templates[ name ] = data;
				}));
			});

			$.when.apply(null, deffereds).done( callback );
		},
		get: function ( name ) { 
			'use strict';
			return this.templates[ name ];
		}
	},
	showDebug: function( log ){
		'use strict';
		if ( App.Config.debug )
		{
			if ( typeof console !== 'undefined' || typeof console.log !== 'undefined' )
			{
				console.log( log );
			}
		}
	}
};