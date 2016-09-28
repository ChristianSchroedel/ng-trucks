module.exports = function(req, res, next) {
  var originalUrl = req.originalUrl;

  if (originalUrl.includes('api')) {
    var body = Object.keys(req.body).length ? ' - body: ' + JSON.stringify(req.body) : '';

    console.log(req.method + ' on ' + originalUrl + body);
  }

  next();
};
