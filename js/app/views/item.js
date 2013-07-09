define(['backbone', 'models'], function(Backbone, Models){

	return Backbone.View.extend({
		tagName: "li",
		initialize: function(){
	    	$.data(this.el, "view", this);
	    },
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
			that.toggleClass("active");
			this.model.set("isStarred", that.hasClass("active"));
			if (that.hasClass("active")){
				this.options.parents.notice.noticeShow("Mail starred");
			}
		},
		addToDeleted: function(event){
			this.model.set("isDeleted", true);
			this.$el.remove();
			this.options.parents.notice.noticeShow("Mail deleted");
		},
		removeToDeleted: function(event){
			this.model.set("isDeleted", false);
			this.$el.remove();
			this.options.parents.notice.noticeShow("Mail restored");
		},
		checkItem: function(event){
			var that = $(event.currentTarget);
			that.toggleClass("checked");
			that.toggleClass("active");
			this.model.setChecker(that.hasClass("active"));
		}
	});

})