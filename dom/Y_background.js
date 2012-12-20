YUI().use("node",function(Y){
    // START:MAIN
    var CHUNK_INTERVAL = 25; // ms.
    var running = false, progress = 0, processTimer;

    function runChunk() {
        window.clearTimeout(processTimer);
        processTimer = null;
        if (!running) return;
        //Some work chunk.  Let's simulate it:
     /*   for (var index = 0; index < 10000; index += (Math.random() * 5).round())
            ;*/
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
        visual.setStyle('width',progress + '%');
        progressbar[progress < 50 ? 'removeClass' : 'addClass']('over50');
        figure.set("text",progress + '%');
    }

    Y.on("domready",function(){
        Y.one("#btnToggle").on("click",toggleProcessing);
        Y.one("#btnOtherTask").on("click",function(){
            Y.one("h1").insert(', yeah')
        });
        progressbar = Y.one('#progress');
        visual = progressbar.one('.visual');
        figure = progressbar.one('.figure');
    })
})