var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
    var dir = path.join(__dirname,"/../public/login.html");
    res.sendFile(dir);
});



module.exports = router;
