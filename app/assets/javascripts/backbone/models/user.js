App.Models.User = Backbone.Model.extend({
  initialize: function(id) {
    this.url = mURL("/users/" + id)
    this.set({
      current_user: this.get("id") === lxhd.currentUserId
    });      
  }
});
