(function() {
  // START:main
  function loadKnownComments(e) {
    e.stop();
    var zone = $('extraComments'), ref = zone.next('h3');
    var upd = new Ajax.Request('known_comments.html', {
      method: 'get',
      onSuccess: function(res) {
        var orig = ref.cumulativeOffset().top -
          document.viewport.getScrollOffsets().top;
        zone.insert({ before: res.responseText });
        window.scrollTo(0, ref.cumulativeOffset().top - orig);
      }
    });
  }
  // END:main
  
  document.observe('dom:loaded', function() {
    var loader = $('loadKnownComments');
    loader && loader.observe('click', loadKnownComments);
  });
})();