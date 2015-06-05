//= require jquery
//= require jquery.easing
//= require bootstrap
//= require_tree .

$(function() {
  var pageId = document.body.className.split(' ')[0];
  var navItem = $("nav li#" + pageId)[0];
  navItem.className = "active";
});
