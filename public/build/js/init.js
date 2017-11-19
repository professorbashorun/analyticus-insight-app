/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var date = new Date(Date.now()).getDate() - 7;
var year = new Date(Date.now()).getFullYear() - 2;
var stopDate = new Date(Date.now());
stopDate.setFullYear(year);
//var socket = io('http://localhost:3000');
var socket = io('http://www.analyticus.io');
var search="nollywood";
var keyData = {
    q:search,
    google:{
        keyword:[],
        startTime:new Date(Date.now()),
        intervalTime:"",
        endTime:stopDate,
        geo:""
    },
    facebook:{
        keyword:[],
        startTime:new Date(Date.now()),
        intervalTime:"",
        endTime:stopDate,
        geo:""
    },
    twitter:{
        keyword:[],
        startTime:new Date(Date.now()),
        intervalTime:"",
        count:"",
        endTime:stopDate,
        geo:""
    },
    instagram:{
        keyword:[],
        startTime:new Date(Date.now()),
        intervalTime:"",
        endTime:stopDate,
        geo:""
    }
};
var resultData = {
    overview:{
        dashboard:{
            time:[],
            virality:[],
            reactivity:[],
            engagement:[],
            comment:[],
            like:[],
            share:[],
            post:[],
            reaction_time:[],
            summary:{
                activity:{
                    mean:4443,
                    deviation:45,
                    last:-34
                },
                virality:{
                    mean:4443,
                    deviation:45,
                    last:-34
                },
                reactivity:{
                    mean:4003,
                    deviation:42,
                    last:-32
                },
                engagement:{
                    mean:2243,
                    deviation:45,
                    last:34
                },
                reaction_time:{
                    mean:43,
                    deviation:5,
                    last:4
                }
            }
        },
        dashboard1:{
            time:[],
            virality:[],
            reactivity:[],
            engagement:[],
            comment:[],
            like:[],
            share:[],
            post:[],
            reaction_time:[],
            summary:{
                activity:{
                    mean:4443,
                    deviation:45,
                    last:-34
                },
                virality:{
                    mean:4443,
                    deviation:45,
                    last:-34
                },
                reactivity:{
                    mean:4003,
                    deviation:42,
                    last:-32
                },
                engagement:{
                    mean:2243,
                    deviation:45,
                    last:34
                },
                reaction_time:{
                    mean:43,
                    deviation:5,
                    last:4
                }
            }
        },
        dashboard2:{
            time:[],
            virality:[],
            reactivity:[],
            engagement:[],
            comment:[],
            like:[],
            share:[],
            post:[],
            reaction_time:[],
            summary:{
                activity:{
                    mean:4443,
                    deviation:45,
                    last:-34
                },
                virality:{
                    mean:4443,
                    deviation:45,
                    last:-34
                },
                reactivity:{
                    mean:4003,
                    deviation:42,
                    last:-32
                },
                engagement:{
                    mean:2243,
                    deviation:45,
                    last:34
                },
                reaction_time:{
                    mean:43,
                    deviation:5,
                    last:4
                }
            }
        }
    },
    google:{
        
    },
    twitter:{
    },
    facebook:{
    },
    youtube:{
    },
    instagram:{
    }
};
var linkedData = {
    keyword:{
        overview:"dashboard",
        twitter:"keyword",
        facebook:"keyword",
        instagram:"keyword",
        google:"keyword",
        youtube:"keyword"
    }
};
var comparedData = [];




var initActiveGL = $(".graph_loader.active");
var initActiveP = $(".platform.active");
var initActiveCP = $(".campaign_performance.active");
var initActiveK = $(".platform.active+ul > li.active");
var nameState = "google";
var keywordState = "%combined%";
var titleState = "interestOverTime";
var linkedState = null;








function drawBars(type, title, data, time, key){
    try {
        data = data?data:[];
        time = time?time:[];
        var chart = echarts.init(document.getElementById("chart_plot"));

        var option = {
            title : {
                text: title.toUpperCase(),
                subtext: type.toUpperCase()
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:key
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar',  'stack', 'tiled', 'force', 'chord', 'pie', 'funnel']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : time
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series:[]
        };
        option.series[0]= {};
        option.series[0].name = key;
        option.series[0].type = 'bar';
        option.series[0].data = data;
        //option.series[0].markPoint = {data : [{type : 'max', name: 'maximum'},{type : 'min', name: 'minimum'}]};
        option.series[0].markLine = {data : [{type : 'average', name: 'mean'}]};
        chart.setOption(option);
    }
    catch(e){
        console.error(e);
    }
        
};















function drawMultiBars(type, title, data, times){
    try{
        data = data?data:[];
        times = times?times:[];
        var k = null;
        for(var key in times){
            length = times[key]?times[key].length:0;
            if(!k)k=key;
            else if(times[k] && times[k].length < length) k = key;
        }
        var chart = echarts.init(document.getElementById("chart_plot"));
        var time = times[k];
        var option = {
            title : {
                text: title.toUpperCase(),
                subtext: type.toUpperCase()
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[]
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar',  'stack', 'tiled', 'force', 'chord', 'pie', 'funnel']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : time
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series:[]
        };
        var i = 0;
        for(var key in data){
            option.legend.data.push(key);
            option.series[i] = {};
            option.series[i].name = key;
            option.series[i].type = 'bar';
            option.series[i].data = data[key];
            //option.series[i].markPoint = {data : [{type : 'max', name: 'maximum'},{type : 'min', name: 'minimum'}]};
            option.series[i].markLine = {data : [{type : 'average', name: 'mean'}]};
            i++;
        }
        chart.setOption(option);
    }
    catch(e){
        console.error(e);
    }
        
};










/*
function Modal(id){
    
    var aId = id;
    var id = "modal_"+id;
    
    
    this.html = function(){
        $html = "<div id=\""+id+"\" class=\"modal fade\" data-easein='fade' role=\"dialog\">"+
            "<div class=\"modal-dialog\">"+

              "<div class=\"modal-content\" style=\"width:70vw; margin-left:-14vw\">"+
                "<div class=\"modal-header\">"+
                  "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
                  "<h4 class=\"modal-title\"></h4>"+
                "</div>"+
                "<div class=\"modal-body\">"+
                "<div id=\""+aId+"_related_queries\" style=\"height:40vh\"></div>"+
                "<div id=\""+aId+"_chosen_keywords\" style=\"height:20vh\"></div>"+
                "</div>"+
                "<div class=\"modal-footer\">"+
                    "<button type=\"button\" class=\"btn btn-default\" id='"+aId+"_initialise_button' data-dismiss=\"modal\">Load</button>"+
                    "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>"+
                "</div>"+
              "</div>"+

            "</div>"+
          "</div>";
      return $html; 
    };
    
    
    this.init = function(){
        $(".modal_container").prepend(this.html());
    };
    
    
    
    this.title = function(){
        return $("#"+id).find(".modal-title");
    };
    
    
    
    this.body = function(){
        return $("#"+id).find(".modal-body");
    };
    
    
    this.chosenContainer = function(){
        return $("#"+aId+"_chosen_keywords");
    };
    
    
    this.relatedContainer = function(){
        return $("#"+aId+"_related_queries");
    };
    
    
    this.footer = function(){
        return $("#"+id).find(".modal-footer");
    };
    
    
    
    this.show = function(){
        $("#"+id).modal("show");
    };
}
*/


function KSelector(type){
    
    $this = this;
    
    this.element = $("#"+type+"_keywords_selector");
    
    
    
    this.chosenContainer = function(){
        return $this.element.find(".chosen_keywords");
    };
    
    
    this.relatedContainer = function(){
        return $this.element.find(".related_queries");
    };
    
    
}







function setup(){
    setMainView(false, true, false);
    keyData.q = $("#search").val();
    var analytics = ["facebook", "google", "instagram", "twitter"];
    searchBtn = $("#search_btn");
    searchBtn.html("<span class='glyphicon glyphicon-hourglass'></span>");
    analytics.forEach(function(anal){
        socket.emit("/"+anal+"/setup/query", keyData);
    });



    socket.on("return/google/setup/query", function(){
        //socket.emit('/google/related/queries', keyData);
        socket.emit('/google/related/topics', keyData);
        searchBtn = $("#search_btn");
        searchBtn.html("Go!");
    });


    socket.on("return/facebook/setup/query", function(){
        socket.emit('/facebook/related/pages', keyData);
        //socket.emit('/facebook/related/users', keyData);
        //socket.emit('/facebook/related/groups', keyData);
    });


    socket.on("return/twitter/setup/query", function(){
        socket.emit('/twitter/related/pages', keyData);
        //socket.emit('/twitter/related/hashtags', keyData);
    });



    socket.on("return/instagram/setup/query", function(){
        $("#myModal").modal("show");
        socket.emit('/instagram/related/pages', keyData);
        //socket.emit('/instagram/related/hashtags', keyData);
    });
};










socket.on('return/google/interest/over/time', function(data){
    data = JSON.parse(data);
    socket.emit('/google/times', keyData);
    socket.emit('/google/summary', keyData);
    for(var key in data){
        resultData.google[key] = resultData.google[key]||{};
        resultData.google[key].interestOverTime = data[key];
    }
    
});








socket.on('return/google/summary', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.google[key] = resultData.google[key]||{};
        resultData.google[key].summary = datad[key];
    }
});






socket.on('return/google/times', function(times){
    times = JSON.parse(times);
    var data = {};
    for(var key in times){
        resultData.google[key] = resultData.google[key]||{};
        resultData.google[key].times = times[key];
        data[key] = resultData.google[key].interestOverTime;
    }
    $keywordState="%combined%";
    nameState="google";
    titleState="interestOverTime";
    setCombinedNumberSummary(nameState);
    setCombinedLinkedProgressBar(titleState);
    $(".campaign_performance").attr({href:"#%combined%"});
    drawMultiBars(nameState, titleState, data, times);
});






socket.on('return/google/interest/by/region', function(data){
    data = JSON.parse(data);
    $("#google_interest_by_region_summary").text(data);
});





var ovKS = new KSelector("overview");
var ovRelatedHtml = ovKS.relatedContainer();
var ovChosenHtml = ovKS.chosenContainer();




function pretify(checkbox){
    checkbox.attr("where", "related");
    checkbox.addClass("badge");
    checkbox.css({margin: "1px 1px 1px 1px"});
    checkbox.addClass("badge-info");
}



var gtype = ["topics", "queries"];
var gKS = new KSelector("google");
var gStoreHtml = $("#google_chosen_keywords_li").find("ul");
var gchosenHtml = gKS.chosenContainer();
gtype.forEach(function(type){
    var grelatedHtml = gKS.relatedContainer();
    
    socket.on('return/google/related/'+type, function(data){
        data = JSON.parse(data).default.rankedList[0].rankedKeyword;
        grelatedHtml.find("a").remove();
        data.forEach(function(d){
            var checkbox = null;
            var clone = null;
            var ovbox = null;
            if(type === "topics") {
                checkbox = $("<a href='#"+d.topic.title+"' style='padding:15px'>"+d.topic.title+"</a>");
                ovbox = $("<a href='#"+d.topic.title+"' style='padding:15px'>Google: "+d.topic.title+"</a>");
                clone = $("<a href='#"+d.topic.title+"'>"+d.topic.title+"</a>");
            }
            else {
                checkbox = $("<a href='#"+d.query+"' style='padding:15px'>"+d.query+"</a>");
                ovbox = $("<a href='#"+d.query+"' style='padding:15px'>Google: "+d.query+"</a>");
                clone = $("<a href='#"+d.query+"'>"+d.query+"</a>");
            }
            pretify(checkbox);
            pretify(ovbox);
            grelatedHtml.append(checkbox);
            var li = $("<li>");
            checkbox.click(function(e){
                if(checkbox.attr("where") === "related"){
                    checkbox.attr("where", "chosen");
                    checkbox.removeClass("badge-info");
                    checkbox.addClass("badge-success");
                    gchosenHtml.append(checkbox);
                    ovRelatedHtml.append(ovbox);
                    li.append(clone);
                    gStoreHtml.append(li);
                }else{
                    checkbox.attr("where", "related");
                    checkbox.removeClass("badge-success");
                    checkbox.addClass("badge-info");
                    ovbox.remove();
                    grelatedHtml.prepend(checkbox);
                    li.remove();
                }
            });
        });
    });
});



function loadGoogle(){
    var spans = $("#google_keywords_selector .chosen_keywords").find("a");
    var keywords = [];
    for(var i = 0; i < spans.length; i++){
       keywords.push(spans.eq(i).text());
    }
    keyData.google.keyword = keywords;
    socket.emit('/google/interest/over/time', keyData);
    socket.emit('/google/interest/by/region', keyData);
}



$("#google_initialise_button").click(function(e){
    loadGoogle();
});









socket.on('return/facebook/posts', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].activity = datad[key];
    }
});










socket.on('return/facebook/likes', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].likes = datad[key];
    }
});










socket.on('return/facebook/comments', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].comments = datad[key];
    }
});










socket.on('return/facebook/shares', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].shares = datad[key];
    }
});








socket.on('return/facebook/likespp', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].reactivity = datad[key];
    }
    
});








socket.on('return/facebook/commentspp', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].engagement =datad[key];
    }
    
});






socket.on('return/facebook/sharespp', function(datad){
    socket.emit('/facebook/times', keyData);
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].virality = datad[key];
    }
    socket.on('return/facebook/times', function(times){
        times = JSON.parse(times);
        for(var key in times){
            resultData.facebook[key].times = times[key];
        }
        socket.emit('/facebook/summary', keyData);
        socket.on('return/facebook/summary', function(summary){
            summary = JSON.parse(summary);
            for(var key in datad){
                resultData.facebook[key]=resultData.facebook[key]||{}
                resultData.facebook[key].summary = summary[key];
            }
            keywordState="%combined%";
            nameState="facebook";
            titleState="Virality";
            setCombinedNumberSummary(nameState);
            setCombinedLinkedProgressBar(titleState);
            $(".campaign_performance").attr({href:"#%combined%"});
            drawMultiBars(nameState, titleState, datad, times);
        });
    });
    
});





socket.on('return/facebook/reaction_timespp', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{}
        resultData.facebook[key].reaction_time = datad[key];
    }
    
});




socket.on('return/facebook/likesppv', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{};
        resultData.facebook[key].reactivityV = datad[key];
    }
    
});




socket.on('return/facebook/commentsppv', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{};
        resultData.facebook[key].engagementV = datad[key];
    }
    
});



socket.on('return/facebook/sharesppv', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{};
        resultData.facebook[key].viralityV = datad[key];
    }
    
});




socket.on('return/facebook/reaction_timesppv', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.facebook[key]=resultData.facebook[key]||{};
        resultData.facebook[key]["reaction time V"] = datad[key];
    }
});

















var fbtype = ["pages"];
var fbStoreHtml = $("#facebook_chosen_keywords_li").find("ul");
var fbKS = new KSelector("facebook");
var fbchosenHtml = fbKS.chosenContainer();
fbtype.forEach(function(type){
    socket.on('return/facebook/related/'+type, function(data){
        var fbrelatedHtml = fbKS.relatedContainer();
        data = JSON.parse(data);
        fbrelatedHtml.find("a").remove();
        data.forEach(function(d){
            var checkbox = null;
            var fan_count = "<span style='color:green'>"+d.fan_count+"</span>";
            var checkins = "<span style='color:blue'>"+d.checkins+"</span>";
            var talking_about_count = "<span>"+d.talking_about_count+"</span>";
            var image = "<img style='height:25px' src='"+d.picture.data.url+"' />";
            var name = "<span >"+d.name+"</span>";
            checkbox = $("<a href='#"+d.name+"' id='"+d.id+"' value='"+d.name+"'>"+image+name+fan_count+"</a>");
            var clone = $("<a href='#"+d.name+"' id='"+d.id+"' value='"+d.name+"'>"+image+name+"</a>");
            checkbox.attr("where", "related");
            checkbox.addClass("badge");
            checkbox.css({margin: "1px 1px 1px 1px"});
            checkbox.addClass("badge-info");
            fbrelatedHtml.append(checkbox);
            var li = $("<li>");
            checkbox.click(function(e){
                if(checkbox.attr("where") === "related"){
                    checkbox.attr("where", "chosen");
                    checkbox.removeClass("badge-info");
                    checkbox.addClass("badge-success");
                    fbchosenHtml.append(checkbox);
                    li.append(clone);
                    fbStoreHtml.append(li);
                }else{
                    checkbox.attr("where", "related");
                    checkbox.removeClass("badge-success");
                    checkbox.addClass("badge-info");
                    fbrelatedHtml.prepend(checkbox);
                    li.remove();

                }
            });
        });
    });
});




function loadFacebook(){
    var spans = $("#facebook_keywords_selector .chosen_keywords").find("a");
    var keywords = {};
    for(var i = 0; i < spans.length; i++){
        var href = spans.eq(i).attr("href");
        var word = href.substring(href.indexOf("#")+1);
        var keyy = spans.eq(i).attr('id');
       keywords[keyy]= word;
    }
    keyData.facebook.keywords = keywords;
    socket.emit('/facebook/initialise', keyData);
    socket.on('return/facebook/initialise', function(data){
        socket.emit('/facebook/posts', keyData);
        socket.emit('/facebook/likes', keyData);
        socket.emit('/facebook/comments', keyData);
        socket.emit('/facebook/shares', keyData);
        socket.emit('/facebook/likespp', keyData);
        socket.emit('/facebook/commentspp', keyData);
        socket.emit('/facebook/sharespp', keyData);
        socket.emit('/facebook/reaction_timespp', keyData);
        socket.emit('/facebook/likesppv', keyData);
        socket.emit('/facebook/commentsppv', keyData);
        socket.emit('/facebook/sharesppv', keyData);
        socket.emit('/facebook/reaction_timesppv', keyData);
        
    });
}



$("#facebook_initialise_button").click(function(e){
    loadFacebook();
});


















socket.on('return/twitter/tweets', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].activity = datad[key];
    }
});




socket.on('return/twitter/retweets', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].retweets = datad[key];
    }
});




socket.on('return/twitter/favourites', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].favourites = datad[key];
    }
});



socket.on('return/twitter/retweetspp', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].virality = datad[key];
    }
    socket.on('return/twitter/times', function(times){
        times = JSON.parse(times);
        for(var key in times){
            resultData.twitter[key].times = times[key];
        }
        $keywordState="%combined%";
        nameState="twitter";
        titleState="Virality";
        setCombinedNumberSummary(nameState);
        setCombinedLinkedProgressBar(titleState);
        $(".campaign_performance").attr({href:"#%combined%"});
        drawMultiBars(nameState, titleState, datad, times);
    });
});




socket.on('return/twitter/favouritespp', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].reactivity = datad[key];
    }
});



socket.on('return/twitter/retweetsppv', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].viralityv = datad[key];
    }
});




socket.on('return/twitter/favouritesppv', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].reactivityv = datad[key];
    }
});




socket.on('return/twitter/summary', function(datad){
    datad = JSON.parse(datad);
    for(var key in datad){
        resultData.twitter[key] = resultData.twitter[key]||{};
        resultData.twitter[key].summary = datad[key];
    }
    setCombinedNumberSummary("twitter");
    setCombinedLinkedProgressBar(titleState);
});



socket.on("return/twitter/progress", function(data){
    console.log(data);
});






var twtype = ["hashtags", "pages"];
var twKS = new KSelector("twitter");
var twStoreHtml = $("#twitter_chosen_keywords_li").find("ul");
var twchosenHtml = twKS.chosenContainer();
twtype.forEach(function(type){
    var twrelatedHtml = twKS.relatedContainer();
    socket.on('return/twitter/related/'+type, function(data){
        twrelatedHtml.find("a").remove();
        data = JSON.parse(data);
        data.forEach(function(d){
            var checkbox = null;
            var ovbox = null;
            var followers = "<span style='color:green'>"+d.followers_count+"</span>";
            var image = "<img src='"+d.profile_image_url+"' style='height:25px'/>";
            //var name = "<span>"+d.name+"</span>";
            checkbox = $("<a href='#"+d.name+"' style='padding:10px' id='"+d.id+"'>"+image+" "+d.name+" "+followers+"</a>");
            ovbox = $("<a href='#"+d.name+"' style='padding:10px' id='"+d.id+"'>Twitter: "+image+" "+d.name+" "+followers+"</a>");
            var clone = $("<a href='#"+d.name+"' style='padding:10px' id='"+d.id+"'>"+image+" "+d.name+"</a>");
            clone.find("img").css({height:"25px"});
            pretify(checkbox);
            pretify(ovbox);
            twrelatedHtml.append(checkbox);
            var li = $("<li>");
            checkbox.click(function(e){
                if(checkbox.attr("where") === "related"){
                    checkbox.attr("where", "chosen");
                    checkbox.removeClass("badge-info");
                    checkbox.addClass("badge-success");
                    li.append(clone);
                    twStoreHtml.append(li);
                    twchosenHtml.append(checkbox);
                    ovRelatedHtml.append(ovbox);
                    twrelatedHtml.remove(checkbox);
                }else{
                    checkbox.attr("where", "related");
                    checkbox.removeClass("badge-success");
                    checkbox.addClass("badge-info");
                    ovbox.remove();
                    twrelatedHtml.prepend(checkbox);
                    twStoreHtml.remove(li);
                    twchosenHtml.remove(checkbox);
                }
            });
        });
    });
});




function loadTwitter(){
    var spans = $("#twitter_keywords_selector .chosen_keywords").find("a");
    var keywords = [];
    for(var i = 0; i < spans.length; i++){
        var href = spans.eq(i).attr("href");
        var text = href.substring(href.indexOf("#")+1);
        var keyword = {
            text:text,
            id:spans.eq(i).attr("id")
        };     
        keywords.push(keyword);
    }
    keyData.twitter.keywords = keywords;
    keyData.twitter.count = 5;
    socket.emit('/twitter/initialise', keyData);
    socket.on('return/twitter/initialise', function(data){
        socket.emit('/twitter/tweets', keyData);
        socket.emit('/twitter/retweets', keyData);
        socket.emit('/twitter/favourites', keyData);
        socket.emit('/twitter/retweetspp', keyData);
        socket.emit('/twitter/favouritespp', keyData);
        socket.emit('/twitter/retweetsppv', keyData);
        socket.emit('/twitter/favouritesppv', keyData);
        socket.emit('/twitter/summary', keyData);
        socket.emit('/twitter/times', keyData);
    });
    socket.on('return/twitter/hashtags/ready', function(data){
        socket.emit("/twitter/hashtags", keyData);
    });
}



$("#twitter_initialise_button").click(function(e){
    loadTwitter();
});






var keywordsDisplay = $("#keywords_editor_display");
var resultsDisplay = $("#result_display");
var settingsDisplay = $("#settings_display");

$("#keywords_editor_display_btn").click(function(e){
    setMainView(false, true, false);
});




$("#results_display_btn").click(function(e){
    setMainView(true, false, false);
});




$("#settings_display_btn").click(function(e){
    setMainView(false, false, true);
});


function setMainView(drDS, keDS, sDS){
    if(drDS){
        setResultsDisplay(true);
        setKeywordsDisplay(false);
        setSettingsDisplay(false);
    }
    else if(keDS){
        setResultsDisplay(false);
        setKeywordsDisplay(true);
        setSettingsDisplay(false);
    }
    else if(sDS){
        setResultsDisplay(false);
        setKeywordsDisplay(false);
        setSettingsDisplay(true);
    }
}


function setKeywordsDisplay(state){
    if(state){
        keywordsDisplay.removeClass("hidden");
        keywordsDisplay.addClass("visible");
    }
    else{
        keywordsDisplay.removeClass("visible");
        keywordsDisplay.addClass("hidden");
    }
}

function setSettingsDisplay(state){
    if(state){
        settingsDisplay.removeClass("hidden");
        settingsDisplay.addClass("visible");
    }
    else{
        settingsDisplay.removeClass("visible");
        settingsDisplay.addClass("hidden");
    }
    
}

function setResultsDisplay(state){
    if(state){
        resultsDisplay.removeClass("hidden");
        resultsDisplay.addClass("visible");
    }
    else{
        resultsDisplay.removeClass("visible");
        resultsDisplay.addClass("hidden");
    };
}


$("#load_data_btn").click(function(e){
    setMainView(true, false, false);
    drawBars("AnalyticUs", "VISUALISATION", [], [], "nothing");
    loadGoogle();
    loadTwitter();
    loadFacebook();
});



$("#back_data_btn").click(function(e){
    setMainView(true, false, false);
});


$("#back_state_btn").click(function(e){
    setMainView(true, false, false);
});


$("#save_state_btn").click(function(e){
    //setMainView(true, false, false);
});












$(".graph_loader").click(function(e){
    var name = $(this).attr("name");
    if(name !== "audience"){
        var isActive = $(this).hasClass("active");
        if(!isActive){
            initActiveGL.removeClass("active");
            initActiveGL = $(this);
            initActiveGL.addClass("active");
            var name = nameState;
            var keyword = keywordState;
            var titleH = initActiveGL.attr("href");
            var title = titleH.substring(titleH.indexOf("#")+1);
            titleState = title;
            if(name==="google"){
                title="interestOverTime";
            }
            else if(name !== "google" && title==="interestOverTime"){
                title="virality";
            }
            if(keyword === "%combined%"){
                var data = getCombinedDataPoints(name, title);
                var time = getCombinedDataTimes(name);
                drawMultiBars(name, title, data, time);
                setCombinedLinkedProgressBar(title);
            }
            else {
                var data = resultData[name][keyword][title];
                var time = resultData[name][keyword].time;
                setLinkedProgressBar(name, keyword, title);
                console.log(data);
                drawBars(name+" "+keyword, title, data, time, keyword);
            }
        }
    }
    else{
        return false;
    }
        
});




function getCombinedDataPoints(name, title){
    var data = {};
    for(var keyword in resultData[name]){
        data[keyword] = resultData[name][keyword][title];
    }
    return data;
}


function getCombinedDataTimes(name){
    var data = {};
    for(var keyword in resultData[name]){
        data[keyword] = resultData[name][keyword].times;
    }
    return data;
}




$(".campaign_performance").click(function(e){
    var isActive = $(this).hasClass("active");
    if(!isActive){
        initActiveCP.removeClass("active");
        initActiveCP = $(this);
        initActiveCP.addClass("active");
        var title = titleState;
        if(keywordState === "%combined%"){
            var nameH = initActiveCP.attr("href");
            var name = nameH.substring(nameH.indexOf("#")+1);
            name = name.substring(name.indexOf("_")+1);
            nameState = name;
            if(name==="google"){
                title="interestOverTime";
            }
            else if(name !== "google" && title==="interestOverTime"){
                title="virality";
            }
            titleState = title;
            var data = getCombinedDataPoints(name, title);
            var time = getCombinedDataTimes(name);
            setCombinedNumberSummary(name);
            drawMultiBars(name, title, data, time);
        }
        else{
            var linkedKey = findLink(keywordState, nameState);
            var nameH = initActiveCP.attr("href");
            var name = nameH.substring(nameH.indexOf("#")+1);
            name = name.substring(name.indexOf("_")+1);
            nameState = name;
            keyword = linkedData[linkedKey][name];
            keywordState = keyword;
            var data = {};
            var time = {};
            if(name==="link_google"){
                title="interestOverTime";
            }
            else if(name !== "link_google" && title==="interestOverTime"){
                title="virality";
            }
            titleState = title;
            data = resultData[name][keyword][title]||[];
            time = resultData[name][keyword].time||[];
            summary = resultData[name][keyword].summary;
            setNumberSummary(name, summary);
            drawBars(name+" "+keyword, title, data, time, keyword);
            console.log(name);
            console.log(title);
            console.log(keyword);
            console.log(data); 
        }
    }
        
        
        
});



function findLink(query, name){
    for(var keyword in linkedData){
        if(linkedData[keyword][name] === query){
            return keyword;
        }
    }
}




function getLink(keyword, name){
    return linkedData[keyword][name];
}



$(".platform").click(function(e){
    var isActive = $(this).hasClass("active");
    keywordState="%combined%";
    if(!isActive){
        initActiveP.removeClass("active");
        initActiveP = $(this);
        initActiveP.addClass("active");
        var title = titleState;
        var nameH = initActiveP.attr("href");
        var name = nameH.substring(nameH.indexOf("#")+1);
        nameState = name;
        keywordSate = "%combined%";
        var data = {};
        var time = {};
        if(name==="google"){
            title="interestOverTime";
        }
        else if(name !== "google" && title==="interestOverTime"){
            title="virality";
        }
        titleState = title;
        for(var keyword in resultData[name]){
            data[keyword] = resultData[name][keyword][title];
            time[keyword] = resultData[name][keyword].times;
        }
        setCombinedNumberSummary(name);
        setCombinedLinkedProgressBar(title);
        drawMultiBars(name, title, data, time);
    }
    
});





$(document).on("click", ".platform+ul > li", function(e){
    initActiveK.removeClass("active");
    initActiveK = $(this);
    initActiveK.addClass("active");
    $(".platform").removeClass("active");
    var href = initActiveK.find("a").attr("href");
    var keyword = href.substring(href.indexOf("#")+1);
    var title = titleState;
    var name = nameState;
    keywordState = keyword;
    if(name==="google"){
        title="interestOverTime";
    }
    else if(name !== "google" && title==="interestOverTime"){
        title="virality";
    }
    titleState = title;
    data = resultData[name][keyword][title];
    time = resultData[name][keyword].times;
    var summary = resultData[name][keyword].summary;
    drawBars(name+" "+keyword, title, data, time, keyword);
    setNumberSummary(name, summary);
    setLinkedProgressBar(name, keyword, title);
});






function setNumberSummary(name, summary){
    var virality = $("#title_virality_summary");
    var reactivity = $("#title_reactivity_summary");
    var activity = $("#title_activity_summary");
    var engagement = $("#title_engagement_summary");
    var reaction_time = $("#title_reaction_time_summary");
    if(name === "twitter"){
        virality.css({display:"inline-block"});
        reactivity.css({display:"inline-block"});
        activity.css({display:"inline-block"});
        engagement.css({display:"none"});
        reaction_time.css({display:"none"});
    }
    else if(name === "google"){
        virality.css({display:"none"});
        reactivity.css({display:"none"});
        activity.css({display:"none"});
        engagement.css({display:"none"});
        reaction_time.css({display:"inline-block"});
        reaction_time.find(".picker").text("Average Interest");
    }
    else{
        virality.css({display:"inline-block"});
        reactivity.css({display:"inline-block"});
        activity.css({display:"inline-block"});
        engagement.css({display:"inline-block"});
        reaction_time.css({display:"inline-block"});
        reaction_time.find(".picker").text("Average Reaction Time");
    }
    
    for(var title in summary){
        var holder = null;
        if(title === "interestOverTime"){
            
            holder1 = $(".graph_loader");
            //holder1.find(".count").animateNumber({ number: 0000 });
            //holder1.find(".picker_small").animateNumber({ number:  0 });
            holder1.find(".count").text(0000);
            holder1.find(".picker_small").text(0);
            holder = $(".graph_loader[href='#reaction_time']");
        }
        else holder = $(".graph_loader[href='#"+title+"']");
        //holder.find(".count").animateNumber({ number: summary[title].mean });
        //holder.find(".picker_small").animateNumber({ number: Math.abs(Number(summary[title].last)) });
        holder.find(".count").text(Math.round(Number(summary[title].mean)));
        if(title !== "audience"){
            holder.find(".picker_small").text(Math.round(Math.abs(Number(summary[title].last))));
            var x = holder.find(".count_bottom > i");
            var y = holder.find(".count_bottom > i > i");
            x.removeClass("green");
            x.removeClass("red");
            y.removeClass("fa-sort-asc");
            y.removeClass("fa-sort-desc");
            if(Number(summary[title].last) > 0 ) {
                x.addClass("green");
                y.addClass("fa-sort-asc");
            }
            else {
                x.addClass("red");
                y.addClass("fa-sort-desc");
            }
        }
        
            
    }
}








function setCombinedNumberSummary(name){
    var summary = getCombinedNumberSummary(name);
    setNumberSummary(name, summary);
}




function getCombinedNumberSummary(name){
    var newSummary = {};
    var counter = 0;
    var summary = {};
    for(var keyword in resultData[name]){
        counter++;
        summary[keyword] = resultData[name][keyword].summary;
        for(var title in summary[keyword]){
            newSummary[title]=newSummary[title]||{};
            newSummary[title].mean = newSummary[title].mean||0;
            newSummary[title].mean+=summary[keyword][title].mean;
            newSummary[title].deviation = newSummary[title].deviation||0;
            newSummary[title].deviation+=Math.pow(summary[keyword][title].deviation, 2);
            newSummary[title].last = newSummary[title].last||0;
            newSummary[title].last+=(summary[keyword][title].last/100)*summary[keyword][title].mean;
        }
    };
    for(var title in newSummary){
        newSummary[title].last = (newSummary[title].last/newSummary[title].mean)*100;
        newSummary[title].mean = newSummary[title].mean/counter;
        newSummary[title].deviation = Math.sqrt(newSummary[title].deviation/counter);
    }
    return newSummary;
}







function setCombinedLinkedProgressBar(title){
    var summary = {};
    var audience = {};
    for(var name in resultData){
        var combined = getCombinedNumberSummary(name);
        summary[name] = combined[title];
        audience[name] = combined["audience"];
    }
    setProgressBar(summary, audience);
}







function setLinkedProgressBar(name, keyword, title){
    var link = findLink(keyword, name);
    if(link){
        var summary = getLinkedNumberSummary(name, link, title);
        var audience = getLinkedAudience(link);
        setProgressBar(summary, audience);
    }
    
}


function getLinkedAudience(keyword){
    var audience = {};
    for(var name in resultData){
        var keyW = linkedData[keyword][name];
        audience[name] = resultData[name][keyW].summary["audience"];
    }
    return audience;
}




function getLinkedNumberSummary(name, keyword, title){
    var summary = {};
    for(var name in resultData){
        var keyW = linkedData[keyword][name];
        summary[name] = resultData[name][keyW].summary[title];
    }
    return summary;
}





function getNumberSummary(name, keyword, title){
    return resultData[name][keyword].summary[title];
}




function setProgressBar(stats, tot){
    for(var key in stats){
        if(key !== "overview"){
             var el = $("[href='#link_"+key+"']").find(".progress-bar");
            el.css({"width":stats[key]?stats[key].mean:0});
            el.attr({"aria-valuenow":stats[key]?stats[key].mean:0});
        }
    }
};








var ovModal = new Modal("ov_modal");
ovModal.init();
ovModal.title().text("Combine Campaign");
$("#edit_combined_campaign").click(function(e){
    ovModal.body().append("HELLO");
    ovModal.show();
});


function ovModal(){
    
    var button ="<button type=\"button\" class=\"btn btn-default\" id='ov_modal_create_another'>CREATE ANOTHER GROUP</button>";
    "<button type=\"button\" class=\"btn btn-default\" id='ov_modal_finished' data-dismiss=\"modal\">FINISHED</button>";
    
    ovModal.footer();
    
    
    var fbLHtml = $();
    var gLHtml = $();
    var twLHtml = $();
    
    
    var keywordsHtmlHolder;
    var groupName;
    
    function getGroupName(){
        
    }
    
    
    $().click(function(e){
        var keyHtml = $(this);
        var keyword = getKeyword(keyHtml);
        var groupName = getGroupName();
        linkKeyword(groupName, name, keyword);
        deactivate(groupName, name);
        prependToOverView(groupName);
    });
    
    
    function startLinking(){
        var keywords = getKeywords();
        var titleKeyword = groupName;
        for(var name in keywords){
            linkedData[titleKeyword]=linkedData[titleKeyword]||{};
            linkedData[titleKeyword][name]=keywords[name];
        }
    }
    
    
    $("#ov_modal_create_another").click(function(e){
        startLinking();
        
    });
    
    $("#ov_modal_finished").click(function(e){
        startLinking();
    });
};


$("#overview_modal").click(function(e){
    ovModal.body().append("HELLO");
    ovModal.show();
});







var escModal = new Modal("esc_modal");
escModal.init();
escModal.title().text("Score Comparison");
$("#edit_score_comparison").click(function(e){
    escModal.body().append("Hello");
    escModal.show();
});





function fullscreen(){
    
}
