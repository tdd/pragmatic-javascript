YUI().use("node","io-base", "json-parse","anim", function (Y) {
    function loadJSON(e) {
        e.preventDefault();
        this.blur();
        Y.io(this.get("href"),{
            on:{
                success:function(id,res){
                    var scope = Y.one("#sysInfo tbody tr"),data = Y.JSON.parse(res.responseText);
                    Y.each(data,function(v,k){
                        scope.one("." + k).setHTML(v)
                    });
                    scope.plug(Y.Plugin.NodeFX,{
                        from:{
                            backgroundColor:"rgb(255,255,154)"
                        },
                        to:{
                            backgroundColor:"rgb(255,255,255)"
                        },
                        duration:.5
                    });
                    scope.fx.run();
                }
            }
        })
    }
    Y.on("domready", function () {
        Y.on("click", loadJSON, "#triggerJSON")
    })
})