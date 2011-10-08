App.Views.QuestionItem = Backbone.View.extend({
	className: "question-item",
	item_template: JST["backbone/templates/question-item"].call(this),
	
	initialize: function(){
		_.bindAll(this, "render");
		this.model.bind("change", this.render);
	},
	
	render: function(){
		var a = this.model.toJSON();
		$(this.el).html(Mustache.to_html(this.item_template, a)).attr({"data-item-id": a.id})
		return this
	}
});