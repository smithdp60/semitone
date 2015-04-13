var search = require('youtube-search');

var opts = {
  maxResults: 1,
  startIndex: 1
};

search('john legend all of me', opts, function(err, results) {
  if(err) return console.log(err);

  var titles = results.map(function(video) {
    return {title: video.title, url: video.url}
  })

  console.log(titles);
});