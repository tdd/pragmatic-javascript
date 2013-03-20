YUI().use("node",function(Y){
    Y.on("domready",function(){
        var items = Y.one("#items");
        items.delegate("click",function(e){
            var trigger = e.currentTarget;
            e.preventDefault();
            var content = trigger.ancestor("p").next("div");
            if (!content) return;
            content.toggleView();
            trigger.set("text",content.getComputedStyle("display") === "none" ? "open" : "close");
            trigger.blur();
        },"a")
        items.all("li").each(function(item){
            item.prepend('<p><a class="toggler" href="#">Open</a></p>').all("div").hide()
        })
    })
})