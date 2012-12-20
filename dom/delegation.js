document.observe('dom:loaded', function() {
  // START:MAIN
  $('items').observe('click', function(e) { // <label id="code.eventDelegation.observe" />
    var trigger = e.findElement('a.toggler'); // <label id="code.eventDelegation.findElement" />
    if (!trigger) return;
    e.stop();
    var content = trigger.up('p').next('div');
    if (!content) return;
    content.toggle();
    trigger.update(content.visible() ? 'Close' : 'Open');
    trigger.blur();
  });

  $('items').select('li').each(function(item) {
    item.insert({ top: '<p><a class="toggler" href="#">Open</a></p>' });
    item.down('div').hide();
  });
  // END:MAIN
});