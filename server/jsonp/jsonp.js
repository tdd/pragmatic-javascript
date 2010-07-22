(function() {
  // START:callback
  function injectData(data) {
    var ref = $('sysInfo').down('tbody tr:last-child'), row = new Element('tr'), key;
    ref.select('td').each(function(cell) {
      row.appendChild($(cell.cloneNode(true)).update(data[cell.className]));
    });
    ref.insert({ after: row });
  }
  // END:callback
  window.injectData = injectData;
  
  function loadJSONPBasic(e) {
    e.stop(); this.blur();
    // START:jsonp1
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: this.href + '&r=' + Math.random() }));
    // END:jsonp1
  }
  
  function loadJSONP(e) {
    e.stop(); this.blur();
    // START:jsonp2
    var script = new Element('script', { type: 'text/javascript',
      src: this.href });
    script.src += ('&r=' + script.identify());
    script.observe('load', Element.remove.curry(script));
    document.documentElement.firstChild.appendChild(script);
    // END:jsonp2
  }
  
  document.observe('dom:loaded', function() {
    $('triggerJSONP').observe('click', loadJSONP);
  });
})();