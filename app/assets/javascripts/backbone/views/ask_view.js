App.Views.Ask = Backbone.View.extend({
	id: "question_tab",
	template: JST["backbone/templates/ask"].call(this),
	events: {
		"click #question_submit" : "create_question",
		"click .close" : "close"
	},
	
	initialize: function(){
		_.bindAll(this, "render", "open", "close");
		$("body").append(this.render().el)
	},
	render: function(){
		$(this.el).html(this.template);
		var isMove=false;
		var _x,_y;
		this.$("#question_tabHeader").click(function(){}).mousedown(function(e){
			isMove=true;
			_x=e.pageX-parseInt($("#question_tab").css("left"));
			_y=e.pageY-parseInt($("#question_tab").css("top"));
		});
		$(document).mousemove(function(e){
			if(isMove){
				var x=e.pageX-_x;
				var y=e.pageY-_y;
				$("#question_tab").css({top:y,left:x});
			}
		}).mouseup(function(){
			isMove=false;
		});
		return this
	},
	create_question: function(){
		var title=this.$("#question_info").val(),
				content=this.$("#question_info").val(),
				money=this.$("#question_money").val(),
				credit=this.$("#question_credit").val(),
				c = this;
		$.ajax({
			url: mURL("/questions"),
			type: 'POST',
			dataType: 'json',
			data: {
				"title":title,
				"content":content,
				"credit":credit,
				"money":money,
				"auth_token":TK
			},
			success: function(a) {
				c.close();
		  },
			error: function(a){
				alert("faild:"+a)
			}	
		});
	},
	open: function(){
		$(this.el).css({  
		  "top": (document.documentElement.clientHeight-$(this.el).height())/2+$(document).scrollTop(),   
		  "left": (document.documentElement.clientWidth-$(this.el).width())/2
		}).fadeIn()
	},
	close: function(){
		$(this.el).fadeOut()
	}
});