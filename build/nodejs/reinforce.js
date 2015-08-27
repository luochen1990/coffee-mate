(function() {
  var this_module,
    slice = [].slice;

  this_module = function(arg) {
    var Array, Object, String;
    String = arg.String, Array = arg.Array, Object = arg.Object;
    Object.defineProperties(String.prototype, {
      format: {
        enumerable: false,
        value: function(args) {
          return this.replace(/\{(\w+)\}/g, function(m, i) {
            if (args[i] != null) {
              return args[i];
            } else {
              return m;
            }
          });
        }
      },
      repeat: {
        enumerable: false,
        value: function(n) {
          var pat, r, ref;
          ref = ['', this], r = ref[0], pat = ref[1];
          while (n > 0) {
            if (n & 1) {
              r += pat;
            }
            n >>= 1;
            pat += pat;
          }
          return r;
        }
      },
      cut: {
        enumerable: false,
        value: function(start_pat, end_pat) {
          var i, j;
          i = this.search(start_pat) + 1;
          if (i === 0) {
            return null;
          }
          j = this.substr(i).search(end_pat);
          if (j === -1) {
            return null;
          }
          return this.substr(i, j);
        }
      }
    });
    Object.defineProperties(Array.prototype, {
      first: {
        get: function() {
          return this[0];
        },
        set: function(v) {
          return this[0] = v;
        }
      },
      second: {
        get: function() {
          return this[1];
        },
        set: function(v) {
          return this[1] = v;
        }
      },
      third: {
        get: function() {
          return this[2];
        },
        set: function(v) {
          return this[2] = v;
        }
      },
      last: {
        get: function() {
          return this[this.length - 1];
        },
        set: function(v) {
          return this[this.length - 1] = v;
        }
      },
      repeat: {
        enumerable: false,
        value: function(n) {
          var pat, r, ref;
          ref = [[], this], r = ref[0], pat = ref[1];
          while (n > 0) {
            if (n & 1) {
              r = r.concat(pat);
            }
            n >>= 1;
            pat = pat.concat(pat);
          }
          return r;
        }
      },
      unique: {
        enumerable: false,
        value: (function() {
          var init;
          init = new Object;
          return function(equal) {
            var i, j, l, len, len1, o, t, x;
            i = 0;
            t = init;
            if (equal == null) {
              for (j = l = 0, len = this.length; l < len; j = ++l) {
                x = this[j];
                if (!(x !== t)) {
                  continue;
                }
                this[i] = t = x;
                i += 1;
              }
            } else {
              for (j = o = 0, len1 = this.length; o < len1; j = ++o) {
                x = this[j];
                if (!(t === init || !equal(x, t))) {
                  continue;
                }
                this[i] = t = x;
                i += 1;
              }
            }
            this.splice(i, Infinity);
            return this;
          };
        })()
      }
    });
    Object.defineProperties(Object, {
      size: {
        enumerable: false,
        value: function(d) {
          return Object.keys(d).length;
        }
      },
      extend: {
        enumerable: false,
        value: function() {
          var base, d, defaults, k, l, len, v;
          base = arguments[0], defaults = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          for (l = 0, len = defaults.length; l < len; l++) {
            d = defaults[l];
            if (d != null) {
              for (k in d) {
                v = d[k];
                if (base[k] == null) {
                  base[k] = v;
                }
              }
            }
          }
          return base;
        }
      },
      update: {
        enumerable: false,
        value: function() {
          var base, d, k, l, len, updates, v;
          base = arguments[0], updates = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          for (l = 0, len = updates.length; l < len; l++) {
            d = updates[l];
            if (d != null) {
              for (k in d) {
                v = d[k];
                base[k] = v;
              }
            }
          }
          return base;
        }
      }
    });
    return {
      String: String,
      Array: Array,
      Object: Object
    };
  };

  module.exports = this_module({
    String: String,
    Array: Array,
    Object: Object
  });

}).call(this);

//# sourceMappingURL=reinforce.js.map