/**
 * Created by developer on 23.09.2016.
 */

var express = require('express');
var router = express.Router();
var request = require('request');

var FOOD_TRUCKS_API_URL = 'https://www.food-trucks-deutschland.de/api/locations/getTours.json';

router.route('/')
  .post(function (req, res) {
    var body = req.body;

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

module.exports = router;
