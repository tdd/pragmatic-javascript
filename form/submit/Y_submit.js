YUI().use("node",function(Y){
    Y.on("domready",function(){
        Y.on("submit",preventMultipleSubmits,"#commentForm")
    });
    function preventMultipleSubmits(e){
        if (!this.hasClass("submitting")) {
            e.preventDefault();
        }
        this.addClass("submitting").one(".submit").set("disable",true);
        Y.later(100,this,function(){this.submit()})
    }
})