(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.__CoffeeMate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var k, mate, v;

require('./reinforce');

mate = require('./coffee-mate');

for (k in mate) {
  v = mate[k];
  global[k] = v;
}



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./coffee-mate":5,"./reinforce":8}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.lazy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var this_module,
  slice = [].slice;

this_module = function(arg) {
  var Iterator, LazyList, Symbol, all, any, best, brk, cartProd, concat, cons, drop, dropWhile, enumerate, filter, foldl, foreach, iterate, join, last, lazy, length, list, map, naturals, nil, permutation_gen, primes, random_gen, range, ranged_random_gen, ref, repeat, reverse, scanl, streak, take, takeWhile, zip, zipWith;
  Symbol = arg.Symbol;
  LazyList = function(f) {
    f[Symbol.iterator] = function() {
      return f();
    };
    f.toString = function() {
      return "LazyList";
    };
    return f;
  };
  nil = LazyList(function() {
    return nil;
  });
  nil.toString = function() {
    return 'nil';
  };
  Iterator = function(it) {
    it.next = function() {
      var r;
      r = it();
      return {
        value: r,
        done: r === nil
      };
    };
    it.toString = function() {
      return "Iterator";
    };
    return it;
  };
  naturals = LazyList(function() {
    var i;
    i = -1;
    return Iterator(function() {
      return ++i;
    });
  });
  range = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (args.length === 0) {
      return naturals;
    } else if (args.length === 1) {
      return LazyList(function() {
        var i, stop;
        stop = args[0];
        i = -1;
        return Iterator(function() {
          if (++i < stop) {
            return i;
          } else {
            return nil;
          }
        });
      });
    } else if (args.length === 2) {
      return LazyList(function() {
        var i, start, stop;
        start = args[0], stop = args[1];
        if (start < stop) {
          i = start - 1;
          return Iterator(function() {
            if (++i < stop) {
              return i;
            } else {
              return nil;
            }
          });
        } else {
          i = start + 1;
          return Iterator(function() {
            if (--i > stop) {
              return i;
            } else {
              return nil;
            }
          });
        }
      });
    } else {
      return LazyList(function() {
        var i, start, step, stop;
        start = args[0], stop = args[1], step = args[2];
        if (stop !== start && (stop - start) * step < 0) {
          throw 'ERR IN range(): YOU ARE CREATING AN UNLIMITTED RANGE';
        }
        i = start - step;
        if (start < stop) {
          return Iterator(function() {
            if ((i += step) < stop) {
              return i;
            } else {
              return nil;
            }
          });
        } else {
          return Iterator(function() {
            if ((i += step) > stop) {
              return i;
            } else {
              return nil;
            }
          });
        }
      });
    }
  };
  primes = LazyList(function() {
    return filter(function(x) {
      return all(function(p) {
        return x % p !== 0;
      })(takeWhile(function(p) {
        return p * p <= x;
      })(range(2, Infinity)));
    })(range(2, Infinity))();
  });
  lazy = function(arr) {
    if (typeof arr === 'function') {
      if (arr[Symbol.iterator] != null) {
        return arr;
      } else {
        return LazyList(arr);
      }
    } else if (arr[Symbol.iterator] != null) {
      return LazyList(function() {
        var it;
        it = arr[Symbol.iterator]();
        return Iterator(function() {
          var r;
          r = it.next();
          if (r.done) {
            return nil;
          } else {
            return r.value;
          }
        });
      });
    } else {
      return LazyList(function() {
        var i;
        i = -1;
        return Iterator(function() {
          i += 1;
          if (i < arr.length) {
            return arr[i];
          } else {
            return nil;
          }
        });
      });
    }
  };
  enumerate = function(it) {
    if ((it[Symbol.iterator] != null) || it instanceof Array) {
      return zip(naturals, it);
    } else {
      return LazyList(function() {
        var i, keys;
        keys = Object.keys(it);
        i = -1;
        return Iterator(function() {
          var k;
          if (++i < keys.length) {
            return [(k = keys[i]), it[k]];
          } else {
            return nil;
          }
        });
      });
    }
  };
  repeat = function(x) {
    return LazyList(function() {
      return Iterator(function() {
        return x;
      });
    });
  };
  iterate = function(next, init) {
    return LazyList(function() {
      var status;
      status = init;
      return Iterator(function() {
        var last;
        last = status;
        status = next(status);
        return last;
      });
    });
  };
  random_gen = (function() {
    var hash;
    hash = function(x) {
      x = Math.sin(x) * 1e4;
      return x - Math.floor(x);
    };
    return function(opts) {
      var ref, seed;
      seed = hash((ref = opts != null ? opts.seed : void 0) != null ? ref : Math.random());
      return iterate(hash, seed);
    };
  })();
  ranged_random_gen = function(range, opts) {
    var ref, seed;
    seed = (ref = opts != null ? opts.seed : void 0) != null ? ref : Math.random();
    return map(function(x) {
      return Math.floor(x * range);
    })(random_gen({
      seed: seed
    }));
  };
  permutation_gen = (function() {
    var next_permutation;
    next_permutation = function(x) {
      var l, m, r, ref, ref1;
      x = x.slice(0);
      l = x.length - 1;
      while (l >= 1 && x[l] <= x[l - 1]) {
        --l;
      }
      if (l !== 0) {
        m = x.length - 1;
        while (m > l - 1 && x[m] <= x[l - 1]) {
          --m;
        }
        ref = [x[l - 1], x[m]], x[m] = ref[0], x[l - 1] = ref[1];
      }
      r = x.length - 1;
      while (l < r) {
        ref1 = [x[r], x[l]], x[l] = ref1[0], x[r] = ref1[1];
        ++l;
        --r;
      }
      return x;
    };
    return function(arr) {
      if (arr.length === 0) {
        return nil;
      } else {
        return cons(arr.slice(0))(takeWhile(function(ls) {
          return json(ls) !== json(arr);
        })(drop(1)(iterate(next_permutation, arr))));
      }
    };
  })();
  take = function(n) {
    return function(xs) {
      return LazyList(function() {
        var c, iter;
        iter = lazy(xs)[Symbol.iterator]();
        c = -1;
        return Iterator(function() {
          if (++c < n) {
            return iter();
          } else {
            return nil;
          }
        });
      });
    };
  };
  takeWhile = function(ok) {
    return function(xs) {
      return LazyList(function() {
        var iter;
        iter = lazy(xs)[Symbol.iterator]();
        return Iterator(function() {
          var x;
          if ((x = iter()) !== nil && ok(x)) {
            return x;
          } else {
            return nil;
          }
        });
      });
    };
  };
  drop = function(n) {
    return function(xs) {
      return LazyList(function() {
        var finished, i, iter, j, ref;
        iter = lazy(xs)[Symbol.iterator]();
        finished = false;
        for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          finished || (finished = iter() === nil);
          if (finished) {
            break;
          }
        }
        if (finished) {
          return function() {
            return nil;
          };
        } else {
          return iter;
        }
      });
    };
  };
  dropWhile = function(ok) {
    return function(xs) {
      return LazyList(function() {
        var iter, x;
        iter = lazy(xs)[Symbol.iterator]();
        while (ok(x = iter()) && x !== nil) {
          null;
        }
        return Iterator(function() {
          var prevx, ref;
          ref = [x, iter()], prevx = ref[0], x = ref[1];
          return prevx;
        });
      });
    };
  };
  cons = function(x) {
    return function(xs) {
      return LazyList(function() {
        var iter;
        iter = null;
        return Iterator(function() {
          if (iter === null) {
            iter = lazy(xs)[Symbol.iterator]();
            return x;
          } else {
            return iter();
          }
        });
      });
    };
  };
  concat = function(ws) {
    return function(xs) {
      return LazyList(function() {
        var iter, xs_unused;
        xs_unused = true;
        iter = lazy(ws)[Symbol.iterator]();
        return Iterator(function() {
          var x;
          if (xs_unused) {
            if ((x = iter()) !== nil) {
              return x;
            } else {
              iter = lazy(xs)[Symbol.iterator]();
              xs_unused = false;
              return iter();
            }
          } else {
            return iter();
          }
        });
      });
    };
  };
  map = function(f) {
    return function(xs) {
      return LazyList(function() {
        var iter;
        iter = lazy(xs)[Symbol.iterator]();
        return Iterator(function() {
          var x;
          if ((x = iter()) !== nil) {
            return f(x);
          } else {
            return nil;
          }
        });
      });
    };
  };
  filter = function(ok) {
    return function(xs) {
      return LazyList(function() {
        var iter;
        iter = lazy(xs)[Symbol.iterator]();
        return Iterator(function() {
          var x;
          while (!ok(x = iter()) && x !== nil) {
            null;
          }
          return x;
        });
      });
    };
  };
  scanl = function(f, r) {
    return function(xs) {
      return LazyList(function() {
        var iter;
        iter = lazy(xs)[Symbol.iterator]();
        return Iterator(function() {
          var got, x;
          got = r;
          r = (x = iter()) !== nil ? f(r, x) : nil;
          return got;
        });
      });
    };
  };
  streak = function(n) {
    return function(xs) {
      return LazyList(function() {
        var buf, iter;
        iter = lazy(xs)[Symbol.iterator]();
        buf = [];
        return Iterator(function() {
          var x;
          if ((x = iter()) === nil) {
            return nil;
          }
          buf.push(x);
          if (buf.length > n) {
            buf.shift(1);
          }
          return buf.slice(0);
        });
      });
    };
  };
  reverse = function(xs) {
    var arr;
    arr = list(lazy(xs));
    return lazy(arr.reverse());
  };
  join = function(xss) {
    return LazyList(function() {
      var iter, xs, xs_iter;
      xs_iter = lazy(xss)[Symbol.iterator]();
      xs = xs_iter();
      iter = lazy(xs)[Symbol.iterator]();
      return Iterator(function() {
        var x;
        if ((x = iter()) !== nil) {
          return x;
        } else if ((xs = xs_iter()) !== nil) {
          iter = lazy(xs)[Symbol.iterator]();
          return iter();
        } else {
          return nil;
        }
      });
    });
  };
  ref = (function() {
    var finished, zip, zipWith;
    finished = function(arr) {
      var j, len1, x;
      for (j = 0, len1 = arr.length; j < len1; j++) {
        x = arr[j];
        if (x === nil) {
          return true;
        }
      }
      return false;
    };
    zip = function() {
      var xss;
      xss = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return LazyList(function() {
        var iters, xs;
        iters = (function() {
          var j, len1, results;
          results = [];
          for (j = 0, len1 = xss.length; j < len1; j++) {
            xs = xss[j];
            results.push(lazy(xs)[Symbol.iterator]());
          }
          return results;
        })();
        return Iterator(function() {
          var iter, next;
          next = (function() {
            var j, len1, results;
            results = [];
            for (j = 0, len1 = iters.length; j < len1; j++) {
              iter = iters[j];
              results.push(iter());
            }
            return results;
          })();
          if (finished(next)) {
            return nil;
          } else {
            return next;
          }
        });
      });
    };
    zipWith = function(f) {
      return function() {
        var xss;
        xss = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return LazyList(function() {
          var iters, xs;
          iters = (function() {
            var j, len1, results;
            results = [];
            for (j = 0, len1 = xss.length; j < len1; j++) {
              xs = xss[j];
              results.push(lazy(xs)[Symbol.iterator]());
            }
            return results;
          })();
          return Iterator(function() {
            var iter, next;
            next = (function() {
              var j, len1, results;
              results = [];
              for (j = 0, len1 = iters.length; j < len1; j++) {
                iter = iters[j];
                results.push(iter());
              }
              return results;
            })();
            if (finished(next)) {
              return nil;
            } else {
              return f.apply(null, next);
            }
          });
        });
      };
    };
    return {
      zip: zip,
      zipWith: zipWith
    };
  })(), zip = ref.zip, zipWith = ref.zipWith;
  cartProd = (function() {
    var apply_vector, inc_vector;
    inc_vector = function(limits) {
      var len_minus_1;
      len_minus_1 = limits.length - 1;
      return function(vec) {
        var i;
        i = len_minus_1;
        while (!(++vec[i] < limits[i] || i <= 0)) {
          vec[i--] = 0;
        }
        return vec;
      };
    };
    apply_vector = function(space) {
      var len;
      len = space.length;
      return function(vec) {
        var i, j, ref1, results;
        results = [];
        for (i = j = 0, ref1 = len; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
          results.push(space[i][vec[i]]);
        }
        return results;
      };
    };
    return function() {
      var xss;
      xss = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return LazyList(function() {
        var get_value, i, inc, j, len, len1, limits, v, xs;
        xss = (function() {
          var j, len1, results;
          results = [];
          for (j = 0, len1 = xss.length; j < len1; j++) {
            xs = xss[j];
            results.push(list(xs));
          }
          return results;
        })();
        limits = (function() {
          var j, ref1, results;
          results = [];
          for (i = j = 0, ref1 = xss.length; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
            results.push(xss[i].length);
          }
          return results;
        })();
        for (j = 0, len1 = limits.length; j < len1; j++) {
          len = limits[j];
          if (len === 0) {
            return nil;
          }
        }
        inc = inc_vector(limits);
        get_value = apply_vector(xss);
        v = (function() {
          var o, ref1, results;
          results = [];
          for (i = o = 0, ref1 = xss.length; 0 <= ref1 ? o < ref1 : o > ref1; i = 0 <= ref1 ? ++o : --o) {
            results.push(0);
          }
          return results;
        })();
        return Iterator(function() {
          var r;
          if (v[0] < limits[0]) {
            r = get_value(v);
            inc(v);
            return r;
          } else {
            return nil;
          }
        });
      });
    };
  })();
  list = function(xs) {
    var it, n, results, results1, x;
    if (xs instanceof Array) {
      return xs;
    } else if (typeof xs === 'function') {
      it = xs[Symbol.iterator]();
      results = [];
      while ((x = it()) !== nil) {
        results.push(x);
      }
      return results;
    } else if (xs[Symbol.iterator] != null) {
      it = lazy(xs)[Symbol.iterator]();
      results1 = [];
      while ((x = it()) !== nil) {
        results1.push(x);
      }
      return results1;
    } else if (typeof xs === 'number') {
      n = xs;
      return function(xs) {
        return list(take(n)(xs));
      };
    } else {
      throw Error('list(xs): xs is neither LazyList nor Array');
    }
  };
  last = function(xs) {
    var iter, r, ref1, x;
    if (xs[Symbol.iterator] == null) {
      return (ref1 = xs[xs.length - 1]) != null ? ref1 : nil;
    } else {
      iter = lazy(xs)[Symbol.iterator]();
      r = nil;
      while ((x = iter()) !== nil) {
        r = x;
      }
      return r;
    }
  };
  length = function(xs) {
    var iter, r, x;
    if (xs[Symbol.iterator] == null) {
      return xs.length;
    } else {
      iter = lazy(xs)[Symbol.iterator]();
      r = 0;
      while ((x = iter()) !== nil) {
        ++r;
      }
      return r;
    }
  };
  foldl = function(f, init) {
    return function(xs) {
      var iter, r, x;
      r = init;
      iter = lazy(xs)[Symbol.iterator]();
      while ((x = iter()) !== nil) {
        r = f(r, x);
      }
      return r;
    };
  };
  best = function(better) {
    return function(xs) {
      var it, iter, r;
      iter = lazy(xs)[Symbol.iterator]();
      if ((r = iter()) === nil) {
        return null;
      }
      while ((it = iter()) !== nil) {
        r = better(it, r) ? it : r;
      }
      return r;
    };
  };
  all = function(f) {
    if (typeof f !== 'function') {
      f = (function(x) {
        return x === f;
      });
    }
    return function(xs) {
      var iter, x;
      iter = lazy(xs)[Symbol.iterator]();
      while ((x = iter()) !== nil) {
        if (!f(x)) {
          return false;
        }
      }
      return true;
    };
  };
  any = function(f) {
    var all_not;
    all_not = all(function(x) {
      return !f(x);
    });
    return function(xs) {
      return !(all_not(xs));
    };
  };
  brk = function() {
    return brk;
  };
  brk.toString = function() {
    return 'foreach.break';
  };
  foreach = function(xs, callback, fruit) {
    var iter, x;
    iter = lazy(xs)[Symbol.iterator]();
    while ((x = iter()) !== nil) {
      if (callback(x, fruit) === brk) {
        break;
      }
    }
    return fruit;
  };
  Object.defineProperties(foreach, {
    "break": {
      writable: false,
      configurable: false,
      enumerable: false,
      value: brk
    }
  });
  return {
    nil: nil,
    LazyList: LazyList,
    Iterator: Iterator,
    Symbol: Symbol,
    naturals: naturals,
    range: range,
    primes: primes,
    lazy: lazy,
    enumerate: enumerate,
    repeat: repeat,
    iterate: iterate,
    random_gen: random_gen,
    ranged_random_gen: ranged_random_gen,
    permutation_gen: permutation_gen,
    cons: cons,
    concat: concat,
    map: map,
    filter: filter,
    take: take,
    takeWhile: takeWhile,
    drop: drop,
    dropWhile: dropWhile,
    scanl: scanl,
    streak: streak,
    reverse: reverse,
    join: join,
    zip: zip,
    zipWith: zipWith,
    cartProd: cartProd,
    list: list,
    last: last,
    length: length,
    foldl: foldl,
    best: best,
    all: all,
    any: any,
    foreach: foreach
  };
};

module.exports = this_module({
  Symbol: typeof Symbol !== "undefined" && Symbol !== null ? Symbol : {
    iterator: 'iter'
  }
});


},{}]},{},[1])(1)
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
var this_module,
  slice = [].slice;

this_module = function(arg) {
  var abs, accept_multi_or_array, best, ceil, combine, curry2, curry3, equal, flip, floor, greaterEqual, greaterThan, lessEqual, lessThan, max, max_index, min, min_index, minus, notEqual, pack, pluck, plus, precise, seek, sum, uncurry2, uncurry3, unpack;
  best = arg.best;
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
  sum = accept_multi_or_array(function(arr) {
    var k, len, r, x;
    if (arr.length === 1 && arr.first instanceof Array) {
      arr = arr.first;
    }
    r = 0;
    for (k = 0, len = arr.length; k < len; k++) {
      x = arr[k];
      r += x;
    }
    return r;
  });
  max = accept_multi_or_array(function(arr) {
    return best(function(a, b) {
      return a > b;
    })(arr);
  });
  min = accept_multi_or_array(function(arr) {
    return best(function(a, b) {
      return a < b;
    })(arr);
  });
  max_index = accept_multi_or_array(function(arr) {
    var k, ref, results;
    return best(function(i, j) {
      return arr[i] > arr[j];
    })((function() {
      results = [];
      for (var k = 0, ref = arr.length; 0 <= ref ? k < ref : k > ref; 0 <= ref ? k++ : k--){ results.push(k); }
      return results;
    }).apply(this));
  });
  min_index = accept_multi_or_array(function(arr) {
    var k, ref, results;
    return best(function(i, j) {
      return arr[i] < arr[j];
    })((function() {
      results = [];
      for (var k = 0, ref = arr.length; 0 <= ref ? k < ref : k > ref; 0 <= ref ? k++ : k--){ results.push(k); }
      return results;
    }).apply(this));
  });
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
  best: require('lazy.coffee').best
});


},{"lazy.coffee":3}],5:[function(require,module,exports){
var basics, convertors, funny, lazy, url_helpers, utils;

utils = require('./utils');

basics = require('./basics');

lazy = require('lazy.coffee');

funny = require('./funny');

convertors = require('./convertors');

url_helpers = require('./url-helpers');

module.exports = utils.extend({})(utils, basics, lazy, funny, convertors, url_helpers);


},{"./basics":4,"./convertors":6,"./funny":7,"./url-helpers":9,"./utils":10,"lazy.coffee":3}],6:[function(require,module,exports){
var this_module;

this_module = function() {
  var bool, chr, float, hex, int, json, obj, ord, str;
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
  json = function(it, indent) {
    return JSON.stringify(it, null, indent);
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
    obj: obj
  };
};

module.exports = this_module();


},{}],7:[function(require,module,exports){
var this_module,
  slice = [].slice;

this_module = function() {
  var Y, church, memoize;
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
  return {
    church: church,
    Y: Y,
    memoize: memoize
  };
};

module.exports = this_module();


},{}],8:[function(require,module,exports){
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


},{}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
(function (process){
var this_module,
  slice = [].slice;

this_module = function() {
  var assert, assertEq, assertEqOn, copy, deepcopy, dict, extend, function_literal, log, override, ref, securely, time_now, update;
  function_literal = function(f) {
    var expr;
    expr = f.toString().replace(/^\s*function\s?\(\s?\)\s?{\s*return\s*([^]*?);?\s*}$/, '$1');
    if (expr.length <= 100) {
      expr = expr.replace(/[\r\n]{1,2}\s*/g, '');
    }
    return expr;
  };
  time_now = function() {
    return (new Date).getTime();
  };
  log = (function() {
    var dye, factory, got, histories, log_label;
    dye = (function() {
      var cavailable, palette;
      cavailable = (typeof window === "undefined" || window === null) && (typeof process !== "undefined" && process !== null) && !process.env.NODE_DISABLE_COLORS;
      palette = {
        bold: '\x1B[0;1m',
        red: '\x1B[0;31m',
        green: '\x1B[0;32m',
        yellow: '\x1B[0;33m',
        blue: '\x1B[0;34m',
        bold_grey: '\x1B[1;30m'
      };
      if (!cavailable) {
        return function(color) {
          return function(s) {
            return s;
          };
        };
      } else {
        return function(color) {
          return function(s) {
            return "" + palette[color] + s + '\x1B[0m';
          };
        };
      }
    })();
    log_label = (function() {
      var flag_palette, op_flag;
      flag_palette = {
        '#': 'bold_grey',
        'I': 'green',
        'E': 'red',
        'W': 'yellow'
      };
      op_flag = function(op) {
        if (op === 'log') {
          return '#';
        } else {
          return op[0].toUpperCase();
        }
      };
      return function(op) {
        var flag;
        flag = op_flag(op);
        return dye(flag_palette[flag])(flag);
      };
    })();
    histories = [];
    factory = function(op) {
      var prefix;
      prefix = "" + (dye('bold_grey')('#')) + (log_label(op));
      return function() {
        var args, ball, eval_result, expr, f, i, len, start_time, time_used;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        ball = [];
        for (i = 0, len = args.length; i < len; i++) {
          f = args[i];
          if (typeof f === 'function') {
            expr = function_literal(f);
            start_time = time_now();
            eval_result = f();
            time_used = time_now() - start_time;
            ball.push(prefix + " " + (dye('green')(expr)) + " " + (dye('bold_grey')('==>')), eval_result);
            if (time_used > 0) {
              ball.push(dye('yellow')("[" + time_used + "ms]"));
            }
          } else {
            ball.push("" + prefix, f);
          }
        }
        console[op].apply(console, ball);
        histories.push(ball);
        if (histories.length >= 10) {
          histories.shift();
        }
        return null;
      };
    };
    got = factory('log');
    got.histories = histories;
    got.info = factory('info');
    got.warn = factory('warn');
    got.error = got.err = factory('error');
    return got;
  })();
  assert = function(f, msg) {
    var e, r, ref;
    if (!(f instanceof Function)) {
      ref = [msg, f], f = ref[0], msg = ref[1];
    }
    try {
      r = f();
    } catch (_error) {
      e = _error;
      throw Error("Assertion " + (msg != null ? msg : function_literal(f)) + " Unknown:\n" + e);
    }
    if (!r) {
      throw Error("Assertion " + (msg != null ? msg : function_literal(f)) + " Failed!");
    }
  };
  assertEq = function(l, r) {
    var e, lv, rv;
    try {
      lv = l();
      rv = r();
    } catch (_error) {
      e = _error;
      throw Error("Equation Between " + (function_literal(l)) + " And " + (function_literal(r)) + " Unknown:\n" + e);
    }
    if (lv !== rv) {
      throw Error("Equation Failed:\n\t" + (function_literal(l)) + " IS " + lv + " BUT\n\t" + (function_literal(r)) + " IS " + rv + ".");
    }
  };
  assertEqOn = function(f) {
    return function(l, r) {
      var e, flv, frv, lv, rv;
      try {
        lv = l();
        rv = r();
        flv = f(lv);
        frv = f(rv);
      } catch (_error) {
        e = _error;
        throw Error("MAPPED Equation Between " + (function_literal(l)) + " And " + (function_literal(r)) + " Unknown:\n" + e);
      }
      if (flv !== frv) {
        throw Error("Equation Failed:\n\t" + (function_literal(l)) + " IS " + lv + " AND MAPPED TO " + flv + " BUT\n\t" + (function_literal(r)) + " IS " + rv + " AND MAPPED TO " + frv + ".");
      }
    };
  };
  securely = function(f) {
    return function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      args = deepcopy(args);
      return f.apply(null, args);
    };
  };
  dict = function(pairs) {
    var d, i, k, len, ref, v;
    d = {};
    for (i = 0, len = pairs.length; i < len; i++) {
      ref = pairs[i], k = ref[0], v = ref[1];
      d[k] = v;
    }
    return d;
  };
  ref = (function() {
    var cp;
    cp = function(root, dep) {
      var k, r, v;
      if (dep === 0 || (root == null) || typeof root !== 'object') {
        return root;
      }
      if (root instanceof Array) {
        r = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = root.length; i < len; i++) {
            v = root[i];
            results.push(cp(v, dep - 1));
          }
          return results;
        })();
      } else {
        r = {};
        for (k in root) {
          v = root[k];
          r[k] = cp(v, dep - 1);
        }
      }
      return r;
    };
    return {
      copy: function(obj, depth) {
        if (depth == null) {
          depth = 1;
        }
        return cp(obj, depth);
      },
      deepcopy: function(obj, depth) {
        if (depth == null) {
          depth = Infinity;
        }
        return cp(obj, depth);
      }
    };
  })(), copy = ref.copy, deepcopy = ref.deepcopy;
  extend = function(base) {
    return function() {
      var d, defaults, i, k, len, v;
      defaults = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = defaults.length; i < len; i++) {
        d = defaults[i];
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
    };
  };
  update = function(base) {
    return function() {
      var d, i, k, len, updates, v;
      updates = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = updates.length; i < len; i++) {
        d = updates[i];
        if (d != null) {
          for (k in d) {
            v = d[k];
            base[k] = v;
          }
        }
      }
      return base;
    };
  };
  override = function(_d) {
    var d, fallback;
    d = copy(_d);
    fallback = d['_'];
    if (fallback != null) {
      return function() {
        var args, ref1;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return ((ref1 = d[args.length]) != null ? ref1 : fallback).apply(null, args);
      };
    } else {
      return function() {
        var args, f;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        f = d[args.length];
        if (f == null) {
          throw Error("This Function Can't Accept " + args.length + " Args");
        } else {
          return f.apply(null, args);
        }
      };
    }
  };
  return {
    log: log,
    assert: assert,
    assertEq: assertEq,
    assertEqOn: assertEqOn,
    dict: dict,
    copy: copy,
    deepcopy: deepcopy,
    securely: securely,
    extend: extend,
    update: update,
    override: override
  };
};

module.exports = this_module();



}).call(this,require('_process'))

},{"_process":2}]},{},[1])(1)
});


//# sourceMappingURL=global.js.map