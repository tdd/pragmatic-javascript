(function() {
  // START:main
  var FLICKR_ENDPOINT = 'http://api.flickr.com/services/feeds/photos_public.gne';
  var FLICKR_USER_ID  = '97027332@N00'; // That’s me!
  var item = new Template(
    '<li><a href="#{target}"><img src="#{src}" title="#{title}" /></a></li>');

  function jsonFlickrFeed(data) {
    var stream = $('flickrStream'), d, dateStr;
    data.items.each(function(photo) {
      d = photo.published.split(/\D/);
      dateStr = d[1] + '/' + d[2] + '/' + d[0];
      stream.insert(item.evaluate({
        src: photo.media.m.replace('_m', '_s'), target: photo.link,
        title: 'Published on ' + dateStr + ' GMT'
      }));
    });
    $('indicator').removeClassName('loading').update('Loaded!');
  }
  
  function loadFlickrPhotostream() {
    var uri = FLICKR_ENDPOINT + '?format=json&id=' + FLICKR_USER_ID;
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: uri + '&r=' + Math.random() }));
  }
  // END:main

  window.jsonFlickrFeed = jsonFlickrFeed;
  
  document.observe('dom:loaded', function() {
    $('indicator').addClassName('loading').show();
    loadFlickrPhotostream();
  });
})();