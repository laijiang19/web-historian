var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var request = require('request');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);


if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}


// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage. 
//   }
// })

// http.createServer(function (req, resp) {
//   if (req.url === '/doodle.png') {
//     var x = request('http://mysite.com/doodle.png')
//     req.pipe(x)
//     x.pipe(resp)
//   }
// })