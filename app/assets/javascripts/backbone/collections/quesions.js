App.Collections.Questions = Backbone.Collection.extend({
  model: App.Models.Question,
  initialize: function(b, options){
    this.url = "/questions/" + options.type
  }
});

