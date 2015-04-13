var request = require('request');
var cheerio = require('cheerio');

var query = "john legend all of me";
var result = "john-legend/all-of-me-chords";

request('http://www.ultimate-tabs.com/search.htm?search=' + query, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('ul#lista li a').each(function (i, element) {
      var $link = $(this);
    });
    var preSlice = $('ul#lista li a').first().html();
    console.log(preSlice.slice(0, preSlice.indexOf("<")));
    console.log("http://www.ultimate-tabs.com/" + $('ul#lista li a').first().attr('href'));
  }
});

request('http://www.ultimate-tabs.com/' + result, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('pre#core').each(function (i, element) {
    //   var $link = $(this);
  });
    console.log($('pre#core').html());
  }
});