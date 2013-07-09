define(['backbone', 'models', 'views/item', 'views/newmail', 'views/notice'], function(Backbone, Models, ListView, NewMailView, NoticeView){
	
	return Backbone.View.extend({
		initialize: function(){
			this.listenTo(this.collection, "add", this.add);
			this.listenTo(this.collection, "reset", this.reset);
		},
		template: _.template($("#containerTemplate").html()),
		render: function(url){
			this.mailType = url;
			this.$el.html(this.template());
			this.container = this.$("#list-container");
			this.reset(this.collection);
			this.notice = new NotificationView({el: $("#notification")});
		},
		renderNewMail: function(){
			this.$el.html(this.template());
			new NewMailView({el: this.$(".mail-container"), parents: this, collection: this.collection}).render();
		},
		add: function(model){
			if (!model.get("isDeleted")){
				if ((this.mailType === "inbox" && model.get("isInbox")) ||
					(this.mailType === "draft" && model.get("isDraft")) ||
					(this.mailType === "starred" && model.get("isStarred"))){
						this.container.append(new ListView({model: model, parents: this}).render().el);	
				}
			}
			else{
				if (this.mailType === "deleted"){
					this.container.append(new ListView({model: model, parents: this}).renderDeleted().el);
				}			
			}
		},
		reset: function(collection){
			var self = this;
			this.container.empty().off();
			collection.each(function(model){
				model.setChecker(false);
				self.add(model);
			});
		},
		events: {
			"click .top-star": "allAddToStarred",
			"click .top-delete": "allAddToDeleted"
		},
		allAdd: function(param){
			this.collection.each(function(model){
				if (model.getChecker()){
					model.set(param, true);
				}
			});
			this.reset(this.collection);
		},
		allAddToStarred: function(event){
			this.allAdd("isStarred");
			this.notice.noticeShow("Selected mails starred");
		},
		allAddToDeleted: function(event){
			this.allAdd("isDeleted");
			this.notice.noticeShow("Selected mails deleted");
		}
	});

})