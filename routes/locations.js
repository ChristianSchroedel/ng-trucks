var express = require('express');
var router = express.Router();

var mongoUtils = require('../db/mongo-utils');
var responseHelper = require('./helper/response-helper');

router.route('/')
  .get(function (req, res) {
    var query = {};
    var region = req.query.region;

    if (region) {
      query = {"region": region};
    }

    var locations = mongoUtils.locations();
    locations.find(query).toArray(function (err, docs) {
      if (err) {
        responseHelper.handleError(res, err.message, 'Failed to get locations');
      } else {
        responseHelper.sendResponseData(res, docs);
      }
    });
  });

router.route('/:name')
  .get(function (req, res) {
    var name = req.params.name;

    var locations = mongoUtils.locations();
    locations.find({name: name}).limit(1).next(function (err, doc) {
      if (err) {
        responseHelper.handleError(res, err.message, 'Failed to get location by name');
      } else {
        responseHelper.sendResponseData(res, doc);
      }
    });
  });

module.exports = router;
