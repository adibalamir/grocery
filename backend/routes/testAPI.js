var express = require("express");
var cors = require('cors');
var router = express.Router();

router.get("/", cors(), function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.send("API is working properly");
});

module.exports = router;