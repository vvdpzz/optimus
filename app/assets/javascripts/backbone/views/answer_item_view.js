App.Views.AnswerItem = Backbone.View.extend({
	className: "answer-item",
	template: JST["backbone/templates/answer-item"].call(this),
	events: {},
	initialize: function(){
		_.bindAll(this, "render");
		this.model.bind("change", this.render);
	},
	render: function(){
		$(this.el).html(Mustache.to_html(this.template, this.model.toJSON()));
		return this
	}
});