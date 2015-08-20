var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var YouTube = require('youtube-node');
var youTube = new YouTube();
var db = require('../models');

youTube.setKey(process.env.GOOGLE_API_KEY);
router.use(bodyParser.urlencoded({extended:false}));

//DATA SCRAPING FUNCTION
router.get("/", function(req,res) {
  var user = req.getUser();
  var query = req.query.q;
  if (query !== "") {
    async.waterfall([
      function(callback) {
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
              callback(null, slicedTitle, link);
            }
          }
        });
      },
      function(slicedTitle, link, callback) {
        request(link, function (error, response, html) {
          if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('pre#core').each(function (i, element) {
            });
            var unfilteredChords = $('pre#core').html();
            if (unfilteredChords !== null && unfilteredChords !== undefined) {
              var chords = unfilteredChords.trim();
              callback(null, slicedTitle, link, chords);
            }
          }
        });
      },
      function(slicedTitle, link, chords, callback) {
        youTube.search(slicedTitle, 1, function(error, result) {
          if (error) {
            console.log(error);
          } else {
            var url = JSON.stringify(result.items[0].id.videoId, null, 1);
            var slicedUrl = url.replace(/["]+/g, '');
            callback(null, slicedTitle, link, chords, slicedUrl);
          }
        })
      },
      function(slicedTitle, link, chords, slicedUrl, callback) {
        db.chord.find({where: {song: slicedTitle, userId: req.getUser().id}}).then(function(faveBoolean) {
          if (faveBoolean !== null) {
            faveBoolean = true;
          } else if (faveBoolean === null) {
            faveBoolean = false;
          }
          callback(null, slicedTitle, link, chords, slicedUrl, faveBoolean);
        });
      }
    ], function (err, slicedTitle, link, chords, slicedUrl, faveBoolean) {
      if (err) {
        req.flash('info', 'Please try a different search.');
        res.redirect('./');
      } else {
        res.render("chords/index", {slicedTitle:slicedTitle, link:link, chords:chords, slicedUrl:slicedUrl, fave:faveBoolean});
      }
    });
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