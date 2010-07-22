// Note: the each+function approach below is due to
// +invoke('writeAttribute', 'checked', this.checked)+
// not working well with manually-(un)checked boxes on
// Safari.

(function() {
  // START:main
  function toggleAllCheckboxes() {
    var scope = this.up('table').down('tbody'), boxes = scope &&
      scope.select('tr input[type="checkbox"]:first-of-type');
    var refChecked = this.checked;
    (boxes || []).each(function(box) { box.checked = refChecked; });
  }
  
  document.observe('dom:loaded', function() {
    $('toggler').observe('click', toggleAllCheckboxes);
  });
  // END:main
})();