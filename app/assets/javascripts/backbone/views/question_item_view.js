App.Views.QuestionItem = Backbone.View.extend({
	className: "question-item",
	item_template: JST["backbone/templates/question-item"].call(this),
	detail_template: JST["backbone/templates/question-detail"].call(this),
	config: {
      item: {
          template: "item_template"
      },
      detail: {
          template: "detail_template"
      }
	},
	events: {
		"click     ": "toggleDetails"
	},
	
	initialize: function(){
		_.bindAll(this, "render");
		this.model.bind("change", this.render);
		this.type = this.options.type
	},
	
	render: function(){
		var a = this.type,model = this.model.toJSON();
		$(this.el).html(Mustache.to_html(this[this.config[a].template], model)).attr({"data-item-id": model.id})
		return this
	},
	toggleDetails: function(a){

	 	if (!$(this.el).parents(".details-pane").length) {
         var b = $(this.el),
             c = this,
             f = $(this.el).attr('data-item-id');
         a.preventDefault();
			   b.siblings().removeClass("opened");
			   b.toggleClass("opened", !b.hasClass("opened"));
				 if(b.hasClass("opened")){

					 (App.Widgets.Dashboard && $(App.Widgets.Dashboard.el).hide(),App.Widgets.Details = new App.Views.Details,$(".details-pane-shell").append(App.Widgets.Details.render().el), App.Widgets.Details.open());
						$.ajax(mURL("/questions/" + f) + "?auth_token=" + TK).success(function (a) {
								var answers = a.answers;a.answers = null;
								App.Widgets.Details.options.question_detail = new App.Models.Question(a,{id: f});
								App.Widgets.Details.options.answers = new App.Collections.Answers(answers,{id: f});
								App.Widgets.Details.loadQuestionDetail();
						 });
					 }else {
						(App.Widgets.Details.close(), App.Widgets.Dashboard && $(App.Widgets.Dashboard.el).show(), b.removeClass("opened"))
					}
     }
	}
});