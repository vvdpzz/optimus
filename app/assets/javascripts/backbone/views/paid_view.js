App.Views.Paid = Backbone.View.extend({
  el: "#doc",
  template: JST["backbone/templates/page-container"].call(this),
  tabs_template: JST["backbone/templates/question-tabs"].call(this),
  
  initialize: function(){
    _.bindAll(this, "render", "loadMain");
    this.questions = App.Cache.get("quesions/Paid") || App.Cache.set("quesions/Paid", new App.Collections.Questions([],{
        type: "paid"
    }))
	},
    
  render: function(){
    $(this.el).attr("class", "route-"+App.Pages.route+" container");
    $(PAGE_CONTAINER).attr("class", App.Pages.route+"-container").siblings().not(".index-container").remove();
    $(PAGE_CONTAINER).find(MAIN).length ? (this.$(MAIN).html(""),this.$(DASHBOARD).html(""), this.$(DETAILS_PANE).html("").remove(".opened"),this.$(DETAILS_PANE_OUTER).css("height", "0")) : $(PAGE_CONTAINER).html(this.template);
		$(MAIN).append(Mustache.to_html(this.tabs_template, {paid: CLASS_ACTIVE}));
    a = this;
   	this.questions.length ? this.loadMain(): this.questions.fetch({
			success: function(data){
				a.loadMain()
			}
	 	});
	 return this
  },

  loadMain: function(){
		App.Widgets.Paid = new App.Views.Questions({
        collection: this.questions
    });
    this.$(MAIN).append(App.Widgets.Paid.render().el)
	}
});
