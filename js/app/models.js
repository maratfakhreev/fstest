define(['backbone'], function(Backbone){
	var _class = this;

	this.MailModel = Backbone.Model.extend({
		defaults: {
			"title": "",
			"isInbox": 1,
			"isDraft": 0,
			"isStarred": 0,
			"isDeleted": 0,
			"checked": 0
		}
	}),

	this.MailCollection = Backbone.Collection.extend({
		model: _class.MailModel,
		url: "json/data.json",
		parse: function(response){
			return response;
		},
		//при синхронной загрузке данных, после формирования коллекции 
		//таким образом можно возвращать отфильтрованную коллекцию.
		//Но при ассинхронном подходе данный метод не подходит, так как
		//данные рендерятся в процессе получения
		// byInbox: function(url) {
		//     var filtered = this.filter(function(mail) {
		//       	return mail.get("is" + url) == 1;
		//     });
		//     return new MailCollection(filtered);
		// }
	});

	return _class;
})