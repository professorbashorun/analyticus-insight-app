/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/**
 * 
 * 
 * ///TODO: I am to add geolocation based query functions for each platform(API queries).
 *          I am to add time based query functions for each requests from the client.
 *          I am to store the ids of activity from the api.
 *          I am to get all the activity's contents through batch request.
 *          I am to get all the activity's subproperties when requested.
 * 
 * 
 */

var express = require("express");
var app = express();

var fbAT ="EAACEdEose0cBADMmWDRpGrn58yLjhCVZAihregQ933CheSzyHlB19RDU9AaFE0GJ7OcJ1MADENxuyFGu4h5jm3oQidbWNnjTT2qwAQDprfDS2oaGQV7VO1JE5hIt0uOlmksW2c6NILXbbstpoWtpWwwummzHmG3Dn83iZBTGK2AEsd4tvUz4rK6nDgPI4ZD";
var fb = require('fbgraph').setAccessToken(fbAT);
fb.setVersion("2.9");
var fbId = "308175999621104";
var fbSecret = "8dfafa9720c406541be9d29ee39f7c9e";
var Twitter = require('twitter');
var twCKey = "S0E9U3lMWaZc1JEqtRXZ9Ezd9";
var twCSecret = "X0eQwY7wk3TXC2MP6GSwUAXfC6dRPKUpzb3PtD4K9QhwEablFT";
var twAKey = "872991019591229440-proaXFD8VWBcHPmyckEfpg3dfhFMbs4";
var twASecret = "Z5HRVKNaxVde49E1ZfsHVCbuPEC6jzeDsJzOWXfjKtf2w";
var twC = {
    consumer_key: twCKey, consumer_secret: twCSecret,
    access_token_key: twAKey, access_token_secret: twASecret,
    access_token:twAKey
};
var tw = new Twitter(twC);
var ig = new require('instagram-node').instagram();
//var ig = require('instagram-node-lib');
var igAT = null;
var igId = "e39852e4c053464f8daabddba5fc4296";
var igSecret = "e1e6c972f3714ea1bcdc8658aa448461";
ig.use({client_id: igId, client_secret: igSecret});
//ig.set({client_id:igId});
//ig.set({client_secret:igSecret});
var gt = require("google-trends-api");
var aws = require('amazon-product-api');
var awsId = "";
var awsSecret = "";
var awsTag = "";
var amazon = aws.createClient({awsId:awsId, awsSecret:awsSecret, awsTag:awsTag});
var stat = require("simple-statistics");






module.exports = function () {
    
    
    
    var ROOT = __dirname+"/public/production";
    
    
    app.use("/test", function(req, res){
        res.sendFile(ROOT+"/index.html");
    });
    
    app.use("/theme-blue", function(req, res){
        res.sendFile(ROOT+"/index_1.html");
    });
    
    
    app.use("/theme-light", function(req, res){
        res.sendFile(ROOT+"/index_2.html");
    });
    
    app.use("/2", function(req, res){
        res.sendFile(ROOT+"/index_2_1.html");
    });
    
    
    app.use("/login", function(req, res){
        res.sendFile(ROOT+"/login.html");
    });
    
    
    app.use("/", function(req, res){
        res.sendFile(ROOT+"/index_1.html");
    });
    
    
    this.app = app;
    
    console.log("MODULE SAPP started");
    console.log("starting setting socket connetion ...");


    this.bidirectional = function(io){
        io.on('connection', function (socket) {
            console.log("socket:" + socket.id + " connected");
            var analytics = new jAnalytics(socket);




            var subAnalytics = ["facebook","google", "twitter", "instagram"];
            subAnalytics.forEach(function(anal){
                socket.on("/"+anal+"/setup/query", function(data){
                    console.log(anal+" JANALYTIC QUERY SETUP REQUESTED WITH"+data);
                    analytics[anal].query(data.q);
                });
            });









            socket.on('/google/interest/over/time', function (data) {
                console.log("GOOGLE TRENDS REQUESTED WITH " + JSON.stringify(data));
                analytics.google.setOption(data.google).interestOverTime();
            });
            
            
            
            
            
            socket.on('/google/summary', function (data) {
                console.log("GOOGLE TRENDS SUMMARY WITH " + data);
                analytics.google.setOption(data.google).summary();
            });
            
            
            
            
            
            socket.on('/google/times', function (data) {
                console.log("GOOGLE TRENDS TIME WITH " + data);
                analytics.google.setOption(data.google).time();
            });






            socket.on('/google/related/topics', function (data) {
                console.log("GOOGLE RELATED TOPICS REQUESTED WITH " + data);
                analytics.google.setOption(data.google).relatedTopics();
            });




            socket.on('/google/related/queries', function (data) {
                console.log("GOOGLE RELATED  QUERIES REQUESTED WITH " + data);
                analytics.google.setOption(data.google).relatedQueries();
            });




            socket.on('/google/interest/by/region', function (data) {
                console.log("GOOGLE INTEREST BY REGION REQUEST WITH " + data);
                analytics.google.setOption(data.google).interestByRegion();
            });





















            socket.on('/facebook/initialise', function (data) {
                console.log("FACEBOOK INITIALISING WITH " + JSON.stringify(data));
                analytics.facebook.setOption(data.facebook).mine();
            });


            socket.on('/facebook/related/pages', function () {
                console.log("FACEBOOK RELATED KEYWORDS REQUEST");
                analytics.facebook.relatedPages();
            });



            socket.on('/facebook/posts', function () {
                console.log("FACEBOOK POST REQUEST");
                analytics.facebook.posts();
            });



            socket.on('/facebook/likes', function () {
                console.log("FACEBOOK LIKE REQUEST");
                analytics.facebook.likes();
            });
            
            
            socket.on('/facebook/reaction_times', function () {
                console.log("FACEBOOK RETIMES REQUEST");
                analytics.facebook.reaction_times();
            });



            socket.on('/facebook/shares', function () {
                console.log("FACEBOOK SHARE REQUEST");
                analytics.facebook.shares();
            });



            socket.on('/facebook/comments', function () {
                console.log("FACEBOOK COMMENT REQUEST");
                analytics.facebook.comments();
            });



            socket.on('/facebook/likespp', function () {
                console.log("FACEBOOK LIKE PP REQUEST");
                analytics.facebook.likespp();
            });
            
            
            
            socket.on('/facebook/reaction_timespp', function () {
                console.log("FACEBOOK RETIMES PP REQUEST");
                analytics.facebook.reaction_timespp();
            });



            socket.on('/facebook/sharespp', function () {
                console.log("FACEBOOK SHARE PP REQUEST");
                analytics.facebook.sharespp();
            });



            socket.on('/facebook/commentspp', function () {
                console.log("FACEBOOK COMMENT PP REQUEST");
                analytics.facebook.commentspp();
            });
            
            
            
            socket.on('/facebook/likesppv', function () {
                console.log("FACEBOOK LIKE PP V REQUEST");
                analytics.facebook.likesppV();
            });



            socket.on('/facebook/sharesppv', function () {
                console.log("FACEBOOK SHARE PP V REQUEST");
                analytics.facebook.sharesppV();
            });
            
            
            
            socket.on('/facebook/reaction_timesppv', function () {
                console.log("FACEBOOK SHARE PP V REQUEST");
                analytics.facebook.reaction_timesppV();
            });



            socket.on('/facebook/commentsppv', function () {
                console.log("FACEBOOK COMMENT PP V REQUEST");
                analytics.facebook.commentsppV();
            });
            
            
            
            socket.on('/facebook/summary', function () {
                console.log("FACEBOOK SUMMARY REQUEST");
                analytics.facebook.summary();
            });
            
            
            
            socket.on('/facebook/times', function () {
                console.log("FACEBOOK TIME REQUEST");
                analytics.facebook.times();
            });















            socket.on('/twitter/initialise', function (data) {
                console.log("TWITTER INITIALISING WITH " + data);
                analytics.twitter.setOption(data.twitter).mine();
            });



            socket.on('/twitter/related/pages', function () {
                console.log("TWITTER RELATED PAGES REQUEST");
                analytics.twitter.relatedPages();
            });



            socket.on('/twitter/tweets', function () {
                console.log("TWITTER TWEETS REQUEST");
                analytics.twitter.tweets();
            });



            socket.on('/twitter/favourites', function () {
                console.log("TWITTER FAVOURITES REQUEST");
                analytics.twitter.favourites();
            });


            socket.on('/twitter/favouritespp', function () {
                console.log("TWITTER FAVOURITESPP REQUEST");
                analytics.twitter.favouritespp();
            });
            
            
             socket.on('/twitter/favouritesppv', function () {
                console.log("TWITTER FAVOURITESPP V REQUEST");
                analytics.twitter.favouritesppV();
            });


            



            socket.on('/twitter/summary', function () {
                console.log("TWITTER SUMMARY REQUESTED");
                analytics.twitter.summary();
            });
            
            
            
            
            socket.on('/twitter/times', function () {
                console.log("TWITTER TIME REQUESTED");
                analytics.twitter.times();
            });



            socket.on('/twitter/retweets', function () {
                console.log("TWITTER RETWEETS REQUEST");
                analytics.twitter.retweets();
            });



            socket.on('/twitter/retweetspp', function () {
                console.log("TWITTER RETWEETS REQUEST");
                analytics.twitter.retweetspp();
            });
            
            
            
            socket.on('/twitter/retweetsppv', function () {
                console.log("TWITTER RETWEETS V REQUEST");
                analytics.twitter.retweetsppV();
            });




            socket.on('/twitter/hashtags', function () {
                console.log("TWITTER HASHTAGS REQUEST");
                analytics.twitter.hashtags();
            });
















            socket.on('/instagram/initialise', function (data) {
                console.log("INSTAGRAM INITIALISING WITH " + data);
                analytics.instagram.setOption(data.instagram).mine();
            });




            socket.on('/instagram/related/pages', function () {
                console.log("INSTAGRAM RELATED PAGES REQUEST");
                analytics.instagram.relatedPages();
            });




            socket.on('/instagram/posts', function () {
                console.log("INSTAGRAM POST REQUEST");
                analytics.instagram.posts();
            });



            socket.on('/instagram/likes', function () {
                console.log("INSTAGRAM LIKE REQUEST");
                analytics.instagram.likes();
            });



            socket.on('/instagram/shares', function () {
                console.log("INSTAGRAM SHARE REQUEST");
                analytics.instagram.shares();
            });



            socket.on('/instagram/comments', function () {
                console.log("INSTAGRAM COMMENT REQUEST");
                analytics.instagram.comments();
            });
        });
        console.log("socket connection ready");
    };
    return this;
};










function jAnalytics(socket){

    this.facebook = new Facebook();
    this.google = new Google();
    this.twitter = new Twitter();
    this.instagram = new Instagram();
    
    
   
        
        
        
        
        
        
        
        
        
        
    function Google(){

        var mOption = {};
        var mQuery = null;
        var mSummary = {};
        var mInterestOverTime = {};
        var mInterestByRegion = {};
        var mTime = {};
        
        function getAvrInterestOverTime(key){
            return stat.mean(mInterestOverTime[key]);
        }
        
        function loadSummary(){
            keys = mOption.keyword;
            for(var i = 0; i < keys.length; i++){
                var k = keys[i];
                var int = getAvrInterestOverTime(k);
                mSummary[k] = {
                    interestOverTime:{
                        mean:int,
                        deviation:getSDInterestOverTime(k),
                        last:getLastInterestOverTime(k),
                        preformance:int
                    },
                    audience:{
                        mean:100,
                        deviation:0,
                        last:0
                    },
                    interestByRegion:{
                        mean:getAvrInterestByRegion(k),
                        deviation:getSDInterestByRegion(k),
                        last:0
                    },
                    performance:{
                        mean:getPerformance(k),
                        deviation:0,
                        last:0
                    }
                };
            }
        }
        
        
        function getPerformance(k){
            var i = getAvrInterestOverTime(k);
            return i/100;
        }
        
        
        
        
        
        function getSDInterestOverTime(key){
            return stat.standardDeviation(mInterestOverTime[key]);
        }
        
        function getLastInterestOverTime(key){
            var values = mInterestOverTime[key];
            var lastIndex = values.length - 1;
            var last = values[lastIndex];
            var init = values[lastIndex - 1];
            if(init){
                return ((last - init)/init)*100;
            }
            else{
                return 0;
            }
        }
        
        
        function getAvrInterestByRegion(int){
           //return stat.mean(mInterestByRegion);
        }
        
        function getSDInterestByRegion(int){
            //return stat.standardDeviation(mInterestByRegion);
        }
        
        
        this.summary = function(){
            loadSummary();
            socket.emit("return/google/summary", JSON.stringify(mSummary));
        };
        
        
        
        function getData(keyword){
            var data = mOption;
            data.keyword = keyword;
            return data;
        }

        
        
        this.query = function(query){
            mQuery = query;
            socket.emit("return/google/setup/query", true);
        };
        
        this.setKeywords = function(keywords){
            mKeywords = keywords;
            return this;
        };
        
        
        this.setOption = function(option){
            mOption = option;
            mOption.startTime = new Date(option.startTime);
            mOption.endTime = new Date(option.endTime);
            console.log(mOption);
            return this;
        };
        
        
        
        
        
        
        this.interestOverTime = function(){
            mInterestOverTime = {};
            mTime = {};
            gt.interestOverTime(mOption, function(err, result){
                if (err) console.error("Google Trends INTEREST OVER TIME Error", err);
                else {
                    result = JSON.parse(result);
                    var data = result.default.timelineData;
                    keys = mOption.keyword;
                    console.log(keys);
                    for(var i = 0; i < keys.length; i++){
                        var key = keys[i];
                        mInterestOverTime[key] = [];
                        mTime[key] = [];
                        for(var j = 0; j <data.length; j++){
                            mInterestOverTime[key].push(data[j].value[i]);
                            mTime[key].push(data[j].formattedTime);
                        }
                    }
                    socket.emit("return/google/interest/over/time", JSON.stringify(mInterestOverTime));
                    //var xls = json2xls(result);
                    ////fs.writeFileSync("google_interest_over_time.xlsx", xls, "binary");
                }
            });
        };
        
        
        this.time = function(){
            socket.emit("return/google/times", JSON.stringify(mTime));
        }
        
        
        
        
        this.interestByRegion = function(){
            gt.interestByRegion(mOption, function(err, result){
                if (err) console.error("Google Trends INTEREST BY REGION Error", err);
                else {
                    mInterestByRegion = result;
                    socket.emit("return/google/interest/by/region", result);
                }
            });
        };
        
        
        
        
        this.relatedQueries = function(){
            var data = getData(mQuery);
            gt.relatedQueries(data, function(err, result){
                if (err) console.error("Google Trends RELATED QUERIES Error", err);
                else{ 
                    socket.emit("return/google/related/queries", result);
                }
            });
        };
        
        
        
        this.relatedTopics = function(){
            var data = getData(mQuery);
            gt.relatedTopics(data, function(err, result){
                if (err) console.error("Google Trends RELATED TOPICS Error", err);
                else{ 
                    socket.emit("return/google/related/topics", result);
                }
            });
        };
        
        return this;
        
        
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var clone = require("clone");
    function Facebook(){
        var mPKeywords = [];
        var mOptions = {
            keywords:"",
            type:"",
            startTime:"",
            stopTime:""
        };
        
        
        var mPosts = {};
        var mShares = {};
        var mComments = {};
        var mLikes = {};
        var mRetimes = {};
        var mSharespp = {};
        var mCommentspp = {};
        var mLikespp = {};
        var mRetimespp = {};
        var mSharesppV = {};
        var mCommentsppV = {};
        var mLikesppV = {};
        var mRetimesppV = {};
        var mTime = {};
        
        
        
        var mFanCount = null;
        var mTalkingAboutCount = null;
        var mKeys = [];
        var mSummary = {};
        var counter = null;
        
        
        var mTimeInterval = null; 
        LOADING = {readyState:0};
        
        
        
        
        
        this.setOption = function(option){
            mOptions = option;
            return this;
        };
        
        
        
        
        function getAvrReactionTime(key){
            if(mRetimespp[key]){
                return Math.round(stat.mean(mRetimespp[key]));
            }
            else{
                return 0;
            }
        }
        
        function getAvrReactivity(key){
            if(mLikespp[key]){
                return stat.mean(mLikespp[key]);
            }
            else{
                return 0;
            }
            
        }
        
        function getAvrVirality(key){
            if(mSharespp[key]){
                return stat.mean(mSharespp[key]);
            }
            else{
                return 0;
            }
            
        }
        
        function getAvrEngagement(key){
            if(mCommentspp[key]){
                return stat.mean(mCommentspp[key]);
            }
            else{
                return 0;
            }
            
        }
        
        
        
        function getAvrActivity(key){
            if(mPosts[key]){
                return stat.mean(mPosts[key]);
            }
            else{
                return 0;
            }
            
        }
        
        
        
        function getTotalAudience(key){
            if(mFanCount[key]){
                return mFanCount[key];
            }
            else{
                return 0;
            }
        }
        
        
        function getPerformance(k){
            var v = getAvrVirality(k);
            var ac = getAvrActivity(k);
            var au = getTotalAudience(k);
            var r = getAvrReactivity(k);
            var e = getAvrEngagement(k);
            if(au){
                return Math.pow((12*v+8*e+ac+4*r)/25*au, 1/4)*100;
            }
            else{
                return 0;
            }
            
        }
        
        
        function getSDReactionTime(k){
            if(mRetimesppV[k]){
                return Math.sqrt(stat.mean(mRetimesppV[k]));
            }
            else{
                return 0;
            }
        }
        
        function getSDReactivity(k){
            if(mLikesppV[k]){
                return Math.sqrt(stat.mean(mLikesppV[k]));
            }
            else{
                return 0;
            }
        }
        
        function getSDVirality(k){
            if(mSharesppV[k]){
                return Math.sqrt(stat.mean(mSharesppV[k]));
            }
            else{
                return 0;
            }
        }
        
        function getSDEngagement(k){
            if(mCommentsppV[k]){
                return Math.sqrt(stat.mean(mCommentsppV[k]));
            }
            else{
                return 0;
            }
        }
        
        
        
        function getSDActivity(k){
            if(mPosts[k]){
                return Math.sqrt(stat.mean(mPosts[k]));
            }
            else{
                return 0;
            }
        }
        
        
        function getLastReactionTime(k){
            if(mRetimespp[k]){
                var lastIndex = mRetimespp[k].length - 1;
                var last = mRetimespp[k][lastIndex];
                var init = mRetimespp[k][lastIndex - 1];
                if(init)
                return ((last - init)/init)*100;
                else return 0;
            }
            else{
                return 0;
            }  
        }
        
        function getLastReactivity(k){
            if(mLikespp[k]){
                var lastIndex = mLikespp[k].length - 1;
                var last = mLikespp[k][lastIndex];
                var init = mLikespp[k][lastIndex - 1];
                if(init)
                return ((last - init)/init)*100;
                else return 0;
            }
            else{
                return 0;
            }
        }
        
        
        
        
        function getLastVirality(k){
            if(mSharespp[k]){
                var lastIndex = mSharespp[k].length - 1;
                var last = mSharespp[k][lastIndex];
                var init = mSharespp[k][lastIndex - 1];
                if(init)return ((last - init)/init)*100;
                else return 0;
            }
            else{
                return 0;
            }
        }
        
        
        
        
        
        function getLastEngagement(k){
            if(mCommentspp[k]){
                var lastIndex = mCommentspp[k].length - 1;
                var last = mCommentspp[k][lastIndex];
                var init = mCommentspp[k][lastIndex - 1];
                if(init)return ((last - init)/init)*100;
                else return 0;
            }
            else{
                return 0;
            }
        }
        
        
        
        function getLastActivity(k){
            if(mPosts[k]){
                var lastIndex = mPosts[k].length - 1;
                var last = mPosts[k][lastIndex];
                var init = mPosts[k][lastIndex - 1];
                if(init)return ((last - init)/init)*100;
                else return 0;
            }
            else{
                return 0;
            }   
        }
        
        
        function getTitledPerformance(key, title){
            var au = getTotalAudience(key);
            switch(title){
                case "reactivity":{
                    var r = getAvrReactivity(key);
                    return Math.round(Math.pow(r/au, 1/4)*100);
                }
                case "activity":{
                    var a = getAvrActivity(key);
                    var r = getAvrReactivity(key);
                    return Math.round(Math.pow(a/(au*r), 1/8)*100);
                }
                case "virality":{
                    var r = getAvrVirality(key);
                    return Math.round(Math.pow(r/au, 1/6)*100); 
                }
                case "engagement":{
                    var r = getAvrEngagement(key);
                    return Math.round(Math.pow(r/au, 1/5)*100);
                }
                case "reaction_time":{
                    var r = getAvrReactionTime(key);
                    if(r === 0) return 0;
                    return Math.round(Math.pow(1/r, 1/4)*100);    
                }
                default:return 0;
            }
        }
        
        
        
        
        
        
        function loadSummary(){
            for(var i = 0; i < mKeys.length; i++){
                var k0 = mKeys[i];
                var k = mOptions.keywords[k0];
                mSummary[k]={};
                mSummary[k].reactivity = {
                    mean:getAvrReactivity(k),
                    deviation:getSDReactivity(k),
                    last:getLastReactivity(k),
                    performance:getTitledPerformance(k, "reactivity")
                };
                mSummary[k].activity = {
                    mean:getAvrActivity(k),
                    deviation:getSDActivity(k),
                    last:getLastActivity(k),
                    performance:getTitledPerformance(k, "activity")
                };
                mSummary[k].virality = {
                    mean:getAvrVirality(k),
                    deviation:getSDVirality(k),
                    last:getLastVirality(k),
                    performance:getTitledPerformance(k, "virality")
                };
                mSummary[k].engagement = {
                    mean:getAvrEngagement(k),
                    deviation:getSDEngagement(k),
                    last:getLastEngagement(k),
                    performance:getTitledPerformance(k, "engagement")
                };
                mSummary[k].audience = {
                    mean:getTotalAudience(k),
                    deviation:0,
                    last:0
                };
                mSummary[k].performance ={
                    mean:getPerformance(k),
                    deviation:0,
                    last:0
                };
                mSummary[k].reaction_time = {
                    mean:getAvrReactionTime(k),
                    devaition:getSDReactionTime(k),
                    last:getLastReactionTime(k),
                    performance:getTitledPerformance(k, "reaction_time")
                };
            }
            return mSummary;
        };
        
        
        
        
        
        this.query = function(query){
            mPKeywords = [];
            fb.get("search?limit=12&q="+query+"&type=page&fields=fan_count,checkins,talking_about_count,name,id,picture.type(small)", function(err, res){
                if (err) console.error("facebook error 4", err);
                else{
                    mPKeywords = mPKeywords.concat(res.data);
                    LOADING.readyState = 1;
                }
                socket.emit("return/facebook/setup/query", true);
            });
        };
        
        
        var d = new Date(Date.now()).getDate()-7;
        var d1 = new Date(Date.now());
        d1.setDate(d);
        var aWeek = new Date(Date.now()) - d1;
        this.mine = function(){
            var ids = "";
            var num = Object.keys(mOptions.keywords).length;
            var i = 0;
            for(var key in mOptions.keywords){
                ids += key;
                if (i !== num -1) ids += ",";
                i++;
            };
            console.log(ids);
            mPosts = {};
            mShares = {};
            mComments = {};
            mLikes = {};
            mSharespp = {};
            mCommentspp = {};
            mLikespp = {};
            mKeys= [];
            mRetimes = {};
            mFanCount ={};
            mTalkingAboutCount = {};
            counter = 0;
            sent=false;
            mTimeInterval = mOptions.timeInterval&&(mOptions.timeInterval!=="")? +new Date(mOptions.timeInterval) : aWeek;
            console.log(ids);
            var date = new Date(Date.now());
            fbget("?ids="+ids+"&fields=feed.limit(100){likes.summary(total_count).limit(0),comments.summary(total_count).limit(1),shares,created_time},fan_count,talking_about_count", null, date);
        };
        
        
        
        function finishedPaging(){
            console.log("END NEW ONE");
            if(counter === Object.keys(mOptions.keywords).length-1 && sent===false){
                sent=true;
                console.log(mLikes);
                socket.emit("return/facebook/initialise", true);
            }else{
                
            }
            counter++;
        }
        
        
        
        function fbget(query, mainKey, lastCreatedTime, p, l, c, s, rt, lA, cA, sA, rtA){
            fb.get(query, function(err, resPages){
                if (err) console.error("facebook error 5", err);
                else{
                    LOADING.readyState = 2;
                    console.log("loading data ... ");
                    var keyArr = [];
                    if(mainKey) keyArr.push(mainKey);
                    else{
                        for(var key in resPages){
                            keyArr.push(key);
                        }
                        mKeys = keyArr;
                    }
                    
                    
                    
                    if(lastCreatedTime)mLastCreatedTime=lastCreatedTime;
                    for(var k = 0; k < keyArr.length; k++){
                        var key = keyArr[k];
                        var key2 = mOptions.keywords[key];
                        console.log(key);
                        var pages = !mainKey? resPages[key] : resPages;
                        mFanCount[key2] =mFanCount[key2]|| pages.fan_count;
                        pages = pages.feed||pages;
                        console.log(pages);
                        var rawPosts = pages.data;
                        mTalkingAboutCount[key2] = pages.talking_about_count;
                        if(rawPosts){
                            var post = p;
                            var like = l;
                            var share = s; 
                            var comment = c;
                            var reaction_time = rt;
                            var likeArr = lA||[];
                            var shareArr = sA||[]; 
                            var commentArr = cA||[];
                            var reaction_timeArr = rtA||[];
                            var endSep = null;
                            for(var i = 0; i < rawPosts.length; i++){
                                var newDate = rawPosts[i].created_time;
                                var N = Math.floor((+new Date(mLastCreatedTime) - new Date(newDate))/mTimeInterval);
                                if(N <= 0){
                                    post = (post?post:0) + 1;
                                    share = (share?share:0) + rawPosts[i].shares?rawPosts[i].shares.count:0;
                                    rawPosts[i].shares?shareArr.push(rawPosts[i].shares.count):shareArr.push(0);
                                    like = (like?like:0) + rawPosts[i].likes.summary.total_count;
                                    var rt = rawPosts[i].comments.data[0]?rawPosts[i].comments.data[0].created_time:0; 
                                    reaction_time = (reaction_time?reaction_time:0) + ((new Date(rawPosts[i].created_time) - new Date(rt))/Math.pow(10, 9));
                                    reaction_timeArr.push((+new Date(rt) - new Date(rawPosts[i].created_time))/1000);
                                    likeArr.push(rawPosts[i].likes.summary.total_count);
                                    comment = (comment?like:0)+rawPosts[i].comments.summary.total_count;
                                    commentArr.push(rawPosts[i].comments.summary.total_count);
                                }
                                else if(N > 0){
                                    if(post){
                                        alloc(key2, mLastCreatedTime, post, like, comment, share, reaction_time, likeArr, commentArr, shareArr, reaction_timeArr);
                                        mLastCreatedTime = new Date( +new Date(mLastCreatedTime) - mTimeInterval);
                                    }
                                    for(var w = 0; w < N-1; w++){
                                        push(key2, mLastCreatedTime);
                                        mLastCreatedTime = new Date( +new Date(mLastCreatedTime) - mTimeInterval);
                                    }
                                    post = 1;
                                    like = rawPosts[i].likes.summary.total_count;
                                    comment = rawPosts[i].comments.summary.total_count;
                                    share = rawPosts[i].shares?rawPosts[i].shares.count:0;
                                    endSep = +new Date(mLastCreatedTime) - new Date(mOptions.endTime);
                                    console.log(mTime);
                                }
                            };
                            if(endSep < 0 || !pages.paging.next){
                                finishedPaging();
                                return;
                            }
                            else if(pages.paging && pages.paging.next){
                                console.log("NEXT PAGE 22");
                                var index = pages.paging.next.indexOf(key+"/feed?");
                                var string = pages.paging.next.substring(index);
                                fbget(string, key, mLastCreatedTime, post, like, comment, share, reaction_time, likeArr, commentArr, shareArr, reaction_timeArr);
                            }
                            else{
                                finishedPaging();
                            }
                        }
                    }
                }
            });
        };
        
        
        function fbgetV1(query){
            fb.get(query, function(err, resPages){
                if (err) console.error("facebook error 5", err);
                else{
                    //get array of pages
                }
            });
        }
        
        
        function alloc(key2, mLastCreatedTime, post, like, comment, share, reaction_time, likeArr, commentArr, shareArr, reaction_timeArr){
            likepp = clone(like)/clone(post);
            commentpp = clone(comment)/clone(post);
            sharepp = clone(share)/clone(post);
            reaction_timepp = clone(reaction_time)/clone(post);
            mPosts[key2] = mPosts[key2]||[];
            mPosts[key2].push(post);
            mLikes[key2] = mLikes[key2]||[];
            mLikes[key2].push(like);
            mComments[key2] = mComments[key2]||[];
            mComments[key2].push(comment);
            mShares[key2] = mShares[key2]||[];
            mShares[key2].push(share);
            mRetimes[key2] = mRetimes[key2]||[];
            mRetimes[key2].push(reaction_time);
            mLikespp[key2] = mLikespp[key2]||[];
            mLikespp[key2].push(likepp);
            mCommentspp[key2] = mCommentspp[key2]||[];
            mCommentspp[key2].push(commentpp);
            mSharespp[key2] = mSharespp[key2]||[];
            mSharespp[key2].push(sharepp);
            mRetimespp[key2] = mRetimespp[key2]||[];
            mRetimespp[key2].push(reaction_timepp);
            mLikesppV[key2] = mLikesppV[key2]||[];
            mLikesppV[key2].push(stat.variance(likeArr));
            mCommentsppV[key2] = mCommentsppV[key2]||[];
            mCommentsppV[key2].push(stat.variance(commentArr));
            mSharesppV[key2] = mSharesppV[key2]||[];
            mSharesppV[key2].push(stat.variance(shareArr));
            mRetimesppV[key2] = mRetimesppV[key2]||[];
            mRetimesppV[key2].push(stat.variance(reaction_timeArr));
            console.log(likepp);
            console.log(stat.mean(likeArr));
            console.log(stat.variance(likeArr));
            if(!mTime[key2]) mTime[key2]=[mLastCreatedTime];
            else{
                var lastIndex = mTime[key2].length -1;
                var lastTime = mTime[key2][lastIndex];
                var newTime = new Date(+new Date(lastTime) - mTimeInterval);
                mTime[key2].push(newTime);
            }
        }
        
        
        
        function push(key2, mLastCreatedTime){
            mPosts[key2] = mPosts[key2]||[];
            mPosts[key2].push(0);
            mLikes[key2] = mLikes[key2]||[];
            mLikes[key2].push(0);
            mComments[key2] = mComments[key2]||[];
            mComments[key2].push(0);
            mShares[key2] = mShares[key2]||[];
            mShares[key2].push(0);
            mRetimes[key2] = mRetimes[key2]||[];
            mRetimes[key2].push(0);
            mLikespp[key2] = mLikespp[key2]||[];
            mLikespp[key2].push(0);
            mCommentspp[key2] = mCommentspp[key2]||[];
            mCommentspp[key2].push(0);
            mSharespp[key2] = mSharespp[key2]||[];
            mSharespp[key2].push(0);
            mRetimespp[key2] = mRetimespp[key2]||[];
            mRetimespp[key2].push(0);
            mLikesppV[key2] = mLikesppV[key2]||[];
            mLikesppV[key2].push(0);
            mCommentsppV[key2] = mCommentsppV[key2]||[];
            mCommentsppV[key2].push(0);
            mSharesppV[key2] = mSharesppV[key2]||[];
            mSharesppV[key2].push(0);
            mRetimesppV[key2] = mRetimesppV[key2]||[];
            mRetimesppV[key2].push(0);
            if(!mTime[key2]) mTime[key2]=[mLastCreatedTime];
            else{
                var lastIndex = mTime[key2].length -1;
                var lastTime = mTime[key2][lastIndex];
                var newTime = new Date(+new Date(lastTime) - mTimeInterval);
                mTime[key2].push(newTime);
            }
        }
        
        
        
        
        this.likes = function(){
            console.log("RETURNING FACEBOOK LIKES");
            socket.emit("return/facebook/likes", JSON.stringify(mLikes));
            
        };
        
        
        
        
        this.comments = function(){
            console.log("RETURNING FACEBOOK COMMENTS");
            socket.emit("return/facebook/comments", JSON.stringify(mComments));
           
        };
        
        
        

        this.shares = function(){
            console.log("RETURNING FACEBOOK SHARES");
            socket.emit("return/facebook/shares", JSON.stringify(mShares));
           
        };
        
        
        
        this.reaction_times = function(){
            console.log("RETURNING FACEBOOK RETIMES");
            socket.emit("return/facebook/reaction_times", JSON.stringify(mRetimes));
        };
        
        
        
        this.likespp = function(){
            console.log("RETURNING FACEBOOK LIKESPP");
            socket.emit("return/facebook/likespp", JSON.stringify(mLikespp));
            
        };
        
        
        
        
        this.commentspp = function(){
            console.log("RETURNING FACEBOOK COMMENTSPP");
            socket.emit("return/facebook/commentspp", JSON.stringify(mCommentspp));
            
        };
        
        
        

        this.sharespp = function(){
            console.log("RETURNING FACEBOOK SHARESPP");
            socket.emit("return/facebook/sharespp", JSON.stringify(mSharespp));
            
        };
        
        
        
        
        
        this.reaction_timespp = function(){
            console.log("RETURNING FACEBOOK SHARESPP");
            socket.emit("return/facebook/reaction_timespp", JSON.stringify(mRetimespp));
        };
        
        
        
        
        
        this.likesppV = function(){
            console.log("RETURNING FACEBOOK LIKESPP V");
            socket.emit("return/facebook/likesppv", JSON.stringify(mLikesppV));
        };
        
        
        
        
        this.commentsppV = function(){
            console.log("RETURNING FACEBOOK COMMENTSPP V");
            socket.emit("return/facebook/commentsppv", JSON.stringify(mCommentsppV));
        };
        
        
        

        this.sharesppV = function(){
            console.log("RETURNING FACEBOOK SHARESPP V");
            socket.emit("return/facebook/sharesppv", JSON.stringify(mSharesppV));
        };
        
        
        
        this.reaction_timesppV = function(){
            console.log("RETURNING FACEBOOK SHARESPP V");
            socket.emit("return/facebook/sharesppv", JSON.stringify(mRetimesppV));
        };


        this.posts = function(){
            console.log("RETURNING FACEBOOK POSTS");
            socket.emit("return/facebook/posts", JSON.stringify(mPosts));
        };
        
        
        this.relatedPages = function(){
            socket.emit("return/facebook/related/pages", JSON.stringify(mPKeywords)); 
        };
        
        
        
        this.summary = function(){
            loadSummary();
            console.log("RETURNING FACEBOOK SUMMARY");
            socket.emit("return/facebook/summary", JSON.stringify(mSummary));
        };
        
        
        this.times = function(){
            console.log("RETURNING FACEBOOK TIMES");
            socket.emit("return/facebook/times", JSON.stringify(mTime));
        };
        
        
        return this;
    };
    
    
    
    
    
    
    
    function Twitter(){
        var mQuery = null;
        var mRPages = [];
        var mHashtags = [];
        var mOptions = {};
        var mTweets = {};
        var mRetweets = {};
        var mFavourites = {};
        var mRetweetspp = {};
        var mFavouritespp = {};
        var mFavouritesppV = {};
        var mRetweetsppV = {};
        var mFollowers = {};
        var mLikes = {};
        var mListeds = {};
        var mFriends = {};
        var mSummary = {};
        var mKeys = [];
        var mTime = {};
        LOADING = {readyState:0};
        
        var mTimeInterval = null;
        
        
        
        this.query = function(query){
            mQuery = query;
            mRPages=[];
            twquery(0);
        };
        
        
        function twquery(page){
            tw.get("users/search", {q:mQuery, count:20, page:page}, function(err, pages){
                if(err){ 
                    console.error("Twitter error query", err);
                    socket.emit("return/twitter/error", err);
                }
                else{
                    if(pages){
                        LOADING = {readyState:1};
                        mRPages = mRPages.concat(pages);
                        if(page === 0){
                            socket.emit("return/twitter/setup/query", true);
                        }
                    }
                    else{
                        socket.emit("return/twitter/error", {state:"empty"});
                    } 
                }
            });
        };
        
        
        
        
        
        this.setOption = function(option){
            mOptions = option;
            return this;
        };
                
        
        function getAvrReactivity(k){
            if(mFavouritespp[k]){
                return stat.mean(mFavouritespp[k]);
            }
            else{
                return 0;
            }
        }
        
        function getAvrVirality(k){
            if(mRetweetspp[k]){
                return stat.mean(mRetweetspp[k]);
            }
            else{
                return 0;
            }
        }
        
        
        
        function getAvrActivity(k){
            if(mTweets[k]){
                return stat.mean(mTweets[k]);
            }
            else{
                return 0;
            }
        }
        
        
        
        
        
        function getTotalAudience(k){
            if(mFollowers[k]){
                return mFollowers[k];
            }
            else{
                return 0;
            }    
        }
        
        
        function getPerformance(k){
            var v = getAvrVirality(k);
            var ac = getAvrActivity(k);
            var au = getTotalAudience(k);
            var r = getAvrReactivity(k);
            if(au){
                return Math.pow((8*v+ac+4*r)/13*au, 1/4)*100;
            }
            else{
                return 0;
            }
        }
        
        
        
        function getSDReactivity(k){
            if((mFavouritesppV[k])){
                return Math.sqrt(stat.mean(mFavouritesppV[k]));
            }
            else{
                return 0;
            }
        }
        
        function getSDVirality(k){
            if((mFavouritesppV[k])){
                return Math.sqrt(stat.mean(mRetweetsppV[k]));
            }
            else{
                return 0;
            }
        }
        
        
        function getSDActivity(k){
            if((mFavouritesppV[k])){
                return Math.sqrt(stat.mean(mTweets[k]));
            }
            else{
                return 0;
            }
        }
        
        
        
        
        function getLastReactivity(k){
            if(mFavouritespp[k]){
                var lastIndex = mFavouritespp[k].length - 1;
                var last = mFavouritespp[k][lastIndex];
                var init = mFavouritespp[k][lastIndex - 1];
                return ((last - init)/init)*100;
            }
            else{
                return 0;
            }
        }
        
        function getLastVirality(k){
            if(mRetweetspp[k]){
                var lastIndex = mRetweetspp[k].length - 1;
                var last = mRetweetspp[k][lastIndex];
                var init = mRetweetspp[k][lastIndex - 1];
                return ((last - init)/init)*100;
            }
            else{
                return 0;
            }
        }
        
        
        function getLastActivity(k){
            if(mTweets[k]){
                var lastIndex = mTweets[k].length - 1;
                var last = mTweets[k][lastIndex];
                var init = mTweets[k][lastIndex - 1];
                return ((last - init)/init)*100;
            }
            else{
                return 0;
            }   
        }
        
        
        function getTitledPerformance(key, title){
            var au = getTotalAudience(key);
            switch(title){
                case "reactivity":{
                    var r = getAvrReactivity(key);
                    return Math.round(Math.pow(r/au, 1/4)*100);
                }
                case "activity":{
                    var a = getActivity(key);
                    var r = getAvrReactivity(key);
                    return Math.round(Math.pow(a/(au*r), 1/8)*100);
                }
                case "virality":{
                    var r = getAvrVirality(key);
                    return Math.round(Math.pow(r/au, 1/6)*100); 
                }
                case "engagement":{
                    var r = getAvrEngagement(key);
                    return Math.round(Math.pow(r/au, 1/5)*100);
                }
                case "reaction_time":{
                    var r = getAvrReactionTime(key);
                    if(r === 0) return 0;
                    return Math.round(Math.pow(1/r, 1/4)*100);    
                }
                default:return 0;
            }
        }
        
        
       
        
        function loadSummary(){
            console.log(mKeys);
            for(var i = 0; i < mKeys.length; i++){
                var k = mKeys[i];
                mSummary[k]={};
                mSummary[k].reactivity = {
                    mean:getAvrReactivity(k),
                    deviation:getSDReactivity(k),
                    last:getLastReactivity(k),
                    performance:getTitledPerformance(k, "reactivity")
                };
                mSummary[k].activity = {
                    mean:getAvrActivity(k),
                    deviation:getSDActivity(k),
                    last:getLastActivity(k),
                    performance:getTitledPerformance(k, "reactivity")
                };
                mSummary[k].virality = {
                    mean:getAvrVirality(k),
                    deviation:getSDVirality(k),
                    last:getLastVirality(k),
                    performance:getTitledPerformance(k, "reactivity")
                };
                mSummary[k].engagment = {
                    mean:0000,
                    deviation:0,
                    last:0,
                    performance:0
                };
                mSummary[k].audience = {
                    mean:getTotalAudience(k),
                    deviation:0,
                    last:0
                };
                mSummary[k].performance = {
                    mean:getPerformance(k),
                    deviation:0,
                    last:0
                }
                mSummary[k].reaction_time = {
                    mean:0000,
                    devaition:0,
                    last:0,
                    performance:0
                };
            }
            return mSummary;
        };
        
        
        
        
        var d = new Date(Date.now()).getDate()-7;
        var d1 = new Date(Date.now());
        d1.setDate(d);
        var aWeek = new Date(Date.now()) - d1;
        var HashtagCount = require("hashtag-count");
        this.mine = function(){
            console.log("HEREERERE");
            mKeys = [];
            for(var i = 0; i < mOptions.keywords.length; i++){
                mKeys[i] = mOptions.keywords[i].text;
            }
            console.log(mKeys.length);
            /*tw.hashtag = new HashtagCount(twC);
            tw.hashtag.start({
                hashtags:keyW,
                interval:"30 seconds",
                history:"6 months",
                intervalCb:function(err, res){
                    if(err) console.error("HashTag Count Error ", err);
                    else{
                        console.log(res);
                        for(var key in res){
                            var list = res[key];
                            var counter = 0;
                            for(var listKey in list){
                                counter+=list[listKey];
                            }
                            var hashtag = {
                                time:key,
                                count:counter
                            };
                            mHashtags.push(hashtag);
                            socket.emit("return/twitter/hashtags/ready", true);
                        }
                    }
                }
            });*/
            mFavourites = {};
            mRetweets = {};
            mTweets = {};
            mFavouritespp = {};
            mRetweetspp = {};
            var date = new Date(Date.now());
            mTimeInterval = mOptions.timeInterval&&(mOptions.timeInterval!=="")? +new Date(mOptions.timeInterval) : aWeek;
            for(var i = 0; i < mOptions.keywords.length; i++){
                twget(mOptions.keywords[i].id, null, date);
                console.log("HERERE");
            }    
        };
        
        
        counter = 0;
        function registerFinished(key){
            counter++;
            if(counter === mKeys.length){
                return socket.emit("return/twitter/initialise", true);
            }
            else{
                return socket.emit("return/twitter/progress", {done:counter}, {keyword:key});
            }
        };
        
        
        /*
         * Time and shouffle typed got changed for all va Changed
         * Deprecated on the 24th/July/2017
         * 
         */
        function twget(keywordId, maxId,lastCreatedTime, t, r, fv, fvA, rA){
            console.log(maxId);
            var option = {user_id:keywordId, count:1000, include_rts:false, trim_user:false};
            if(maxId !== null)option.max_id =maxId;
            tw.get("statuses/user_timeline", option, function(err, rawTweets){
                if (err) {
                    console.error("Twitter Trends Error", err);
                    socket.emit("return/twitter/error", JSON.stringify(err));
                }
                else {
                    console.log(rawTweets.length);
                    if(rawTweets.length === 0 || !rawTweets)return registerFinished();
                    LOADING = {readyState:2};
                    var tweet = t;
                    var favourite = fv;
                    var retweet = r;
                    var favouriteArr = fvA||[];
                    var retweetArr = rA||[];
                    var mLastCreatedTime = lastCreatedTime;
                    for(var j = 0; j < rawTweets.length; j++ ){
                        var rawTweet = rawTweets[j];
                        var instantaneousTime = +new Date(rawTweet.created_at);
                        var N = Math.floor((+new Date(mLastCreatedTime) - instantaneousTime)/ mTimeInterval);
                        if(N === 0){
                            tweet = (tweet? tweet : 0) + 1;
                            favourite= (favourite?favourite: 0) + rawTweet.favorite_count;
                            retweet= (retweet?retweet: 0) + rawTweet.retweet_count;
                            mLikes= mLikes?mLikes: rawTweet.user.favourites_count;
                            mListeds= mListeds?mListeds: rawTweet.user.listed_count;
                            mFriends = mFriends?mFriends:rawTweet.user.friends_count;
                            favouriteArr.push(rawTweet.favorite_count);
                            retweetArr.push(rawTweet.retweet_count);
                        }
                        else if(N > 0){
                            if(tweet){
                                allocate(clone(rawTweet), mLastCreatedTime, clone(tweet), clone(retweet), clone(favourite), clone(favouriteArr), clone(retweetArr));
                                mLastCreatedTime = new Date( +new Date(mLastCreatedTime) - mTimeInterval);
                            }
                            for(var w = 0; w < N-1; w++){
                                push(clone(rawTweet), clone(mLastCreatedTime));
                                mLastCreatedTime = new Date( +new Date(mLastCreatedTime) - mTimeInterval);
                            }
                            tweet = 1;
                            favourite= rawTweet.favorite_count;
                            retweet= rawTweet.retweet_count;
                            favouriteArr.push(favourite);
                            retweetArr.push(retweet);
                            favouriteArr = [favourite];
                            retweetArr = [retweet];
                            console.log(mTime);
                        }
                        
                        var timeDifference = +new Date(rawTweet.created_at) - new Date(mOptions.endTime);
                        if(timeDifference < 0 ){
                            return registerFinished(rawTweet.user.name);
                        }
                        if(timeDifference > 0 && j === rawTweets.length-1){ 
                            twget(keywordId, rawTweet.id, clone(mLastCreatedTime), clone(tweet), clone(retweet), clone(favourite), clone(favouriteArr), clone(retweetArr));
                        };
                    };
                    
                };
            });
        };
        
        
        
        function allocate(rawTweet, mLastCreatedTime, tweet, retweet, favourite, favouriteArr, retweetArr){
            var retweetpp = clone(retweet/(tweet));
            var favouritepp = clone(favourite/(tweet));
            mFollowers[rawTweet.user.name]=mFollowers[rawTweet.user.name]||rawTweet.user.followers_count;
            console.log(mFollowers[rawTweet.user.name]);
            mTweets[rawTweet.user.name]=mTweets[rawTweet.user.name]||[];
            mTweets[rawTweet.user.name].push(clone(tweet?tweet:0));
            mFavourites[rawTweet.user.name]=mFavourites[rawTweet.user.name]||[];
            mFavourites[rawTweet.user.name].push(clone(favourite));
            mRetweets[rawTweet.user.name]=mRetweets[rawTweet.user.name]||[];
            mRetweets[rawTweet.user.name].push(clone(retweet));
            mFavouritespp[rawTweet.user.name]=mFavouritespp[rawTweet.user.name]||[];
            mFavouritespp[rawTweet.user.name].push(clone(favouritepp));
            mRetweetspp[rawTweet.user.name]=mRetweetspp[rawTweet.user.name]||[];
            mRetweetspp[rawTweet.user.name].push(clone(retweetpp));
            mFavouritesppV[rawTweet.user.name]=mFavouritesppV[rawTweet.user.name]||[];
            mFavouritesppV[rawTweet.user.name].push(clone(stat.variance(favouriteArr)));
            mRetweetsppV[rawTweet.user.name]=mRetweetsppV[rawTweet.user.name]||[];
            mRetweetsppV[rawTweet.user.name].push(clone(stat.variance(retweetArr)));
            if(!mTime[rawTweet.user.name]) mTime[rawTweet.user.name]=[mLastCreatedTime];
            else{
                var lastIndex = mTime[rawTweet.user.name].length -1;
                var lastTime = mTime[rawTweet.user.name][lastIndex];
                var newTime = new Date(+new Date(lastTime) - mTimeInterval);
                mTime[rawTweet.user.name].push(newTime);
            }
        }
        
        
        function push(rawTweet, mLastCreatedTime){
            mFollowers[rawTweet.user.name]=mFollowers[rawTweet.user.name]||rawTweet.user.followers_count;
            mFriends[rawTweet.user.name]= mFriends[rawTweet.user.name]||[];
            mFriends[rawTweet.user.name].push(0);
            mLikes[rawTweet.user.name]=mLikes[rawTweet.user.name]||[];
            mLikes[rawTweet.user.name].push(0);
            mListeds[rawTweet.user.name]=mListeds[rawTweet.user.name]||[];
            mListeds[rawTweet.user.name].push(0);
            mTweets[rawTweet.user.name]=mTweets[rawTweet.user.name]||[];
            mTweets[rawTweet.user.name].push(0);
            mFavourites[rawTweet.user.name]=mFavourites[rawTweet.user.name]||[];
            mFavourites[rawTweet.user.name].push(0);
            mRetweets[rawTweet.user.name]=mRetweets[rawTweet.user.name]||[];
            mRetweets[rawTweet.user.name].push(0);
            mFavouritespp[rawTweet.user.name]=mFavouritespp[rawTweet.user.name]||[];
            mFavouritespp[rawTweet.user.name].push(0);
            mRetweetspp[rawTweet.user.name]=mRetweetspp[rawTweet.user.name]||[];
            mRetweetspp[rawTweet.user.name].push(0);
            mFavouritesppV[rawTweet.user.name]=mFavouritesppV[rawTweet.user.name]||[];
            mFavouritesppV[rawTweet.user.name].push(0);
            mRetweetsppV[rawTweet.user.name]=mRetweetsppV[rawTweet.user.name]||[];
            mRetweetsppV[rawTweet.user.name].push(0);
            if(!mTime[rawTweet.user.name]) mTime[rawTweet.user.name]=[mLastCreatedTime];
            else{
                var lastIndex = mTime[rawTweet.user.name].length -1;
                var lastTime = mTime[rawTweet.user.name][lastIndex];
                var newTime = new Date(+new Date(lastTime) - mTimeInterval);
                mTime[rawTweet.user.name].push(newTime);
            }
        }
        
        
        
        
        this.favourites = function(){
            socket.emit("return/twitter/favourites", JSON.stringify(mFavourites));
            
        };
        
        
        
        this.favouritespp = function(){
            socket.emit("return/twitter/favouritespp", JSON.stringify(mFavouritespp));
            //fs.writeFileSync("twitter_favouritespp.xlsx", xls, "binary");
        };
        
        
        
        this.favouritesppV = function(){
            socket.emit("return/twitter/favouritesppv", JSON.stringify(mFavouritesppV));
            
        };
        
        
        
        this.hashtags = function(){
            socket.emit("return/twitter/hashtags", JSON.stringify(mHashtags));
            //fs.writeFileSync("twitter_hashtags.xlsx", xls, "binary");
        };
            
            
            
         

        this.retweets = function(){
            socket.emit("return/twitter/retweets", JSON.stringify(mRetweets));
            //fs.writeFileSync("twitter_retweets.xlsx", xls, "binary");
        };
        
        
        
        this.retweetspp = function(){
            socket.emit("return/twitter/retweetspp", JSON.stringify(mRetweetspp));
        };
        
        
        this.retweetsppV = function(){
            socket.emit("return/twitter/retweetsppv", JSON.stringify(mRetweetsppV));
        };




        this.tweets = function(){
            socket.emit("return/twitter/tweets", JSON.stringify(mTweets));
            //fs.writeFileSync("twitter_tweets.xlsx", xls, "binary");
        };
        
        
        
        
        
        
        this.summary = function(){
            loadSummary();
            socket.emit("return/twitter/summary", JSON.stringify(mSummary));
        };
        
        
        this.times = function(){
            socket.emit("return/twitter/times", JSON.stringify(mTime));
        };
        
        
        


        this.relatedPages = function(){
            socket.emit("return/twitter/related/pages", JSON.stringify(mRPages));
        };
        
    return this;
    };
    
    
    
    
    
    function Instagram(){

        var mOptions = {};
        var mPKeywords = [];
        var mHashtagPage = [];
        var mHashtag = [];
        var mQuery=null;
        var mPosts = [];
        var mShares = [];
        var mFollowers = [];
        var mComments = [];
        var mLikes = [];
        var mPages = [];
        LOADING = {readyState:0};


        
        
        this.setOption = function(option){
            mOptions = option;
            return this;
        };
        
        
        
        
        
        
        this.query = function(query){
            /*ig.use({access_token:igAT});
            ig.user_search(query, function(err, users, remaining, limit){
                if(err) console.error("Instargram error", err);
                else {
                    console.log(users);
                    mPKeywords = [];
                    mPKeywords = mPKeywords.push(users);
                    socket.emit("return/instagram/setup/query", true);
                }
            });*/
        };
        
        

        this.mine = function(){
            ig.tagscrape = require("instagram-tagscrape");
            for(var i = 0; i < mOptions.keywords.length; i++){
                ig.tagscrape.scrapeTagPage(mOptions.keywords[i].text).then(function(result){
                    mHashtagPages = mHashtagPages.push({
                        total:result.total,
                        count:result.count
                    });
                    result.media.forEach(function(media){
                       var hashtagComments = {
                           time:media.date,
                           count:media.comments.count
                       };
                       mHashtagComments = mHashtagComments.push(hashtagComments);
                       var hashtagLikes = {
                           time:media.data,
                           count:media.likes.count
                       };
                       mHashtagLikes = mHashtagLikes.push(hashtagLikes);
                    });
                });
                ig.user(mOptions.keywords[i].id, allocPage);
                ig.user_media_recent(mOptions.keywords[i], allocData);
            }
        };
        
        
        function allocData(err, medias, paging, remaining, limit){
            if(err) console.error("Instagram error allocData", err);
            else{
                var rawPosts = medias;
                var length = rawPosts.length;
                for(var i = 0; i < length; i++){
                    var post = {
                        time:rawPosts[i].created_time,
                        id: rawPosts[i].id
                    };
                    mPosts.push(post);
                    var like = {
                        time:rawPosts[i].created_time,
                        count: rawPosts[i].likes.summary.total_count
                    };
                    mLikes.push(like);
                    /*var share = {
                        time:rawPost.createAt,
                        count: rawPost.shares.summary.total_count
                    };
                    mShares.push(share);*/
                    var comment = {
                        time: rawPosts[i].created_time,
                        count: rawPosts[i].comments.summary.total_count
                    };
                    mComments.push(comment);
                };
            }
            if(paging.next){
                paging.next(allocData);
            }
            else{
                socket.emit("return/instagram/initialise", true);
            }
        };
        
        
        function allocPage(err, pages, paging, remaining, limit){
            if(err) console.error("Instagram error allocUser", err);
            else{
                mPages = mPages.push(pages);
            }
            if(paging.next){
                paging.next(allocPage);
            }
            else{
                socket.emit("return/instagram/initialise/page/done", true);
            }
        }



        this.likes = function(){
            socket.emit("return/instagram/likes", JSON.stringify(mLikes));
            //fs.writeFileSync("instagram_likes.xlsx", xls, "binary");
        };



        this.comments = function(){
            socket.emit("return/instagram/comments", JSON.stringify(mComments));
            //fs.writeFileSync("instagram_comments.xlsx", xls, "binary");
        };


        this.shares = function(){
            socket.emit("return/instagram/shares", JSON.stringify(mShares));
            var xls = json2xls(mShares);
            //fs.writeFileSync("instagram_shares.xlsx", xls, "binary");
        };


        this.posts = function(){
            socket.emit("return/instagram/posts", JSON.stringify(mPosts));
            //fs.writeFileSync("instagram_posts.xlsx", xls, "binary");
        };
        
        
        this.followers = function(){
            socket.emit("return/instagram/followers", JSON.stringify(mFollowers));
            //fs.writeFileSync("instagram_followers.xlsx", xls, "binary");
        };

        this.relatedPages = function(){
            socket.emit("return/instagram/related/pages", JSON.stringify(mPKeywords));
            //fs.writeFileSync("instagram_related_pages.xlsx", xls, "binary");
        };
        
        
    };
    
    
    
    
    
    function Amazon(){
        
        
        
        
        var mRQuery = null;
        var mProducts = null;
        var mReviews = null;
        var mTime = null;
        
        
        
        this.mine = function(){
            
        };
        
        
        this.query = function(){
            
        };
        
        
        this.get = function(){
            
        };
        
    }
    
    
    
    return this;
};


