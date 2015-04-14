var express = require('express');
var app = express();
var chordsCtrl = require("./controllers/chords");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use("/chords", chordsCtrl);

app.get("/", function(req, res) {
  res.render("index")
})


//retrieves chord search results

app.get("/", function(req,res) {
  var query = req.query.q;
  request('http://www.ultimate-tabs.com/search.htm?search=' + query, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('ul#lista li a').each(function (i, element) {
      });

      var preSlicedTitle = $('ul#lista li a').first().html();
      var slicedTitle = preSlicedTitle.slice(0, preSlicedTitle.indexOf("<"));

      var link = "http://www.ultimate-tabs.com/" + $('ul#lista li a').first().attr('href');

      res.render("chords/index", {slicedTitle:slicedTitle, link:link});
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
