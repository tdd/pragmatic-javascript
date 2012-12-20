(function() {
  // START:basic
  /*function preventMultipleSubmits() {
    this.select('.submit').invoke('disable');
  }*/
  
  document.observe('dom:loaded', function() {
    $('commentForm').observe('submit', preventMultipleSubmits);
  });
  // END:basic
  
  // START:custom
  function preventMultipleSubmits(e) {
    if (!this.hasClassName('submitting')) {
      e.stop();
    }
    this.addClassName('submitting').select('.submit').invoke('disable');
    var that = this;
    (function() { that.submit(); }).delay(0.1);
  }
  // END:custom
})();