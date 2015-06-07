var google = require ('googleapis');
google.options ({ auth: 'AIzaSyA6J3ruD71hEgF7X9kVGZd30DZotiy9DRI' });
var youtube = google.youtube ('v3');

var search_youtube = function(query) {
  youtube.search.list (
  {
    part: 'snippet',
    type: 'video',
    q: query,
    maxResults: 1,
    order: 'viewCount',
    safeSearch: 'moderate',
    videoEmbeddable: true
  },
  function (err, res) {
    if (err) { return (err); }
    res.items.forEach (function (result) {
      var video = JSON.stringify(result.id.videoId);
      console.log(video)
      return video;
    });
  }
  );
}
var id = search_youtube('imogen heap')

// console.log(id)
