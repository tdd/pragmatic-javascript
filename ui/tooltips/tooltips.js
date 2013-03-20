(function() {
  // START:MAIN
  function toggle(reveal, e) {
    var trigger = e.findElement('li'), tooltip = trigger && trigger.down('.tooltip');
    if (!tooltip) return;
    tooltip[reveal ? 'show' : 'hide']();
  }
  
  document.observe('dom:loaded', function() {
    var isIE6 = Prototype.Browser.IE && undefined === document.body.style.maxHeight;
    if (!isIE6) return;
    var files = $('files'), tooltips = files && files.select('.tooltip');
    if (!files || 0 == tooltips.length) return;
    tooltips.invoke('hide');
    files.observe('mouseover', toggle.curry(true)).
      observe('mouseout', toggle.curry(false));
  });
  // END:MAIN
})();
