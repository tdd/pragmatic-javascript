(function() {
  // START:placemaker
  // Use your *own* API key for your own code :-)
  var YAHOO_APPID =
   'KwWEZW_V34GVYNWW0LZm6NT.XfIwNrF9ysko8qu6sDuE6SbehuptUZQp6jKF130V25hFTMrrdrbQeo4-';
    
  function getGeoLocationFor(text) {
    Placemaker.config.appID = YAHOO_APPID;
    $('indicator').addClassName('loading').update('Getting geolocation for ' +
      text.escapeHTML() + '…').show();
    Placemaker.getPlaces(text, function(places) {
      if (places.error) {
        $('indicator').removeClassName('loading').update(places.error.escapeHTML());
      } else {
        var loc = (places.matches || [places.match])[0].place;
        $('indicator').update('Loading ' + loc.name + ' pics (' + loc.type + ')…');
        getGeoPhotos(loc.centroid.latitude, loc.centroid.longitude);
      }
    }, 'en-US');
  }
  // END:placemaker

  // Use your *own* API key for your own code :-)
  var FLICKR_API_KEY  = 'ca28e9f3c31c44e580f68d39aecf4f3c';
  var FLICKR_ENDPOINT = 'http://api.flickr.com/services/rest';
  var item = new Template(
    '<li><a href="#{target}"><img src="#{src}" title="#{title}" /></a></li>');

  function flickrCallback(data) {
    var stream = $('flickrStream').update(''), d, dateStr;
    data.photos.photo.each(function(photo) {
      d = photo.datetaken.split(/\D/), dateStr = d[1] + '/' + d[2] + '/' + d[0];
      stream.insert(item.evaluate({
        src: photo.url_sq, title: (photo.description._content || '').escapeHTML(),
        target: "http://www.flickr.com/photos/" + photo.owner + '/' + photo.id
      }));
    });
    var count = data.photos.pages > 1 ? data.photos.perpage : data.photos.total;
    $('indicator').removeClassName('loading').update('Loaded ' + count + '!');
  }
  // START:photos
  // flickrCallback is very similar to the Flickr syndication task’s code.
  // Get full example code at http://pragprog.com/titles/pg_js/source_code
  
  function getGeoPhotos(lat, lon) {
//    $('indicator').addClassName('loading').show();
    var uri = FLICKR_ENDPOINT + '?' + Object.toQueryString({
      // START_HIGHLIGHT
      method: 'flickr.photos.search', api_key: FLICKR_API_KEY,
      extras: 'date_taken,url_sq,description', lat: lat, lon: lon,
      // END_HIGHLIGHT
      per_page: 50, format: 'json', jsoncallback: 'flickrCallback'
    });
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: uri + '&amp;r=' + Math.random() }));
  }
  // END:photos

  window.flickrCallback = flickrCallback;
  
  function triggerSearch(e) {
    e.stop();
    var text = $F('edtText');
    if (!text.blank()) {
      getGeoLocationFor(text);
    }
  }
  
  document.observe('dom:loaded', function() {
    $('geoSearch').observe('submit', triggerSearch);
  });
})();