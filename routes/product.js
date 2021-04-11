var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var mongodb = require('../models/mongodb')


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/addProduct', function (req, res, next) {
    var body = req.body.image;
    base64Data = body.replace(/^data:image\/jpeg;base64,/, "");
    delete req.body.image
    var obj = req.body;
    mongodb.insert(req, "product1", obj, function (err, r) {
        if (err) {
            res.json({ status: false });
        }
        else {
            try {
                fs.writeFile('./public/images/' + r.insertedId + ".jpeg", base64Data, 'base64', function (err) {
                    if (err) {
                        console.log(err)
                        res.json({ status: false })
                    }
                    else res.json({ status: true })
                })
            }
            catch (e) {
                console.log(e);
            }

        }
    })
});

router.post('/editProduct', function (req, res, next) {
    if (req.body._id) {
        if (req.body.image) {
            var body = req.body.image;
            base64Data = body.replace(/^data:image\/jpeg;base64,/, "");
            delete req.body.image
            fs.writeFile('./public/images/' + req.body._id + ".jpeg", base64Data, 'base64', function (err) {
                if (err) {
                    console.log(err)
                    return res.json({ status: false })
                }
            })
        }
        var _id = ObjectID(req.body._id);
        var obj = req.body;
        delete obj._id;
        var myquery = { _id: _id };
        var newvalues = { $set: obj };
        var obj = req.body;
        mongodb.update(req, "product", myquery, newvalues, function (err, r) {
            if (err) {
                res.json({ status: false });
            }
            else {
                res.json({ status: true })
            }
        })
    }
});
router.post('/removeProduct', function (req, res, next) {
    var _id = ObjectID(req.body._id);
    var myquery = { _id: _id };
    mongodb.remove(req, "product", myquery, function (err, result) {
        if (err) {
            console.log(err);
            res.json({ status: false });
        }
        else
            res.json({ status: true });
    })
});

router.post('/listProduct', function (req, res, next) {
    if (req.body.role != null && req.body._id != null) {
        if (req.body.role == 'auctionar') {
            query['Auctioner_Id'] = req.body._id
        }
        mongodb.find(req, "product", query, function (err, result) {
            if (err) {
                console.log(err);
                res.json([]);
            }
            else
                res.json(result);

        })
    } else res.json([]);
});


module.exports = router;