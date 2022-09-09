// listen for click events originating from elements with href starting with #
$('body').on('click.scroll-adjust', '[href^="#"]', function (e) {
  var $nav

  // make sure navigation hasn't already been prevented
  if ( e && e.isDefaultPrevented() ) return

  // get a reference to the offending navbar
  $nav = $('div.navbar')

  // check if the navbar is fixed
  if ( $nav.css('position') !== "fixed" ) return

  // listen for when the browser performs the scroll
  $(window).one('scroll', function () {
    // scroll the window up by the height of the navbar
    window.scrollBy(0, -$nav.height())
  });

});
