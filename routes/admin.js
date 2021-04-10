var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/bidderList', function (req, res, next) {
    req.db.collection("bidder").findOne({}, function (err, result) {
        if (err)
            res.json({});
        else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/sellerList', function (req, res, next) {
    req.db.collection("seller").findOne({}, function (err, result) {
        if (err)
            res.json({});
        else {
            res.json(result);
        }
    });
});


module.exports = router;