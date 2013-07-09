define(['backbone'], function(Backbone){
	var _class = this;

	this.MailModel = Backbone.Model.extend({
		initialize: function(){
			this.checker = false;
		},
		defaults: {
			"title": "",
			"isInbox": true,
			"isDraft": false,
			"isStarred": false,
			"isDeleted": false
		},
		setChecker: function(bool){
			this.checker = bool;
		},
		getChecker: function(){
			return this.checker;
		}
	}),

	this.MailCollection = Backbone.Collection.extend({
		model: _class.MailModel,
		url: "json/data.json",
		parse: function(response){
			return response;
		},
		addNewMail: function(value){
			this.add(new _class.MailModel({
				"title": value, 
				"isDraft": true, 
				"isInbox": false
			}));
		}
	});

	return _class;
})