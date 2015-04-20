var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var search = require('youtube-search');
var bcrypt = require('bcrypt');
var db = require('../models');

router.use(bodyParser.urlencoded({extended:false}));

//GET /auth/login
//display login form
router.get('/login',function(req,res){
    res.render('auth/login');
});

//GET /auth/signup
//display login form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
    var userQuery={email:req.body.email};
    var userData={
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
    };
    db.user.findOrCreate({where:userQuery,defaults:userData})
    .spread(function(user,created){
        if(created){
            req.flash('success', 'New user created. Please login.');
            res.redirect('/auth/login');
        }else{
            req.flash('danger', 'E-mail address already exists.');
            res.redirect('/auth/signup');
        }

    }).catch(function(error){
        if(error){
            if(Array.isArray(error.errors)){
                error.errors.forEach(function(errorItem){
                    req.flash('danger',errorItem.message);
                });
            }else{
                req.flash('danger','unknown error');
                console.log('unknown error',error);
            }
        }else{
            req.flash('danger','unknown error');
            console.log('error, but no error...');
        }
        res.redirect('/auth/signup');
    })
});


//POST /login
//process login data and login user
router.post('/login',function(req,res){
    db.user.find({where:{email:req.body.email}})
    .then(function(user){
        if(user){
            //check password
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(err) throw err;

                if(result){
                    //store user to session!!
                    req.session.user={
                        id:user.id,
                        email:user.email,
                        name:user.name
                    };
                    req.flash('success','Logged in.');
                    res.redirect('/');
                }else{
                    req.flash('danger','Invalid password.');
                    res.redirect('/auth/login');
                }
            })
        }else{
            req.flash('danger','Unknown user. Please sign up.');
            res.redirect('/auth/login');
        }
    })
});


//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
    delete req.session.user;
    req.flash('info','You have been logged out.')
    res.redirect('/');
});


module.exports = router;