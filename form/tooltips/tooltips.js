(function() {
  // START:main
  document.observe('dom:loaded', function() {
    var attr = Prototype.Browser.IE ? 'htmlFor' : 'for';
    function showTooltip() {
      var tooltip = $$('label[' + attr + '="' + this.id + '"] .tooltip').first();
      tooltip && tooltip.show();
    }
    function hideTooltip() {
      var tooltip = $$('label[' + attr + '="' + this.id + '"] .tooltip').first();
      tooltip && tooltip.hide();
    }
    
    $('registration').getInputs().invoke('observe', 'focus', showTooltip).
      invoke('observe', 'blur', hideTooltip);
  });
  // END:main
})();