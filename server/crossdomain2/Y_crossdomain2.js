YUI().use("node","jsonp","yql","escape","querystring",function (Y) {

    function loadUsingJSONP(e){
        e.preventDefault();
        this.blur();
        function jsonpCallback(data) {
            Y.one("#responses").setHTML(Y.Escape.html(data.payload));
        };
        Y.jsonp(this.get("href") + "?callback={callback}",jsonpCallback)

    }

    function loadUsingYQLpost(e){
        e.preventDefault();
        this.blur();
        var post = Y.QueryString.stringify({foo:'foo',bar:'bar'}),xpath = "//p";
        Y.YQL('select * from htmlpost where url="' + this.get('href') + '" and postdata="' + post + '"' +
            ' and xpath="' + xpath + '"',function(data){
            Y.one("#responses").setHTML(data.query.results.postresult.p.join("<br/>"))
        })
    }
    function loadUsingCHR(e){
        e.preventDefault();
        this.blur();
        CSSHttpRequest.get(this.get("href"), function(res) {
            Y.one('#responses').insert('<p>' + Y.Escape.html(res) + '</p>');
        });
    }
    Y.on("domready", function () {
        Y.one('#triggerJSONP').on('click', loadUsingJSONP);
        Y.one('#triggerYQLpost').on('click', loadUsingYQLpost);
        Y.one('#triggerCHR').on('click', loadUsingCHR);
    })
})