YUI().use("node","get",function (Y) {
    var FLICKR_ENDPOINT = 'http://api.flickr.com/services/feeds/photos_public.gne';
    var FLICKR_USER_ID  = '97027332@N00'; // That’s me!
    var item = '<li><a href="{target}"><img src="{src}" title="#{title}" /></a></li>'
    function jsonFlickrFeed(data){
        var stream = Y.one('#flickrStream'), d, dateStr;
        Y.each(data.items,function(v,k){
            d = v.published.split(/\D/);
            dateStr = d[1] + '/' + d[2] + '/' + d[0];
            stream.insert(Y.Lang.sub(item,{
                src:v.media.m.replace('_m', '_s'), target: v.link,
                title: 'Published on ' + dateStr + ' GMT'
            }))
        });
        Y.one("#indicator").removeClass("loading").setHTML("Loaded!")
    }

    window.jsonFlickrFeed = jsonFlickrFeed;

    function loadFlickrPhotostream(){
        Y.Get.js(FLICKR_ENDPOINT + '?format=json&id=' + FLICKR_USER_ID + '&r=' + Math.random())
    };
    Y.on("domready", function () {
        Y.one("#indicator").addClass("loading").show();
        loadFlickrPhotostream();
    })
})