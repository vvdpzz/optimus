#= require_self
#= require_tree ./templates
#= require_tree ./models
#= require_tree ./collections
#= require_tree ./views
#= require_tree ./routers

var App = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  Pages: {},
	Widgets: {},
  Cache: new CacheProvider(),
  initialize: function () {
    new App.Routers.lxhd;
    Backbone.history.start();
  }
},
  FREE = "free",
  PAID = "paid",
  WATCH = "watch",
  CLASS_ACTIVE = "active",
  PAGE_OUTER = "#page-outer",
  FREE_QUESTION = "freeQuestion",
  PAID_QUESTION = "paidQuestion",
  WATCH_QUESTION = "watchQuestion",
  MAIN = "#main-content",
  DASHBOARD = "#dashboard",
  DETAILS_PANE_OUTER = "#details-pane-outer",
  DETAILS_PANE = ".details-pane",
  PANE_COMPONENTS = ".pane-components",
  PAGE_CONTAINER = "#page-container",
  
  BASE_URL = "http://mayday.fm:3000";
  
oBody = $("body");
oDoc = $("#doc");
lxhd = {};

function mURL(a) {
  return BASE_URL + a + ".json"
}

function getCurrentTime() {
    var a = new Date,
        b = a.getTime();
    a = a.getTimezoneOffset() * 6E4;
    var c = new Date(b + a + 288E5);
    b = c.getFullYear();
    a = c.getMonth() + 1;
    var d = c.getDate(),
        e = c.getHours(),
        f = c.getMinutes();
    c = c.getSeconds();
    return b + "-" + a + "-" + d + " " + e + ":" + f + ":" + c
}

function getDays(a) {
    var b = getCurrentTime();
    a = a.split(" ");
    b = b.split(" ");
    var c = a[0].split("-"),
        d = b[0].split("-");
    a = c[1] + "/" + c[2] + "/" + c[0] + " " + a[1];
    b = d[1] + "/" + d[2] + "/" + d[0] + " " + b[1];
    a = Date.parse(b) - Date.parse(a);
    return days = parseInt(Math.abs(a) / 1E3 / 60 / 60 / 24)
}

function getTimestamp(a) {
    var b = getCurrentTime(),
        c = a.split(" "),
        d = b.split(" ");
    b = c[0].split("-");
    var e = d[0].split("-"),
        f;
    c = b[1] + "/" + b[2] + "/" + b[0] + " " + c[1];
    d = e[1] + "/" + e[2] + "/" + e[0] + " " + d[1];
    f = Date.parse(d) - Date.parse(c);
    d = Math.ceil(f / 3E3);
    c = Math.floor(f / 6E4);
    f = Math.floor(f / 36E5);
    if (d < 0) return "0\u79d2\u524d"; 
    else if (d === 0) return "\u521a\u521a"; 
    else if (d < 60) return d + "\u79d2\u524d"; 
    else if (c < 60) return c + "\u5206\u949f\u524d"; 
    else if (f < 24) return f + "\u5c0f\u65f6\u524d";
    else if (b[0] === e[0]) return c = a.split(" ")[1], b[1].replace(/0*/, "") + "\u6708" + b[2].replace(/^0*/, "") + "\u65e5 " + c.substring(0, c.lastIndexOf(":"));
    return b[0] + "\u5e74" + b[1].replace(/^0*/, "") + "\u6708" + b[2].replace(/^0*/, "") + "\u65e5"
}

