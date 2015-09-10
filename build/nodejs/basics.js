(function() {
  var this_module,
    slice = [].slice;

  this_module = function(arg) {
    var abs, accept_multi_or_array, best, ceil, combine, curry2, curry3, equal, flip, floor, foldl, greaterEqual, greaterThan, lessEqual, lessThan, minus, notEqual, pack, pluck, plus, precise, seek, sum, uncurry2, uncurry3, unpack;
    best = arg.best, foldl = arg.foldl;
    flip = function(f) {
      return function(x) {
        return function(y) {
          return f(y)(x);
        };
      };
    };
    combine = function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    };
    curry2 = function(f) {
      return function(a) {
        return function(b) {
          return f(a, b);
        };
      };
    };
    curry3 = function(f) {
      return function(a) {
        return function(b) {
          return function(c) {
            return f(a, b, c);
          };
        };
      };
    };
    uncurry2 = function(f) {
      return function(a, b) {
        return f(a)(b);
      };
    };
    uncurry3 = function(f) {
      return function(a, b, c) {
        return f(a)(b)(c);
      };
    };
    pack = function(f) {
      return function(arr) {
        return f.apply(null, arr);
      };
    };
    unpack = function(f) {
      return function() {
        var arr;
        arr = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return f(arr);
      };
    };
    seek = function(arr) {
      return function(i) {
        return arr[i];
      };
    };
    pluck = function(attr) {
      return function(d) {
        return d[attr];
      };
    };
    equal = function(it) {
      return function(x) {
        return x === it;
      };
    };
    notEqual = function(it) {
      return function(x) {
        return x !== it;
      };
    };
    lessThan = function(it) {
      return function(x) {
        return x < it;
      };
    };
    greaterThan = function(it) {
      return function(x) {
        return x > it;
      };
    };
    lessEqual = function(it) {
      return function(x) {
        return x <= it;
      };
    };
    greaterEqual = function(it) {
      return function(x) {
        return x >= it;
      };
    };
    plus = function(it) {
      return function(x) {
        return x + it;
      };
    };
    minus = function(it) {
      return function(x) {
        return x - it;
      };
    };
    abs = Math.abs;
    floor = Math.floor;
    ceil = Math.ceil;
    precise = function(n) {
      return function(x) {
        return parseFloat(x.toPrecision(n));
      };
    };
    accept_multi_or_array = function(f) {
      return function() {
        var arr;
        arr = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return f(arr.length === 1 && arr.first instanceof Array ? arr.first : arr);
      };
    };
    sum = foldl((function(a, b) {
      return a + b;
    }), 0);
    return {
      flip: flip,
      combine: combine,
      curry2: curry2,
      curry3: curry3,
      uncurry2: uncurry2,
      uncurry3: uncurry3,
      pack: pack,
      unpack: unpack,
      seek: seek,
      pluck: pluck,
      equal: equal,
      notEqual: notEqual,
      lessThan: lessThan,
      lessEqual: lessEqual,
      greaterThan: greaterThan,
      greaterEqual: greaterEqual,
      plus: plus,
      minus: minus,
      abs: abs,
      floor: floor,
      ceil: ceil,
      precise: precise,
      sum: sum,
      max: max,
      min: min,
      max_index: max_index,
      min_index: min_index
    };
  };

  module.exports = this_module({
    best: require('lazy-list').best,
    foldl: require('lazy-list').foldl
  });

}).call(this);

//# sourceMappingURL=basics.js.map