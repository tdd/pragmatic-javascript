(function() {
  function loadUsingDF1(e) {
    e.stop(); this.blur();
    // START:df1
    var warp = new Element('iframe', { name: '__blackhole' });
    warp.setStyle('width: 0; height: 0; border: 0');
    document.body.appendChild(warp);
    warp.observe('load', function() { $('responses').insert('<p>OK, posted.</p>'); });
    var form = new Element('form', { method: 'post', action: this.href,
      target: '__blackhole' });
    form.submit();
    // END:df1
  }
  
  function loadUsingDF2(e) {
    e.stop(); this.blur();
    // START:df2
    var form = new Element('form', { method: 'post', action: this.href });
    form.submit();
    Element.insert.defer('responses', '<p>OK, posted.</p>');
    // END:df2
  }
  
  function loadUsingSSP(e) {
    e.stop(); this.blur();
    // START:ssp
    new Ajax.Updater({ success: 'responses' }, 'ssp.php', {
      method: 'get', parameters: { uri: this.href }, insertion: 'bottom'
    });
    // END:ssp
  }
  
  function loadUsingXHR(e) {
    e.stop(); this.blur();
    // START:cors
    new Ajax.Updater({ success: 'responses' }, this.href, {
      method: 'get', insertion: 'bottom'
    });
    // END:cors
  }
  
  document.observe('dom:loaded', function() {
    $('triggerXHR').observe('click', loadUsingXHR);
    $('triggerSSP').observe('click', loadUsingSSP);
    $('triggerDF1').observe('click', loadUsingDF1);
    $('triggerDF2').observe('click', loadUsingDF2);
  });
})();