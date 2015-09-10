var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

//asset is filepath
exports.serveAssets = function(res, asset, callback) {
  //cb is error, data
  fs.readFile(asset, function(err, body){
    //not in archive
    if (err) {
      res.writeHead(404, headers);
      res.end();
    }
    // in archive
    else {
      res.writeHead(200, headers);
      res.end(body.toString());
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!
