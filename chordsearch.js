var request = require('request');
var cheerio = require('cheerio');

var query = "john legend all of me";
var result = "john-legend/all-of-me-chords";

//retrieves chord search results
request('http://www.ultimate-tabs.com/search.htm?search=' + query, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('ul#lista li a').each(function (i, element) {
    });

    var preSlicedTitle = $('ul#lista li a').first().html();
    var slicedTitle = preSlicedTitle.slice(0, preSlicedTitle.indexOf("<"));

    var link = "http://www.ultimate-tabs.com/" + $('ul#lista li a').first().attr('href');

    console.log(slicedTitle);
    console.log(link);
  }
});

// //retrieves chords
// request('http://www.ultimate-tabs.com/' + result, function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     $('pre#core').each(function (i, element) {
//     //   var $link = $(this);
//   });
//     console.log($('pre#core').html());
//   }
// });