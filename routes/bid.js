var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb');
var moment = require('moment');
var _ = require('underscore');


router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/bid', function (req, res, next) {
    var obj = req.body;
    var date = new Date()
    obj.date = moment(date, 'YYYY-MM-DD').format("DD-MM-YYYY")
    obj.time = moment(date, 'YYYY-MM-DD HH:mm:ss').format("h:mm A")
    req.db.collection("bid").insertOne(obj, function (err, r) {
        if (err) {
            res.json({ ack: false });
        }
        else
            res.json({ ack: true });
    });
});

router.post('/bidUpdate', function (req, res, next) {
    if (req.body._id != null) {
        var _id = ObjectID(req.body._id);
        var obj = req.body;
        delete obj._id;
        var myquery = { _id: _id };
        var newvalues = { $set: obj };
        req.db.collection("bid").updateOne(myquery, newvalues, function (err, r) {
            if (err)
                res.json({ ack: false });
            else
                res.json({ ack: true });
        });
    } else res.json({ ack: false });
});

router.post('/bidRemove', function (req, res, next) {
    var _id = ObjectID(req.body._id);
    var myquery = { _id: _id };
    mongodb.remove(req, "bid", myquery, function (err, result) {
        if (err) {
            console.log(err);
            res.json({ status: false });
        }
        else
            res.json({ status: true });
    })
});

router.post('/productBid', function (req, res, next) {
    var query = { productId: req.body.productId };
    mongodb.find(req, "user", query, function (err, result) {
        if (err) res.json({});
        else {
            console.log(result);
            res.json(result);
        }
    })
});

router.post('/bidListByDate', function (req, res, next) {
    mongodb.find(req, "bid", {}, function (err, result) {
        if (err) res.json({});
        else {
            result = _.groupBy(result, 'date')
            res.json(result);
        }

    })
})

module.exports = router;
