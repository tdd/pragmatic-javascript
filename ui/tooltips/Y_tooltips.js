YUI().use("node",function(Y){
    function toggle(e,reveal) {
        var trigger = e.currentTarget, tooltip = trigger && trigger.one('.tooltip');
        if (!tooltip) return;
        tooltip[reveal ? 'show' : 'hide']();
    }
    Y.on("contentready",function(){
        var isIE6 = Y.UA.ie;
        if (!isIE6) return;
        var files = Y.one('#files'), tooltips = files && files.all('.tooltip');
        tooltips.hide();
        Y.delegate("mouseover",toggle,files,"li",null,true);
        Y.delegate("mouseout",toggle,files,"li",null,false);
    },"#files")
})