var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/list', function (req, res, next) {
    var query = { role: req.body.role };
    mongodb.find(req, "user", query, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});

router.post('/update', function (req, res, next) {
    if (req.body._id != null) {
        var _id = ObjectID(req.body._id);
        var obj = req.body;
        delete obj._id;
        var myquery = { _id: _id };
        var newvalues = { $set: obj };
        mongodb.update(req, "user", myquery, newvalues, function (err, result) {
            if (err) {
                res.json({ status: false });
            }
            else
                res.json({ status: true, isVerified: req.body.isVerified });
        })
    } else res.json({ status: false });
});

router.post('/tableDrop', function (req, res, next) {
    if (req.body.tableName) {
        mongodb.drop(req, req.body.tableName, function (err, result) {
            if (err) {
                res.json({ status: false });
            }
            else
                res.json({ status: true });
        })
    } else res.json({ status: false });
});

module.exports = router;