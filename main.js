/**
 * Created by developer on 19.09.2016.
 */
'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

var PORT = process.env.PORT || 8080;
var DIST_DIR = path.resolve(__dirname, 'dist');

var FOOD_TRUCKS_API_URL = 'https://www.food-trucks-deutschland.de/api/locations/getTours.json';

var app = express();
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.use(bodyParser.json());

app.use('/', express.static(DIST_DIR));
app.get('*', function(req, res) {
  return res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.post('/api/food-trucks', parseUrlEncoded, function(req, res) {
  var body = req.body;

  console.log('POST on /api/food-trucks', body);

  var date = body.date || 'today';
  var latitude = body.latitude || -1;
  var longitude = body.longitude || -1;
  var radius = body.radius || 30;

  request
    .post(FOOD_TRUCKS_API_URL, {
      'auth': {
        'username': 'token',
        'password': '35f17d7d492347017ec251ab4098c342'
      }
    })
    .form({
      date: date,
      latitude: latitude,
      longitude: longitude,
      radius: radius
    })
    .pipe(res);
});

app.listen(PORT, function() {
  console.log('app listening on port: ' + this.address().port);
});
