var search = require('youtube-search');

var opts = {
  maxResults: 1,
  startIndex: 1
};

search('amy winehouse', opts, function(err, results) {
  if(err) return console.log(err);
  var titles = results.map(function(video) {
    var urlObject = {video:video.url};
    var url = (urlObject['video'])
    var slicedUrl = url.slice(url.indexOf("=") + 1, url.indexOf("&"));
    console.log(slicedUrl)
  })
});