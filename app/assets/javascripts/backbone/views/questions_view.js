App.Views.Questions = Backbone.View.extend({
	className: "questions",
	item_template: JST["backbone/templates/question-item"].call(this),
	
	initialize: function(){
		_.bindAll(this, "render", "addOne", "addAll");
		this.collection.bind("add", this.addOne);
		this.collection.bind("remove", this.addAll);
		this.collection.bind("reset", this.addAll);
	},
	
	render: function(){
		this.collection.length ? this.addAll() : this.collection.fetch();
		return this
	},
	
  addOne: function (a) {
    if (!this.$("[data-item-id=" + a.id + "]").length) $(this.el).append((new App.Views.QuestionItem({ model: a })).render().el);
  },

   addAll: function () {
     if (this.collection.length) this.collection.each(this.addOne)
   }
});