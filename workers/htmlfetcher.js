// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

archive.readListOfUrls(function(list){
  archive.downloadUrls(list);
});
