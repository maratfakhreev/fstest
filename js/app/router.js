define(['backbone'], function(Backbone){

	return Backbone.Router.extend({
		initialize: function(options){
			this.layoutView = options.layoutView;		
		},
		routes: {
			"newMail": "createMail",
			":url": "page"
		},
		page: function(url){
			this.layoutView.render(url);	
		},
		createMail: function(){
			this.layoutView.renderNewMail();
		}
	})

})