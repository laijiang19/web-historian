var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var hh = require('../web/http-helpers');

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
  cb = cb || _.identity;
  fs.readFile(exports.paths.list, function(err, data){
    if (err) {
      throw err;
    }
    cb(data.toString().split('\n'));
  });  
};

exports.isUrlInList = function(url, cb){
  cb = cb || _.identity;
  exports.readListOfUrls(function(results){
    if (_.contains(results, url)){
      cb(true);
    } else {
      cb(false);
    }
  });
};

exports.addUrlToList = function(url, cb){
  // check if url is in list already
  if (!exports.isUrlInList(url)){
    fs.appendFile(exports.paths.list, url + '\n');
  }
  if (cb){
    return cb();
  }
};

exports.isUrlArchived = function(url, cb){
  cb = cb || _.identity;
  fs.readFile(exports.paths.archivedSites + '/' + url, function(error, data){
    if (error){
      return cb(false);
    } else {
      return cb(true);
    }
  });
};

exports.downloadUrls = function(urlArr){

  _.each(urlArr, function(url){
    if (!exports.isUrlArchived(url)){
      var fixturePath = exports.paths.archivedSites + '/' + url;
      hh.requestContent(url);
    }
  });
};
