var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// var $ = require('jquery');
var hh = require('../web/http-helpers');

// fs.writeFile() -- writes data to file/replaces files if it already exists
// fs.readFile(path, function(data){
//    return data.toString();
//}) -- specifies where a file is and returns the body

exports.handleRequest = function (req, res) {

  // if the request is coming from the root, we serve the index.html
  if (req.method === 'GET'){
    if (req.url === '/'){
      hh.serveAssets(res, './web/public/index.html');
      // hh.serveAssets(res, './web/public/style.css');
    }
    // check if url is in our archive 
    else {
      hh.serveAssets(res, archive.paths.archivedSites + req.url);
    }
  }
  else if (req.method === 'POST'){
    var url;
    req.on('data', function(messageChunk){
      if (messageChunk.toString()[0] === '{'){
        url = JSON.parse(messageChunk.toString()).url;
        archive.addUrlToList(url);
      }
    });
    res.writeHead(302);
    res.end(url);
  }
  else {
    res.end();
  }
};

    //res.end(archive.paths.list);
