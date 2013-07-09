define(['backbone', 'models'], function(Backbone, Models){

	return NotificationView = Backbone.View.extend({
		template: _.template($("#notificationTemplate").html()),
		noticeShow: function(msg){
			this.$el.html(this.template({message: msg})).addClass("show");
			return this;
		},
		events: {
			"click .close": "noticeClose"
		},
		noticeClose: function(){
			this.$el.removeClass("show");
		},
	});

})