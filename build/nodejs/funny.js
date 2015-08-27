(function() {
  var this_module,
    slice = [].slice;

  this_module = function() {
    var Y, church, fix, memoFix, memoize;
    church = function(n) {
      var iter;
      iter = function(f, n, r) {
        if (n === 0) {
          return r;
        } else {
          return iter(f, n - 1, f(r));
        }
      };
      return function(f) {
        return function(x) {
          return iter(f, n + 0, x);
        };
      };
    };
    Y = function(f) {
      return (function(x) {
        return x(x);
      })((function(x) {
        return f((function(y) {
          return (x(x))(y);
        }));
      }));
    };
    memoize = function(f, get_key) {
      var cache;
      if (get_key == null) {
        get_key = (function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return json(args);
        });
      }
      cache = {};
      return function() {
        var args, cached, key, r;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        key = get_key.apply(null, args);
        cached = cache[key];
        if (cached != null) {
          return cached;
        } else {
          r = f.apply(null, args);
          cache[key] = r;
          return r;
        }
      };
    };
    fix = Y;
    memoFix = function(ff) {
      var f;
      f = memoize(ff((function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return f.apply(null, args);
      })));
      return f;
    };
    return {
      church: church,
      Y: Y,
      memoize: memoize,
      fix: fix,
      memoFix: memoFix
    };
  };

  module.exports = this_module();

}).call(this);

//# sourceMappingURL=funny.js.map