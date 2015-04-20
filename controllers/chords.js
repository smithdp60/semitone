var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var search = require('youtube-search');
var db = require('../models');

router.use(bodyParser.urlencoded({extended:false}));

//YOUTUBE SEARCH LIMITATIONS
var opts = {
  maxResults: 1,
  startIndex: 1
};


//DATA SCRAPING FUNCTION
router.get("/", function(req,res) {
  var query = req.query.q;
  var user = req.getUser();
  if (query !== "") {
  //retrieves chord search results
  request('http://www.ultimate-tabs.com/search.htm?search=' + query, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('ul#lista li a').each(function (i, element) {
      });
      var preSlicedTitle = $('ul#lista li a').first().html();
      if (preSlicedTitle !== null && preSlicedTitle !== undefined) {
        var slicedTitle = preSlicedTitle.slice(0, preSlicedTitle.indexOf("<"));
        var link = "http://www.ultimate-tabs.com/" + $('ul#lista li a').first().attr('href');
          //uses first retrieved result and retrieves chords
          request(link, function (error, response, html) {
            if (!error && response.statusCode == 200) {
              var $ = cheerio.load(html);
              $('pre#core').each(function (i, element) {
              });
              var chords = $('pre#core').html().trim();
              // .replace(/\(|\)/g, "") // removed from between html() and trim()

              //retrieves YouTube video ID
              search(slicedTitle, opts, function(err, results) {
                if(err) return console.log(err);
                var titles = results.map(function(video) {
                  var urlObject = {video:video.url};
                  var url = (urlObject['video'])
                  var slicedUrl = url.slice(url.indexOf("=") + 1, url.indexOf("&"));
                  db.chord.find({where: {song: slicedTitle, userId: req.getUser().id}}).then(function(fave) {
                    if (fave !== null) {
                      fave = true;
                    } else if (fave === null) {
                      fave = false;
                    }
                  res.render("chords/index", {slicedTitle:slicedTitle, link:link, chords:chords, slicedUrl:slicedUrl, fave:fave});
                  })
                })
              });
            }
          });
      } else {
        res.redirect('./');
      }
    }
    })
  } else {
    res.redirect('./');
  }
})


//ADD TO FAVORITES
router.post("/", function(req,res) {
  db.chord.findOrCreate({where: {song: req.body.song, chords: req.body.chords, youtube: req.body.youtube, userId: req.getUser().id}}).spread(function(usersData, created) {
    usersData.save().then(function(usersData) {
      res.send({result:true});
    })
  })
})


module.exports = router;