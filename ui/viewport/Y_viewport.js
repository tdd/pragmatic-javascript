YUI().use("node","io-base",function(Y){
    function loadKnownComments(e) {
        e.preventDefault();
        var zone = Y.one("#extraComments"),ref = zone.next("h3");
        Y.io('known_comments.html',{
            on:{
                success:function(id,res){
                    var orig = ref.get("region").top - Y.one(document).get("docScrollY");
                    zone.prepend(res.responseText);
                    window.scrollTo(0,ref.get("region").top - orig)
                }
            }
        })
    }
    Y.on("domready",function(){
        Y.on("click",loadKnownComments,"#loadKnownComments")
    })
})