var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));




app.setApp = function(sapp){
    app.use(sapp);
    
    /*
    var fb = require("fbgraph");
    var fbId = "";
    var fbSecret = "";
    var fbRURL="http://localhost:3000/login/facebook";
    app.use('/login/facebook', function(req, res){
        if(!req.query.code){
            console.log("GETTING FACEBOOK CODE...");
            var authUrl = fb.getOauthUrl({
                client_id:fbId,
                redirect_uri:fbRURL,
                scope:""
            });

            if(!req.query.error){
                res.redirect(authUrl);
            }else{
                res.send("ACCESS DENIED");
            }
        }
        else{
            fb.authorize({
                client_id:fbId,
                client_secret:fbSecret,
                redirect_uri:fbRURL,
                code:req.query.code
            }, function(err, result){
                res.facebook = result;
                res.redirect("/");
            });
        }

    });



    var tw = new require("twitter")();
    var twRURL = "http://localhost:3000/login/twitter/callback";
    app.use('/login/twitter', function(req, res){

    });






    var ig = require("instagram-node").instagram();
    var igId = "e39852e4c053464f8daabddba5fc4296";
    var igSecret = "e1e6c972f3714ea1bcdc8658aa448461";
    ig.use({client_id: igId, client_secret: igSecret});
    var igRURL= "http://localhost:3000/login/instagram/callback";
    app.use('/login/instagram', function(req, res){
        ig.get_authorization_url(igRURL);
    });
    app.use('/login/instagram/callback', function(req, res){
        ig.authorize_user(req.query.code, igRURL, function(err, result){
            res.instagram = result;
            res.redirect("/");
        });
    });
    */





    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });








    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }








    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

}





module.exports = app;
