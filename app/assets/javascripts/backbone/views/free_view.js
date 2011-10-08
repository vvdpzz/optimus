App.Views.Free = Backbone.View.extend({
  el: "#doc",
  template: JST["backbone/templates/page-container"].call(this),
  tabs_template: JST["backbone/templates/question-tabs"].call(this),
  
  initialize: function(){
    _.bindAll(this, "render", "loadMain");
    this.questions = App.Cache.get("quesions/free") || App.Cache.set("quesions/free", new App.Collections.Questions([],{
        type: "free"
    }))
	},
    
  render: function(){
    $(this.el).attr("class", "route-"+App.Pages.route+" container");
		$(MAIN).addClass("span13");
    $(PAGE_CONTAINER).attr("class", App.Pages.route+"-container").siblings().not(".index-container").remove();
    $(PAGE_CONTAINER).find(MAIN).length ? (this.$(MAIN).html(""),this.$(DASHBOARD).html(""), this.$(DETAILS_PANE).html("").remove(".opened"),this.$(DETAILS_PANE_OUTER).css("height", "0")) : $(PAGE_CONTAINER).html(this.template);
    $(MAIN).append(Mustache.to_html(this.tabs_template, {free: CLASS_ACTIVE}));
    a = this;
   	this.questions.length ? this.loadMain(): this.questions.fetch({
			success: function(data){
				a.loadMain()
			}
	 	});
	 return this
  },

  loadMain: function(){
		App.Widgets.Free = new App.Views.Questions({
        collection: this.questions
    });
    this.$(MAIN).append(App.Widgets.Free.render().el)
	}
});
