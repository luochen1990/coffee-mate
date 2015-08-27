(function() {
  var this_module;

  this_module = function() {
    var uri_decoder, uri_encoder;
    uri_encoder = function(component_packer) {
      if (component_packer == null) {
        component_packer = str;
      }
      return function(obj) {
        var k, v;
        return ((function() {
          var results;
          results = [];
          for (k in obj) {
            v = obj[k];
            results.push((encodeURIComponent(k)) + "=" + (encodeURIComponent(component_packer(v))));
          }
          return results;
        })()).join('&');
      };
    };
    uri_decoder = function(component_unpacker) {
      if (component_unpacker == null) {
        component_unpacker = (function(s) {
          return s;
        });
      }
      return function(str) {
        var d, i, j, k, len, ref, ref1, ref2, s, v;
        d = {};
        ref1 = (ref = str.match(/[^?=&]+=[^&]*/g)) != null ? ref : [];
        for (i = 0, len = ref1.length; i < len; i++) {
          s = ref1[i];
          ref2 = s.match(/([^=]+)=(.*)/), j = ref2.length - 2, k = ref2[j++], v = ref2[j++];
          d[decodeURIComponent(k)] = component_unpacker(decodeURIComponent(v));
        }
        return d;
      };
    };
    return {
      uri_encoder: uri_encoder,
      uri_decoder: uri_decoder
    };
  };

  module.exports = this_module();

}).call(this);

//# sourceMappingURL=url-helpers.js.map