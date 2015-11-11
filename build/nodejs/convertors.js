(function() {
  var this_module;

  this_module = function() {
    var bool, chr, float, hex, int, json, jsonWith, obj, ord, prettyJson, str;
    int = function(s, base) {
      var r;
      if (typeof s === 'string') {
        r = parseInt(s, base);
        if (!((s.slice != null) && r === parseInt(s.slice(0, -1), base))) {
          return r;
        } else {
          return null;
        }
      } else {
        return parseInt(0 + s);
      }
    };
    float = function(s) {
      if (/^-?[0-9]*(\.[0-9]+)?([eE]-?[0-9]+)?$/.test(s)) {
        return parseFloat(s);
      } else {
        return null;
      }
    };
    str = function(x, base) {
      return x.toString(base);
    };
    bool = function(x) {
      if (x === true || x === false) {
        return x;
      } else {
        return null;
      }
    };
    hex = function(x) {
      return x.toString(16);
    };
    ord = function(c) {
      return c.charCodeAt();
    };
    chr = function(x) {
      return String.fromCharCode(x);
    };
    json = function(it) {
      return JSON.stringify(it);
    };
    jsonWith = function(indent, convertor) {
      return function(it) {
        return JSON.stringify(it, convertor, indent);
      };
    };
    prettyJson = function(it) {
      return JSON.stringify(it, null, 4);
    };
    obj = function(s) {
      return JSON.parse(s);
    };
    return {
      int: int,
      float: float,
      bool: bool,
      str: str,
      hex: hex,
      ord: ord,
      chr: chr,
      json: json,
      jsonWith: jsonWith,
      prettyJson: prettyJson,
      obj: obj
    };
  };

  module.exports = this_module();

}).call(this);

//# sourceMappingURL=convertors.js.map