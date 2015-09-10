var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var hh = require('../web/http-helpers');

exports.handleRequest = function (req, res) {

  // if the request is coming from the root, we serve the index.html
  if (req.method === 'GET'){
    if (req.url === '/'){
      hh.serveAssets(res, './web/public/index.html');
    }
    else {
      hh.serveAssets(res, archive.paths.archivedSites + req.url);
    }
  }
  else if (req.method === 'POST'){
    var url;
    req.on('data', function(messageChunk){
      url = messageChunk.toString().slice(4);
      archive.isUrlInList(url, function(is){
        if (is) {
          hh.serveAssets(res, archive.paths.archivedSites + '/' + url);
        }
        else {
          archive.addUrlToList(url);
          hh.serveAssets(res, archive.paths.siteAssets + '/loading.html');
        }
      });
    });
  }
  else {
    res.end();
  }
};
