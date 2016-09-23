/**
 * Created by developer on 19.09.2016.
 */
'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 8080;
var distDir = path.resolve(__dirname, 'dist');

var foodtrucks = require('./routes/foodtrucks');

// Register Middleware
app.use(bodyParser.json());
app.use(express.static(distDir));

// Register Routes
app.use('/api/foodtrucks', foodtrucks);

// Redirect all 404 requests for routes to index.html
app.all('*', function(req, res) {
  return res.status(200).sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, function() {
  console.log('app listening on port: ' + this.address().port);
});
