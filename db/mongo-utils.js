/**
 * Created by developer on 09.10.2016.
 */
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var dbUri = process.env.MONGODB_URI || 'mongodb://heroku_k25q42w8:8sb1vuvs1995sn31qr7u7df7n0@ds035036.mlab.com:35036/heroku_k25q42w8';
var _db;

module.exports = {
  connect: function () {
    client.connect(dbUri, function (err, db) {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      _db = db;
      console.log('Connected to MongoDB');
    })
  },
  locations: function () {
    return _db.collection('locations');
  }
};
