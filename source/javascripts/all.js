//= require jquery
//= require jquery.easing
//= require bootstrap
//= require bigfoot
//= require_tree .

$(function() {
  var pageId = document.body.className.split(' ')[0];
  var navItem = $("nav li#" + pageId)[0];
  navItem.className = "active";
});

$.bigfoot({
  actionOriginalFN: "ignore",
  buttonMarkup: (
                    "<div class='bigfoot-footnote__container'>" +
                    "<button " +
                      "class=\"bigfoot-footnote__button\" " +
                      "id=\"{{SUP:data-footnote-backlink-ref}}\" " +
                      "data-footnote-number=\"{{FOOTNOTENUM}}\" " +
                      "data-footnote-identifier=\"{{FOOTNOTEID}}\" " +
                      "alt=\"See Footnote {{FOOTNOTENUM}}\" " +
                      "rel=\"footnote\" " +
                      "data-bigfoot-footnote=\"{{FOOTNOTECONTENT}}\">" +
                    "{{FOOTNOTENUM}}" +
                    "</button>" +
                    "</div>"
                )
});


  // broken is first
  //  <button class="bigfoot-footnote__button" rel="footnote" id="fnref:1" data-footnote-number="1" data-footnote-identifier="1" alt="See Footnote 1" data-footnote-content="&lt;p&gt;Actually, &lt;em&gt;code coverage&lt;/em&gt; is a whole bunch of metrics. Here, I'm really talking about &lt;em&gt;statement coverage&lt;/em&gt; as that seems to be the most widely known code coverage metric. Other examples of &lt;em&gt;code coverage&lt;/em&gt; metrics include branch, path and MC/DC coverage.&lt;/p&gt;">    <svg class="bigfoot-footnote__button__circle" viewBox="0 0 6 6" preserveAspectRatio="xMinYMin"><circle r="3" cx="3" cy="3" fill="white"></circle></svg>    <svg class="bigfoot-footnote__button__circle" viewBox="0 0 6 6" preserveAspectRatio="xMinYMin"><circle r="3" cx="3" cy="3" fill="white"></circle></svg>    <svg class="bigfoot-footnote__button__circle" viewBox="0 0 6 6" preserveAspectRatio="xMinYMin"><circle r="3" cx="3" cy="3" fill="white"></circle></svg>     </button>
  //  <button class="bigfoot-footnote__button" id="fnref:1" data-footnote-number="1" data-footnote-identifier="1" alt="See Footnote 1" rel="footnote" data-bigfoot-footnote="&lt;p&gt;Actually, &lt;em&gt;code coverage&lt;/em&gt; is a whole bunch of metrics. Here, I'm really talking about &lt;em&gt;statement coverage&lt;/em&gt; as that seems to be the most widely known code coverage metric. Other examples of &lt;em&gt;code coverage&lt;/em&gt; metrics include branch, path and MC/DC coverage.&lt;/p&gt;">    <svg class="bigfoot-footnote__button__circle" viewBox="0 0 6 6" preserveAspectRatio="xMinYMin"><circle r="3" cx="3" cy="3" fill="white"></circle></svg>    <svg class="bigfoot-footnote__button__circle" viewBox="0 0 6 6" preserveAspectRatio="xMinYMin"><circle r="3" cx="3" cy="3" fill="white"></circle></svg> <svg class="bigfoot-footnote__button__circle" viewBox="0 0 6 6" preserveAspectRatio="xMinYMin"><circle r="3" cx="3" cy="3" fill="white"></circle></svg> </button>
