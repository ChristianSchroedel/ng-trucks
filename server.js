/**
 * Created by developer on 19.09.2016.
 */
'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

var port = process.env.PORT || 8080;
var distDir = path.resolve(__dirname, 'dist');

var apiLogger = require('./middleware/api-logger');

var foodtrucks = require('./routes/foodtrucks');
var locations = require('./routes/locations');

// Register Middleware
app.use(bodyParser.json());
app.use(express.static(distDir));
app.use(apiLogger);

// Register Routes
app.use('/api/foodtrucks', foodtrucks);
app.use('/api/locations', locations);

// Redirect all 404 requests for routes to index.html
app.all('*', function(req, res) {
  return res.status(200).sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, function() {
  console.log('=================================');
  console.log('|| app listening on port: ' + this.address().port + ' ||');
  console.log('=================================');
});
