var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/bidderList', function (req, res, next) {
    var query = { type: "bidder" };
    mongodb.find(req, "user", query, function (err, result) {
        if (err) res.json({});
        else {
            console.log(result);
            res.json(result);
        }
    })
});

router.post('/sellerList', function (req, res, next) {
    var query = { type: "auctioner" };
    mongodb.find(req, "user", query, function (err, result) {
        if (err) res.json({});
        else {
            console.log(result);
            res.json(result);
        }
    })
});



module.exports = router;