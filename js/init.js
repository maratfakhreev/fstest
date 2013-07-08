requirejs.config({
	urlArgs: "bust=" + (new Date()).getTime(), //только в режиме разработки
	baseUrl: "js/libs",
	paths: {
		jquery: "jquery-1.9.1.min",
		underscore: "underscore-min",
		backbone: "backbone-min",	
		modernizr: "modernizr-2.6.2.min",
		plugins: "plugins",

 		views: "../app/views",
 		router: "../app/router",
 		models: "../app/models",
	},
	shim: {
		'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
	}
});

require(['jquery', 'router', 'modernizr', 'plugins'], function($, Router){
	new Router.Start();
	Backbone.history.start();
})