YUI().use("node","io-xdr", function (Y) {
    function loadUsingDF1(e){
        e.preventDefault();
        this.blur();
        var warp = Y.Node.create("<iframe>");
        warp.set("name","__blackhole").setStyles({
            width:0,height:0,border:0
        });
        Y.one("body").insert(warp);
        warp.on("load",function(){
                responses.insert('<p>OK, posted.</p>')
            });
        var form = Y.Node.create("<form>");
        form.setAttrs({method:"post",action:this.get("href"),target:"__blackhole"}).submit();
    }
    function loadUsingXHR(e){
        e.preventDefault();
        this.blur();
        Y.io(this.get("href"),{
            xdr: {
                use:'native'
            },
            on:{
                success:function(id,o){
                    responses.insert(o.responseText)
                }
            }
        })
    }
    Y.on("domready", function () {
        responses = Y.one("#responses");
        Y.on("click",loadUsingXHR,"#triggerXHR");
        Y.on("click",loadUsingDF1,"#triggerDF1");
    })
})