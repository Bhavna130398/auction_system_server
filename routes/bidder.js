var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.post('/add', function (req, res, next) {
    var obj = req.body;
    req.db.collection("bidder").insertOne(obj, function (err, r) {
        if (err) {
            res.json({ ack: false });
        }
        else
            res.json({ ack: true });
    });
});

router.post('/update', function (req, res, next) {
    if (req.body._id != null) {
        var _id = ObjectID(req.body._id);
        var obj = req.body;
        delete obj._id;
        var myquery = { _id: _id };
        var newvalues = { $set: obj };
        req.db.collection("bidder").updateOne(myquery, newvalues, function (err, r) {
            if (err)
                res.json({ ack: false });
            else
                res.json({ ack: true });
        });
    } else res.json({ ack: false });
});

module.exports = router;