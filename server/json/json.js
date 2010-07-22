(function() {
  function loadJSON(e) {
    e.stop(); this.blur();
    // START:json
    new Ajax.Request(this.href, { method: 'get', onSuccess: function(res) {
      var scope = $('sysInfo').down('tbody tr'), data = res.responseJSON, cell;
      for (var key in data) {
        if (cell = scope.down('.' + key)) { // Intentional assign
          cell.update(data[key]);
        }
      }
      scope.highlight({ duration: 0.5 });
    }});
    // END:json
  }

  document.observe('dom:loaded', function() {
    $('triggerJSON').observe('click', loadJSON);
  });
})();