var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var YouTube = require('youtube-node');
var youTube = new YouTube();
var db = require('../models');

youTube.setKey(process.env.GOOGLE_API_KEY);

router.use(bodyParser.urlencoded({extended:false}));

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
                var unfilteredChords = $('pre#core').html();
                if (unfilteredChords !== null && unfilteredChords !== undefined) {
                  var chords = unfilteredChords.trim();
                  youTube.search(slicedTitle, 1, function(error, result) {
                    if (error) {
                      console.log(error);
                    } else {
                      var url = JSON.stringify(result.items[0].id.videoId, null, 1);
                      var slicedUrl = url.replace(/["]+/g, '');
                      db.chord.find({where: {song: slicedTitle, userId: req.getUser().id}}).then(function(fave) {
                        if (fave !== null) {
                          fave = true;
                        } else if (fave === null) {
                          fave = false;
                        }
                        res.render("chords/index", {slicedTitle:slicedTitle, link:link, chords:chords, slicedUrl:slicedUrl, fave:fave});
                      })
                    }
                  });
                }
              }
            });
        } else {
          req.flash('info', 'Please try a different search.');
          res.redirect('./');
        }
      };
    })
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