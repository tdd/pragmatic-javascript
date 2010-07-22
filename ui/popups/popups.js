(function() {
  // START:main
  var POPUP_FEATURES = 'status=yes,resizable=yes,scrollbars=yes,' + 
    'width=800,height=500,left=100,top=100';
  
  function hookPopupLink(e) {
    var trigger = e.findElement('a.popup');
    if (!trigger) return;
    e.stop(); trigger.blur();
    var wndName = trigger.readAttribute('target') || ('wnd' + trigger.identify());
    window.open(trigger.href, wndName, POPUP_FEATURES).focus();
  }
  
  document.observe('click', hookPopupLink);
  // END:main
})();