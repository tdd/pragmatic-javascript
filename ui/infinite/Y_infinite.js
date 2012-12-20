YUI().use("node","io-base",function(Y){
    // START:lowEnough
    var lowEnough = function() {
        var doc = Y.one(document);
        return function(){
        // Trigger for scrolls within 20 pixels from page bottom
            return doc.get("docHeight") - doc.get("winHeight") - doc.get("docScrollY") < 20
        }
    }();
    var spinner = Y.one("#spinner"),posts = Y.one("#posts");
    // START:loop
    function checkScroll(){
        if (!lowEnough()) return pollScroll();
        Y.io("more.php",{
            on:{
                start:function(){spinner.show();},
                complete:function(){spinner.hide()},
                success:function(id,res){
                    posts.insert(res.responseText);
                    pollScroll()
                }
            }
        })
    }
    function pollScroll() { Y.later(100,null,checkScroll); }
    pollScroll();
})