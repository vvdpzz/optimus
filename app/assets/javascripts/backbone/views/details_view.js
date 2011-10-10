App.Views.Details = Backbone.View.extend({
	el: ".details-pane",
 	template: JST["backbone/templates/details-pane"].call(this),
 	events: {
       "click .close": "close"
  },
  initialize: function () {
      _.bindAll(this, "render", "open", "close", "loadQuestionDetail")
  },
  render: function () {
      $(this.el).html(this.template);
      return this
  },
	loadQuestionDetail: function () {
		
	},
  open: function () {
      $(".main-content .opened");
      $(this.el).css("height", $(window).height() - 66 + "px").show().animate({
          left: "830px"
      }, 200).addClass("opened");
      this.$(".pane-components").css({
          height: $(window).height() - 102 + "px"
      });
      $(this.el).parents("#details-pane-outer").css("height", $(window).height() - 66 + "px")
  },
  close: function (a) {
      a && a.preventDefault();
      $(".main-content .opened").removeClass("opened");
      $(this.el).animate({
          left: "0"
      }, 200, function () {
          $(this).css("height", 0)
      });
      $(this.el).parent().css("height", "0px");
      $(this.el).parents("#details-pane-outer").css("height", "0px")
  }
});