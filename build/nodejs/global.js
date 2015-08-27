(function() {
  var k, mate, v;

  mate = require('./coffee-mate');

  for (k in mate) {
    v = mate[k];
    global[k] = v;
  }

}).call(this);

//# sourceMappingURL=global.js.map