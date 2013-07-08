define(['backbone', 'models'], function(Backbone, Models){
	var _class = this;

	this.ContainerView = Backbone.View.extend({
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
		},
		renderNewMail: function(){
			this.$el.html(this.template());
			new _class.NewMailView({el: this.$(".mail-container"), collection: this.collection}).render();
		},
		add: function(model){
			if (!model.get("isDeleted")){
				if ((this.mailType === "Inbox" && model.get("isInbox") == 1) ||
					(this.mailType === "Draft" && model.get("isDraft") == 1) ||
					(this.mailType === "Starred" && model.get("isStarred") == 1)){
						this.container.append(new _class.ListView({model: model}).render().el);	
				}
			}
			else{
				if (this.mailType === "Deleted"){
					this.container.append(new _class.ListView({model: model}).renderDeleted().el);
				}			
			}
		},
		reset: function(collection){
			var self = this;
			this.container.empty().off();
			collection.each(function(model){
				model.set("checked", 0);
				self.add(model);
			});
		},
		events: {
			"click .star": "allAddToStarred",
			"click .delete": "allAddToDeleted"
		},
		allAdd: function(param){
			this.collection.each(function(model){
				if (model.get("checked") == 1){
					model.set(param, 1);
				}
			});
			this.reset(this.collection);
		},
		allAddToStarred: function(event){
			this.allAdd("isStarred");
		},
		allAddToDeleted: function(event){
			this.allAdd("isDeleted");
		}
	});

	this.ListView = Backbone.View.extend({
		tagName: "li",
		template: _.template($("#mailItemTemplate").html()),
		deletedTemplate: _.template($("#deletedItemTemplate").html()),
		render: function(){
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		renderDeleted: function(){
			this.$el.html(this.deletedTemplate(this.model.attributes));
			return this;
		},
		events: {
			"click .star": "addToStarred",
			"click .delete": "addToDeleted",
			"click .restore": "removeToDeleted",
			"click .checker": "checkItem",
		},
		addToStarred: function(event){
			var that = $(event.currentTarget);
			if (that.hasClass("active")){
				this.model.set("isStarred", 0);
				that.removeClass("active");
			}
			else{
				this.model.set("isStarred", 1);
				that.addClass("active");
			};
			alert("Mail starred");
		},
		addToDeleted: function(event){
			this.model.set("isDeleted", 1);
			this.$el.remove();
			alert("Mail deleted");
		},
		removeToDeleted: function(event){
			this.model.set("isDeleted", 0);
			this.$el.remove();
			alert("Mail restored");
		},
		checkItem: function(event){
			var that = $(event.currentTarget);
			if (that.hasClass("active")){
				this.model.set("checked", 0);
				that.removeClass("active");
			}
			else{
				this.model.set("checked", 1);	
				that.addClass("active");
			}		
		}
	});

	this.NewMailView = Backbone.View.extend({
		template: _.template($("#newMailTemplate").html()),
		render: function(){
			this.$el.html(this.template());
		},
		events: {
			"click #save": "saveMail"
		},
		saveMail: function(){
			var input = this.$el.find("input"),
				value = input.val();
			if (value != ""){
				this.collection.add(new Models.MailModel({
					"title": value, "isDraft": 1, "isInbox": 0
				}));
				input.removeClass("error").val("");
				alert("Mail created");
			}
			else{
				input.addClass("error");
			}
		}
	})

	return _class;
})