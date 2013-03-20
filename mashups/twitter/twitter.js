(function() {
  // START:main
  var REGEXP_URL = new RegExp('(https?://.*?)(\\W?(?:\\s|$))', 'gi');
  
  function twitterCallback(data) {
    var stream = $('twitterStream'), replyTo, contents;
    data.each(function(tweet) {
      contents = tweet.text.escapeHTML().replace(REGEXP_URL, '<a href="$1">$1</a>$2');
      if (replyTo = tweet.in_reply_to_screen_name) { // Intentional assign
        contents = contents.replace('@' + replyTo,
          '<a href="http://twitter.com/' + replyTo + '/statuses/' +
          tweet.in_reply_to_status_id + '">$&</a>');
      }
      contents = '<li><p>' + contents + '</p>' +
        '<p class="stamp">' + tweet.created_at + '</p></li>';
      stream.insert(contents);
    });
  }
  
  function loadTwitterStream(userName) {
    var uri = 'http://twitter.com/statuses/user_timeline/' + userName + '.json';
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: uri + '?callback=twitterCallback&r=' + Math.random() }));
  }
  // END:main
  
  // These aren't in the book, they push the processing a bit further :-)
  MONTH_NAMES = $w('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec');
  
  function processTweet(tweet) {
    var stream = $('twitterStream'), replyTo, contents, calendar, when, month, day;
    // Link URLs
    contents = tweet.text.escapeHTML().replace(REGEXP_URL, '<a href="$1">$1</a>$2');
    // Link @'s replying-to
    if (replyTo = tweet.in_reply_to_screen_name) { // Intentional assign
      contents = contents.replace('@' + replyTo,
        '<a href="http://twitter.com/' + replyTo + '/statuses/' +
        tweet.in_reply_to_status_id + '">$&</a>');
    }
    // Link @'s not replying-to
    contents = contents.gsub(/@(\w+)/, function(md) {
      return replyTo != md[1] ? '<a href="http://twitter.com/' + md[1] + '">' + md[0] + '</a>' : md[0];
    });
    // Link hashtags
    contents = contents.replace(/#(\w+)/g, '<a href="http://search.twitter.com/search?q=%23$1">$&</a>');
    contents = '<p>' + contents + '</p>';
    // Be nice to IE6/IE7 date/time parsers, that (quite rightly…) require TZ offsets at the end.
    var offset = tweet.created_at.match(/\s+[+-]\d{4}\b/);
    if (offset) {
      tweet.created_at = tweet.created_at.replace(offset, '') + offset;
    }
    // Prep side calendar
    when = new Date(tweet.created_at), month = MONTH_NAMES[when.getMonth()], day = when.getDate();
    calendar = '<span class="calendar"><span class="month">' + month + '</span> ' +
      '<span class="day">' + day + '</span></span>';
    contents = '<li>' + calendar + contents + '<div class="clear"></div></li>';
    stream.insert(contents);
  }
  
  function processProfile(profile) {
    var user = $('user');
    user.down('img').src = profile.profile_image_url;
    user.down('.name').update('<a href="http://twitter.com/' + profile.screen_name + '">' +
      profile.name.escapeHTML() + '</a> <span class="details">(@' + profile.screen_name + ', ' +
      profile.description.escapeHTML() + ')</span>');
    user.down('.counters').update(profile.statuses_count + ' tweets, ' +
      profile.friends_count + ' followed, ' + profile.followers_count + ' followers.');
    user.show();
  }

  // This is the actual "global" callback called
  window.twitterCallback = function twitterCallback(data) {
    // user.description
    processProfile(data[0].user)
    data.each(processTweet);
    $('indicator').removeClassName('loading').update('Stream loaded!');
  };
  
  document.observe('dom:loaded', function() {
    $('indicator').addClassName('loading').show();
    loadTwitterStream('porteneuve');
  });
})();