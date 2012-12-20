
YUI().use("node","jsonp", function (Y) {
    function injectData(response) {
        var ref = Y.one('#sysInfo tbody tr:last-child'),row = Y.Node.create('<tr>')
        ref.all('td').each(function(cell) {
            var newNode = cell.cloneNode(true);
            newNode.setHTML(response[cell.get("className")]);
                row.appendChild(newNode)
        });
        ref.insert(row,"after");
    }
    function loadJSONP(e){
        e.preventDefault();
        this.blur();
        Y.jsonp(Y.one("#triggerJSONP").get("href")+ "?callback={callback}",injectData);
        //json_response.php?callback=YUI.Env.JSONP.yui_3_8_0_1_1355986310758_31
        //YUI3 自动+‘随机数’
    }

    Y.on("domready", function () {
        Y.on("click", loadJSONP, "#triggerJSONP");
    })
})