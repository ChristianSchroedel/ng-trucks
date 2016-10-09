/**
 * Created by developer on 09.10.2016.
 */

module.exports = {
  handleError: function (res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  },
  sendResponseData: function (res, data) {
    if (!Object.keys(data).length) {
      res.sendStatus(204);
    } else {
      res.status(200).json({data: data});
    }
  }
};
