(function() {
  // START:main
  function checkForm(e) {
    var firstOffender, value;
    this.select('.required').each(function(field) {
      value = field.getValue();
      if (value && !value.blank()) {
        field.up('p').removeClassName('missing');
      } else {
        firstOffender = firstOffender || field;
        field.up('p').addClassName('missing');
      }
    });
    if (firstOffender) { e.stop(); firstOffender.focus(); }
  }
  
  document.observe('dom:loaded', function() {
    $('registration').observe('submit', checkForm);
  });
  // END:main
})();