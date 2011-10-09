App.Collections.Questions = Backbone.Collection.extend({
  model: App.Models.Question,
  initialize: function(models, options){
    this.url = "/questions/" + options.type
  }
});

