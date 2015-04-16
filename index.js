var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
var db = require('./models');

var chordsCtrl = require("./controllers/chords");
var authCtrl = require("./controllers/auth");
var faveCtrl = require("./controllers/favorites");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret:'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

//middleware for detecting if user is logged in
app.use(function(req,res,next){
  req.getUser = function(){
    res.locals.guser = req.session.user || false;
    return res.locals.guser;
  }
  next();
});

app.use('*', function(req,res,next){
  var getUser = req.getUser();
  res.locals.getUser = getUser;
  next();
})


//middleware for showing all favorites in header modal
app.use(function(req,res,next){
  db.chord.findAll({where: {userId: req.getUser().id}}).then(function(taco){
    res.locals.allFaves=taco;
    next();
  });
})


//middleware for alerts
app.use(function(req,res,next){
  res.locals.alerts=req.flash();
  next();
})



app.use("/chords", chordsCtrl);
app.use("/auth", authCtrl)
app.use("/favorites", faveCtrl)


app.get("/", function(req, res) {
  res.render("index")
})



app.listen(process.env.PORT || 3000);
