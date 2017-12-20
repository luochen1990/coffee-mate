(function() {
  var basics, convertors, funny, lazy, url_helpers, utils;

  utils = require('./utils');

  basics = require('./basics');

  lazy = require('lazy-list');

  funny = require('./funny');

  convertors = require('./convertors');

  url_helpers = require('./url-helpers');

  module.exports = utils.extend({})(utils, basics, lazy, funny, convertors, url_helpers);

}).call(this);

//# sourceMappingURL=coffee-mate.js.map
