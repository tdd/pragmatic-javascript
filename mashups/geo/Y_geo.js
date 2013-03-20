YUI().use("node","get","querystring-stringify","escape", function (Y) {
    // START:placemaker
    // Use your *own* API key for your own code :-)
    var YAHOO_APPID =
        'KwWEZW_V34GVYNWW0LZm6NT.XfIwNrF9ysko8qu6sDuE6SbehuptUZQp6jKF130V25hFTMrrdrbQeo4-';
    function getGeoLocationFor(text) {
        Placemaker.config.appID = YAHOO_APPID;
        Y.one("#indicator").addClass('loading').setHTML('Getting geolocation for ' + Y.Escape.html(text) + '…').show();
        Placemaker.getPlaces(text, function(places) {
            if (places.error) {
                Y.one('#indicator').removeClass('loading').setHTML(Y.Escape.html(places.error));
            } else {
                var loc = (places.matches || [places.match])[0].place;
                Y.one('#indicator').setHTML('Loading ' + loc.name + ' pics (' + loc.type + ')…');
                getGeoPhotos(loc.centroid.latitude, loc.centroid.longitude);
            }
        }, 'en-US');
    }
    // END:placemaker

    // Use your *own* API key for your own code :-)
    var FLICKR_API_KEY  = 'ca28e9f3c31c44e580f68d39aecf4f3c';
    var FLICKR_ENDPOINT = 'http://api.flickr.com/services/rest';
    var item = '<li><a href="{target}"><img src="{src}" title="#{title}" /></a></li>';

    function flickrCallback(data) {
        var stream = Y.one('#flickrStream').setHTML(''), d, dateStr;
        Y.each(data.photos.photo,function(photo){
            d = photo.datetaken.split(/\D/), dateStr = d[1] + '/' + d[2] + '/' + d[0];
            stream.insert(Y.Lang.sub(item,{
                src: photo.url_sq, title: Y.Escape.html(photo.description._content || ''),
                target: "http://www.flickr.com/photos/" + photo.owner + '/' + photo.id
            }))
        });
        var count = data.photos.pages > 1 ? data.photos.perpage : data.photos.total;
        Y.one('#indicator').removeClass('loading').setHTML('Loaded ' + count + '!');
    }

    // START:photos
    // flickrCallback is very similar to the Flickr syndication task’s code.
    // Get full example code at http://pragprog.com/titles/pg_js/source_code

    function getGeoPhotos(lat, lon) {
        var uri = FLICKR_ENDPOINT + '?' + Y.QueryString.stringify({
            // START_HIGHLIGHT
            method: 'flickr.photos.search', api_key: FLICKR_API_KEY,
            extras: 'date_taken,url_sq,description', lat: lat, lon: lon,
            // END_HIGHLIGHT
            per_page: 50, format: 'json', jsoncallback: 'flickrCallback'
        });
        Y.Get.js(uri + '&amp;r=' + Math.random());
    }
    // END:photos
    window.flickrCallback = flickrCallback;

    function triggerSearch(e) {
        e.preventDefault();
        var text = Y.one("#edtText").get("value");
        if (Y.Lang.trim(text) !== "") {
            getGeoLocationFor(text);
        }
    }
    Y.on("domready", function () {
        Y.one("#geoSearch").on("click",triggerSearch)
    })
})