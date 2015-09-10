var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, function(err, body){
    if (err){
      throw err;
    }
    return cb(body.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, cb){
  var urlArr = exports.readListOfUrls(function(urlArr){
    return urlArr;
  });
  if (_.contains(urlArr, url)){
    return cb(true);
  }
  else {
    return cb(false);
  }
};

exports.addUrlToList = function(url, cb){
  var is = exports.isUrlInList(url, function(is){
    return is;
  });
  if (!is){
    fs.appendFile(exports.paths.list, url);
  }
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(){
};
