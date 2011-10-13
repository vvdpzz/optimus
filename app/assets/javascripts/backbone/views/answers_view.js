App.Views.Answers = Backbone.View.extend({
	className: "answer-manager",
	template: JST["backbone/templates/answer-manager"].call(this),
	item_template: JST["backbone/templates/answer-item"].call(this),

	events: {
		"click #answer_question": "create_answer"
	},

	initialize: function(){
		_.bindAll(this, "render", "addOne", "addAll");
		this.collection.bind("add", this.addOne);
		this.collection.bind("remove", this.addAll);
		this.collection.bind("reset", this.addAll);
	},

	render: function(){
		$(this.el).html(this.template);
		this.textarea = this.$('#content_editor');
		var editor = WysiHat.Editor.attach(this.$('#content'));
		var toolbar = new WysiHat.Toolbar(editor);
		toolbar.initialize(editor);
		toolbar.addButton({
			name: 'btn info bold', 
			label: "B",
			handler:function(editor){editor.boldSelection();},
			query:function(editor){return editor.boldSelected();}
		});
		toolbar.addButton({
			name: 'btn info em',
			label: "I",
			handler: function(editor) { editor.italicSelection(); },
			query: function(editor) { return editor.italicSelected(); }
		});
		toolbar.addButton({ 
			name:"btn info underline",
			label: "U" ,
			handler:function(editor){editor.underlineSelection();},
			query:function(editor){return editor.underlineSelected();}
		});
		toolbar.addButton({
			name:"btn info Strikethrough",
			label:"S",
			handler:function(editor){editor.strikethroughSelection();},
		});
		toolbar.addButton({
			name:"btn info ol",label: "OL",
			handler: function(editor) { return editor.toggleOrderedList(); }
		});
		toolbar.addButton({
			name:"btn info ",
			label: "UL",
			handler: function(editor) { return editor.toggleUnorderedList(); }
		});
		toolbar.addButton({
			name:"btn info",
			label: "@",
			handler: function(editor) { return 0 }
		});
		this.addAll();

		return this
	},

	addOne: function (a) {
		this.$(".answers-items").append((new App.Views.AnswerItem({ model: a })).render().el);
	},

	addAll: function () {
		if (this.collection.length) this.collection.each(this.addOne)
	},

	create_answer: function () {
		var answer_content = $("#content_editor").html();
		var question_id = $(".pane-components > .question-item").attr("data-item-id");
		var b = this;
		$.ajax({
		  url: mURL('/answers'),
		  type: 'POST',
		  dataType: 'json',
		  data: {'question_id': question_id, 'content': answer_content, 'auth_token': TK},
		  success: function(a) {
        b.collection.add(a);
        $('#content_editor').html("");
        b.collection.fetch()
		  },
		  error: function(xhr, textStatus, errorThrown) {
			alert(this.url);
		    alert("errorThrown"+errorThrown+"\ntextStatus"+textStatus);
		  }
		});
		

	}
});