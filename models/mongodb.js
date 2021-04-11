var ObjectID = require('mongodb').ObjectID;


exports.insert = function (req, tName, data, cb) {
    req.db.collection(tName).insertOne(data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.update = function (req, tName, query, data, cb) {
    req.db.collection(tName).updateOne(query, data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.findOne = function (req, tName, data, cb) {
    req.db.collection(tName).findOne(data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.find = function (req, tName, data, cb) {
    req.db.collection(tName).find(data).toArray(function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}