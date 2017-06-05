//html-routes.js - this file offers a set of routes for sending users to the various html pages

// Each of the below routes just handles the HTML page that the user gets sent to.
var path = require("path");

module.exports = function(app) {
  // index route loads burger.html	
  app.get("/", function(req, res) {
  	res.sendFile(path.join(__dirname + "/../public/burger.html"));
  });// end of get
};// end of module.exports