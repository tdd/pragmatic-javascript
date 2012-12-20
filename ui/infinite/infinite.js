(function() {
  // START:lowEnough
  function lowEnough() {
    var pageHeight = Math.max(document.body.scrollHeight,
      document.body.offsetHeight);
    var viewportHeight = window.innerHeight ||
      document.documentElement.clientHeight || 
      document.body.clientHeight || 0;
    var scrollHeight = window.pageYOffset ||
      document.documentElement.scrollTop || 
      document.body.scrollTop || 0;
    // Trigger for scrolls within 20 pixels from page bottom
    return pageHeight - viewportHeight - scrollHeight < 20;
  }
  // END:lowEnough

  // START:loop
  function checkScroll() {
    if (!lowEnough()) return pollScroll();
    $('spinner').show();
    new Ajax.Updater('posts', 'more.php', {
      method: 'get', insertion: 'bottom',
      onComplete: function() { $('spinner').hide(); },
      onSuccess: pollScroll
    });
  }
  
  function pollScroll() { setTimeout(checkScroll, 100); }
  
  pollScroll();
  // END:loop
})();
