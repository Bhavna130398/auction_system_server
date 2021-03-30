var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  //var obj ={ Name: '', Email: '', Gender: '', DOB: '', Mobile_no: '', Address : '', State: '', Country: '', PinCode: '', Bidcoin : '', Date: '', IsVerified: '', Username: '', Password: '', type: ''}
  var obj = req.body;
  req.db.collection("user").insertOne(obj, function (err, r) {
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
    req.db.collection("user").updateOne(myquery, newvalues, function (err, r) {
      if (err)
        res.json({ ack: false });
      else
        res.json({ ack: true });
    });
  } else res.json({ ack: false });
});

router.post('/login', function (req, res, next) {
  if (req.body.username != null && req.body.password != null) {
    var query = { username: req.body.username, password: md5(req.body.password) };
    req.db.collection("user").findOne(query, function (err, result) {
      if (err)
        res.json({});
      else {
        if (result != null && req.body.username == result.username && md5(req.body.password) == result.password) {
          delete result.password;
          res.json(result);
        } else res.json({});
      }
    });
  } else res.json({});
});
module.exports = router;
