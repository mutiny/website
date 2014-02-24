//= require_tree .
//= require jquery-2.0.3.min
//= require bootstrap

$(function() {
  var pageId = document.body.className;
  var navItem = $("#navigation li#" + pageId)[0];
  navItem.className = "active";
});