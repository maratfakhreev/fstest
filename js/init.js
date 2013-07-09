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

require(['jquery', 'router', 'models', 'views/layout', 'modernizr', 'plugins'], function($, Router, Models, LayoutView){
	this.collection = new Models.MailCollection();
	this.collection.fetch();
	this.layoutView = new LayoutView({el: $("#wrapper"), collection: this.collection});
	var router = new Router({collection: this.collection, layoutView: this.layoutView});

	Backbone.history.start({
		pushState: Modernizr.history,
		root: "fstest"
	});
	if (Backbone.history && Backbone.history._hasPushState) {
	  	$(document).on("click", "a", function(event) {
		    var href = $(this).attr("href"),
		    	protocol = this.protocol + "//";
		    console.log(href.slice(protocol.length));
		    if (href.slice(protocol.length) !== protocol) {
		    	event.preventDefault();
				router.navigate(href, true);
				return false;
			}
			else{
				return true;
			}	
	  	});
	}	
	router.navigate("inbox", true);
})