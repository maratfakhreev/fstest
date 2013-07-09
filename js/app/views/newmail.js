define(['backbone', 'models'], function(Backbone, Models){

	return Backbone.View.extend({
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
			if (value.trim() != ""){
				this.collection.addNewMail(value);
				input.removeClass("error").val("");
				this.options.parents.notice.noticeShow("Mail created");
			}
			else{
				input.addClass("error");
			}
		}
	});

})