YUI().use("node",function(Y){
    var POPUP_FEATURES = 'status=yes,resizable=yes,scrollbars=yes,' +
        'width=800,height=500,left=100,top=100';
    function hookPopupLink(e){
        var trigger = e.target;
        e.preventDefault();
        trigger.blur();
        var wndName = trigger.get("target");
        window.open(trigger._node.href,wndName,POPUP_FEATURES).focus()
    }

    Y.on("domready",function(){
        Y.on("click",hookPopupLink,".popup")
    })
})