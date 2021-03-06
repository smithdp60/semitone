var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var search = require('youtube-search');
var db = require('../models');

router.use(bodyParser.urlencoded({extended:false}));


//VIEW INDIVIDUAL FAVORITE
router.get("/:id", function(req, res) {
  if (isNaN(req.params.id) === false) {
    db.chord.find({where: {id: req.params.id}}).then(function(taco){
      if (taco !== null && taco !== undefined) {
        res.render("favorites/index", {faves:taco})
      } else {
        res.status(404).render('404', {title: "Sorry, page not found."});
      }
    });
  } else {
    res.status(404).render('404', {title: "Sorry, page not found."});
  }
});


//REMOVE INDIVIDUAL FAVORITE
router.delete('/:id', function(req,res){
  db.chord.destroy({where: {id:req.params.id}}).then(function(){
    res.send({result:true});
  });
});


module.exports = router;