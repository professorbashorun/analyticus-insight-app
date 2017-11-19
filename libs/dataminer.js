/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var request = require("request");


var DataMiner = function(){
    
    var $this = this;
   
    function get(url, conf, callback){
        request(url, callback);
    }
   
   return $this;
};

module.exports = DataMiner();