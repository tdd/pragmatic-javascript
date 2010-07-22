(function() {
  // START:preload
  function preloadImages() {
    $$('img[rel="preloadZoom"]').each(function(img) {
      var pimg = new Image();
      pimg.src = img.src.replace(/(\.\w+$)/, '_closeup$1');
    });
  }
  
  document.observe('dom:loaded', preloadImages);
  // END:preload

  // START:rollover
  function togglePreloaded(e) {
    var trigger = e.findElement('img[rel="preloadZoom"]');
    if (!trigger) return;
    if (e.type == 'mouseover') {
      trigger.src = trigger.src.replace(/(\.\w+$)/, '_closeup$1');
    } else {
      trigger.src = trigger.src.replace('_closeup', '');
    }
  }
  
  document.observe('mouseover', togglePreloaded).
    observe('mouseout', togglePreloaded);
  // END:rollover
})();