YUI().use("node",function(Y){
    function checkForm(e) {
        var firstOffender, value;
        this.all(".required").each(function(field){
            value = field.get("value");
            if (!(value == false)) {
                field.ancestor("p").removeClass("missing");
            }else {
                firstOffender = firstOffender || field;
                field.ancestor("p").addClass("missing")
            }
        });
        if (firstOffender) {
            e.preventDefault();
            firstOffender.focus();
        }
    }
    Y.on("domready",function(){
        Y.on("submit",checkForm,"#registration");
    })
})