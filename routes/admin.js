var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/bidderList', function (req, res, next) {
    var query = { type: "bidder" };
    req.db.collection("user").find(query).toArray(function (err, result) {
        if (err)
            res.json({});
        else {
            console.log(result);
            res.json(result);
        }
    });
});

router.post('/sellerList', function (req, res, next) {
    var query = { type: "auctioner" };
    req.db.collection("user").find(query).toArray(function (err, result) {
        if (err) {
            console.log(err);
            res.json({});
        }
        else {
            res.json(result);
        }
    });
});



module.exports = router;