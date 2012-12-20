YUI().use("node",function(Y){
    function toggleAllCheckboxes(){
        var scope = this.ancestor("table").one("tbody"),
            boxes = scope && scope.all('tr input[type="checkbox"]:first-of-type');
        var refChecked = this.get("checked");
        (boxes || Y).each(function(box){
            box.set("checked",refChecked)
        })
    }

    Y.on("domready",function(){
        Y.on("click",toggleAllCheckboxes,"#toggler")
    })
})