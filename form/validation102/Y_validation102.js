YUI().use("node",function(Y){
    // START:checkField
    var FIELD_PATTERNS = {
        integer: /^\d+$/,
        number: /^\d+(?:\.\d+)?$/,
        email: /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i
    };

    function checkField(field) {
        var value = Y.Lang.trim(field.get("value"));
        for (var pattern in FIELD_PATTERNS) {
            if (!field.hasClass(pattern)) continue;
            if (!FIELD_PATTERNS[pattern].test(value)) return false;
        }
        return true;
    }
    // END:checkField
    function checkForm(e) {
        var firstOffender, value;
        Y.all(this._node.elements).each(function(field){
            var line = field.ancestor("p"),
                value = field.get("value");
            if (!(value == false) && field.get("type") !== "checkbox") {
                line.removeClass("missing");
                if (checkField(field)) {
                    line.removeClass('invalid');
                } else {
                    firstOffender = firstOffender || field;
                    line.addClass('invalid');
                }
            }else if(field.hasClass('required') && field.get("checked") === false){
                firstOffender = firstOffender || field;
                line.removeClass('invalid').addClass('missing');
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