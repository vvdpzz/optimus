﻿(function() {
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read'  : 'GET'
  };
  
  var getUrl = function(object) {
    if (!(object && object.url)) return null;
    var url = _.isFunction(object.url) ? object.url() : object.url;
    return BASE_URL + url + '.json';
  };
  
  var urlError = function() {
    throw new Error("A 'url' property or function must be specified");
  };

  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];
		
    // Default JSON-request options.
    var params = _.extend({
      type:         type,
      dataType:     'json',
			data: {auth_token: TK}
    }, options);

    if (!params.url) {
      params.url = getUrl(model) || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';

      var data = {}

      if (model.paramRoot) {
        data[model.paramRoot] = model.toJSON();
      } else {
        data = model.toJSON();
      }
      
      params.data = JSON.stringify(data)
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET') {
      params.processData = false;
    }
    // Make the request.
    return $.ajax(params);
  }
  
}).call(this);