/*
YUI().use("imageloader",function(Y){
    Y.on("domready",function(){
        var preloadZoom
        var mouseoverGroup = new Y.ImgLoadGroup();
        mouseoverGroup.addTrigger('img[rel=preloadZoom]', 'mouseover');
        mouseoverGroup.registerImage({domId:"dom1",srcUrl:Y.one("#dom1").get("src").replace(/(\.\w+$)/, '_closeup$1')})
    })

})*/

YUI().use("node","event-hover",function(Y){
    function preloadImages() {
        Y.all('img[rel="preloadZoom"]').each(function(img) {
            var pimg = new Image();
            pimg.src = img.get("src").replace(/(\.\w+$)/, '_closeup$1');
        });
    }

    function togglePreloaded(e) {
        var trigger = e.currentTarget.one('img[rel="preloadZoom"]')._node;
        if (!trigger) return;
        if (e.type == 'mouseover') {
            trigger.src = trigger.src.replace(/(\.\w+$)/, '_closeup$1');
        } else {
            trigger.src = trigger.src.replace('_closeup', '');
        }
    }
    Y.on("domready",function(){
        preloadImages();
        Y.delegate("mouseover",togglePreloaded,"#products","li")
        Y.delegate("mouseout",togglePreloaded,"#products","li")
    })

})
