define(['backbone', 'views', 'models'], function(Backbone, Views, Models){

	this.Start = Backbone.Router.extend({
		initialize: function(){
			window.location.href = "#Inbox";
			this.collection = new Models.MailCollection();
			this.collection.fetch();
			this.mainView = new Views.ContainerView({el: $("#wrapper"), collection: this.collection});
		},
		routes: {
			"newMail": "createMail",
			":url": "page"
		},
		page: function(url){
			console.log(this.collection);
			this.mainView.render(url);	
		},
		createMail: function(){
			this.mainView.renderNewMail();
		}
	})

	return this;
})