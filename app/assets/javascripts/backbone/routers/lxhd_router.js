App.Routers.lxhd = Backbone.Router.extend({
	initialize: function(){},
	    
  routes: {
		"": "free",
    "!/questions/paid": "paid",
    "!/questions/free": "free",
  },

  paid: function(){
    if(lxhd.loggedIn){
			App.Pages.route = PAID;
      App.Pages.Paid = new App.Views.Paid;
      oBody.append(App.Pages.Paid.render().el);
      document.title = "paid questions";
      oNavTabs.removeClass(CLASS_ACTIVE);
      oNavQestion.addClass(CLASS_ACTIVE);
		} else {
			location.hash = "#!/accounts/login";
		}
      
	},
	
  free: function(){
	  App.Pages.route = FREE;
    App.Pages.Free = new App.Views.Free;
    oBody.append(App.Pages.Free.render().el);
    document.title = "paid questions";
    oNavTabs.removeClass(CLASS_ACTIVE);
    oNavInbox.addClass(CLASS_ACTIVE);
	}
});
