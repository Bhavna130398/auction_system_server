var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/addProduct', function (req, res, next) {
    var body = req.body.image;
    base64Data = body.replace(/^data:image\/jpeg;base64,/, "");
    delete req.body.image
    var obj = req.body;
    mongodb.insert(req, "product", obj, function (err, r) {
        if (err) {
            res.json({ ack: false });
        }
        else {
            console.log(r.insertedId);
            fs.writeFile('./public/images/' + r.insertedId + ".jpeg", base64Data, 'base64', function (err) {
                if (err) {
                    res.json({ status: false })
                }
                else res.json({ status: true })
            })
        }
    })

    /* req.db.collection("product").insertOne(obj, function (err, r) {
        if (err) {
            res.json({ ack: false });
        }
        else {
            console.log(r.insertedId);
            fs.writeFile('./public/images/' + r.insertedId + ".jpeg", base64Data, 'base64', function (err) {
                if (err) {
                    res.json({ status: false })
                }
                else res.json({ status: true })
            })
        }

    }); */
});

module.exports = router;