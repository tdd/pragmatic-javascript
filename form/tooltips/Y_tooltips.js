YUI().use("node", function (Y) {
    function showTooltip(){
        var tooltip = this.previous("label").one(".tooltip");
        tooltip && tooltip.show();
    }
    function hideTooltip(){
        var tooltip = this.previous("label").one(".tooltip");
        tooltip && tooltip.hide();
    }
    Y.on("domready", function () {
        Y.one("#registration").all("input:not([type=submit])").each(function(input){
            input.on("focus",showTooltip);
            input.on("blur",hideTooltip);
        })
    })
})