(function() {
  // START:MAIN
  var CHUNK_INTERVAL = 25; // ms.
  var running = false, progress = 0, processTimer;

  function runChunk() {
    window.clearTimeout(processTimer);
    processTimer = null;
    if (!running) return;
    // Some work chunk.  Let's simulate it:
    for (var i = 0; i < 10000; i += (Math.random() * 5).round())
      ;
    ++progress;
    updateUI(); // See source archive -- just updates a progressbar
    if (progress < 100) {
      processTimer = window.setTimeout(runChunk, CHUNK_INTERVAL);
    } else {
      progress = 0, running = false;
    }
  }
  
  function toggleProcessing() {
    running = !running;
    if (running) {
      processTimer = window.setTimeout(runChunk, CHUNK_INTERVAL);
    }
  }
  // END:MAIN
  
  var progressbar, visual, figure;
  
  function updateUI() {
    visual.setStyle('width: ' + progress + '%;');
    progressbar[progress < 50 ? 'removeClassName' : 'addClassName']('over50');
    figure.update(progress + '%');
  }
  
  document.observe('dom:loaded', function() {
    $('btnToggle').observe('click', toggleProcessing);
    $('btnOtherTask').observe('click', function() {
      $$('h1').first().insert(', yeah');
    });
    progressbar = $('progress');
    visual = progressbar.down('.visual');
    figure = progressbar.down('.figure');
  });
})();