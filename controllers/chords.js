var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var search = require('youtube-search');
var db = require('../models');

router.use(bodyParser.urlencoded({extended:false}));

var opts = {
  maxResults: 1,
  startIndex: 1
};

router.get("/", function(req,res) {
  var query = req.query.q;
  if (query !== "") {
  //retrieves chord search results
  request('http://www.ultimate-tabs.com/search.htm?search=' + query, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('ul#lista li a').each(function (i, element) {
      });
      var preSlicedTitle = $('ul#lista li a').first().html();
      var slicedTitle = preSlicedTitle.slice(0, preSlicedTitle.indexOf("<"));
      var link = "http://www.ultimate-tabs.com/" + $('ul#lista li a').first().attr('href');
        //retrieves chords
        request(link, function (error, response, html) {
          if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('pre#core').each(function (i, element) {
            });
            var chords = $('pre#core').html().trim();
            //retrieves YouTube video ID
            search(slicedTitle, opts, function(err, results) {
              if(err) return console.log(err);
              var titles = results.map(function(video) {
                var urlObject = {video:video.url};
                var url = (urlObject['video'])
                var slicedUrl = url.slice(url.indexOf("=") + 1, url.indexOf("&"));;
                res.render("chords/index", {slicedTitle:slicedTitle, link:link, chords:chords, slicedUrl:slicedUrl});
              })
            });
          }
        });
      }
    })
} else {
  res.render("./index");
}
})



router.post("/", function(req,res) {
  db.chord.findOrCreate({where: {song: req.body.song, chords: req.body.chords, youtube: req.body.youtube, userId: req.getUser().id}}).spread(function(data, created) {
    data.save().then(function(data) {
      res.send(data);
    })
  })
})



module.exports = router;