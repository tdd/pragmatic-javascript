YUI().use("node",function(Y){
    var maxLengths = {};

    function bindMaxLengthFeedbacks(){
        var mlClass, maxLength, feedback;
        Y.all("*[class^=maxLength]").each(function(field){
            mlClass = field.get("className").match(/\bmaxLength(\d+)\b/)[0];
            maxLength = parseInt(mlClass.replace(/\D+/g, ''), 10);
            feedback = Y.Node.create("<span class='feedback'></span>");
            maxLengths[field.get("id")] = [maxLength, feedback];
            updateFeedback(field);
            field.on(["keyup","keypress"],updateFeedback);
            var region = field.get("region");
            feedback.setStyles({"left":region.left,"top":region.bottom + 2,width:region.width});
            field.ancestor("p").addClass("lengthFeedback").insert(feedback)
        })
    }

    function updateFeedback(e){
        var field = e.currentTarget || e;
        var current = field.get("value").length,
            data = maxLengths[field.get("id")], max = data[0],
            delta = current < max ? max - current : 0;
        data[1].set("text",'Remaining: ' + delta);
        if (current > max) {
            field.set("value",field.get("value").substring(0, max));
        }
    }

    Y.on("domready",bindMaxLengthFeedbacks);
})