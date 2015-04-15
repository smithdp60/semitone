var db = require('./models');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var chordsCtrl = require("./controllers/chords");
var authCtrl = require("./controllers/auth");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret:'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req,res,next){
  req.getUser = function(){
    res.locals.guser = req.session.user || false;
    // console.log(res.locals.guser)
    return res.locals.guser;
  }
  next();
});

app.use('*', function(req,res,next){
  var getUser = req.getUser();
  res.locals.getUser = getUser;
  next();
})

//custom middleware for alerts
app.use(function(req,res,next){
  res.locals.alerts=req.flash();
  next();
})

app.use("/chords", chordsCtrl);
app.use("/auth", authCtrl)

app.get("/", function(req, res) {
  res.render("index")
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
