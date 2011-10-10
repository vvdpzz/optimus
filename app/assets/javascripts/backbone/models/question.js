App.Models.Question = Backbone.Model.extend({
  initialize: function(model, options){
		var e = this.get("created_at");
		e = e.substring(0,e.length-1).replace("T", " ");
		this.set({
        timestamp: function () {
            return getTimestamp(e)
        }
    });
	}
});
