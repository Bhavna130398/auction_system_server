var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/list', function (req, res, next) {
    // var query = { role: "bidder" };
    var query = { role: req.body.role };
    console.log(query);
    mongodb.find(req, "user", query, function (err, result) {
        if (err) res.json({});
        else {
            console.log(result);
            res.json(result);
        }
    })
});

// router.post('/sellerList', function (req, res, next) {
//     var query = { role: "auctionar" };
//     mongodb.find(req, "user", query, function (err, result) {
//         if (err) res.json({});
//         else {
//             console.log(result);
//             res.json(result);
//         }
//     })
// });



module.exports = router;