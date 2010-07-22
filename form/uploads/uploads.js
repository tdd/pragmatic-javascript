(function() { 
  // START:accessory
  var ICONS = $H({ word: $w('doc docx dot dotx'), image: $w('jpg jpeg gif png') });
  
  function getFileClass(fileName) {
    var ext = (fileName.match(/\.(.+?)$/) || [])[1].toString().toLowerCase();
    return (ICONS.detect(function(pair) { return pair[1].include(ext); }) || [])[0];
  }
  
  function handleQueueRemoval(e) {
    var trigger = e.findElement('button');
    trigger && trigger.up('li').remove();
  }
  // END:accessory
  
  // START:main
  function queueFile() {
    var fileName = $F(this), clone = this.cloneNode(true);
    var item = new Element('li', { 'class': getFileClass(fileName) });
    $(clone).observe('change', queueFile).setValue('');
    this.parentNode.appendChild(clone);
    item.appendChild(this);
    item.appendChild(document.createTextNode(fileName));
    item.insert('<button><img src="remove.png" alt="Remove" /></button>');
    $('uploads').appendChild(item);
  }
  
  document.observe('dom:loaded', function() {
    $('filSelector').observe('change', queueFile);
    $('uploads').observe('click', handleQueueRemoval);
  });
  // END:main
})();