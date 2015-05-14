(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
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

},{}],2:[function(require,module,exports){
!function n(r,t,u){function e(i,f){if(!t[i]){if(!r[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(o)return o(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[i]={exports:{}};r[i][0].call(l.exports,function(n){var t=r[i][1][n];return e(t?t:n)},l,l.exports,n,r,t,u)}return t[i].exports}for(var o="function"==typeof require&&require,i=0;i<u.length;i++)e(u[i]);return e}({1:[function(n,r){var t,u=[].slice;t=function(n){var r,t,e,o,i,f,c,a,l,v,h,s,p,g,y,m,d,b,z,S,x,E,A,M,N,k,L,O,_,w,I,R,W,j,q,T,U,D;return r=n.Symbol,z=function(n){return n[r.iterator]=function(){return n()},n.toString=function(){return"LazyList"},n},M=z(function(){return M}),M.toString=function(){return"nil"},m=function(n){return n.next=function(){var r;return r=n(),{value:r,done:r===M}},n.toString=function(){return"Iterator"},n},A=z(function(){var n;return n=-1,m(function(){return++n})}),O=function(){var n;return n=1<=arguments.length?u.call(arguments,0):[],0===n.length?A:z(1===n.length?function(){var r,t;return t=n[0],r=-1,m(function(){return++r<t?r:M})}:2===n.length?function(){var r,t,u;return t=n[0],u=n[1],u>t?(r=t-1,m(function(){return++r<u?r:M})):(r=t+1,m(function(){return--r>u?r:M}))}:function(){var r,t,u,e;if(t=n[0],e=n[1],u=n[2],e!==t&&0>(e-t)*u)throw"ERR IN range(): YOU ARE CREATING AN UNLIMITTED RANGE";return r=t-u,m(e>t?function(){return(r+=u)<e?r:M}:function(){return(r+=u)>e?r:M})})},k=z(function(){return s(function(n){return t(function(r){return n%r!==0})(T(function(r){return n>=r*r})(O(2,1/0)))})(O(2,1/0))()}),b=function(n){return z("function"==typeof n?n:null!=n[r.iterator]?function(){var t;return t=n[r.iterator](),m(function(){var n;return n=t.next(),n.done?M:n.value})}:function(){var r;return r=-1,m(function(){return r+=1,r<n.length?n[r]:M})})},h=function(n){return null!=n[r.iterator]||n instanceof Array?U(A,n):z(function(){var r,t;return t=Object.keys(n),r=-1,m(function(){var u;return++r<t.length?[u=t[r],n[u]]:M})})},I=function(n){return z(function(){return m(function(){return n})})},y=function(n,r){return z(function(){var t;return t=n,m(function(){var n;return n=t,t=r(t),n})})},L=function(){var n;return n=function(n){return n=1e4*Math.sin(n),n-Math.floor(n)},function(r){var t,u;return u=n(null!=(t=null!=r?r.seed:void 0)?t:Math.random()),y(u,n)}}(),_=function(n,r){var t,u;return u=null!=(t=null!=r?r.seed:void 0)?t:Math.random(),E(function(r){return Math.floor(r*n)})(L({seed:u}))},N=function(){var n;return n=function(n){var r,t,u,e,o;for(n=n.slice(0),r=n.length-1;r>=1&&n[r]<=n[r-1];)--r;if(0!==r){for(t=n.length-1;t>r-1&&n[t]<=n[r-1];)--t;e=[n[r-1],n[t]],n[t]=e[0],n[r-1]=e[1]}for(u=n.length-1;u>r;)o=[n[u],n[r]],n[r]=o[0],n[u]=o[1],++r,--u;return n},function(r){return 0===r.length?M:c([r.slice(0)],T(function(n){return json(n)!==json(r)})(l(1)(y(r,n))))}}(),q=function(n){return function(t){return z(function(){var u,e;return e=("function"==typeof t?t:b(t))[r.iterator](),u=-1,m(function(){return++u<n?e():M})})}},T=function(n){return function(t){return z(function(){var u;return u=("function"==typeof t?t:b(t))[r.iterator](),m(function(){var r;return(r=u())!==M&&n(r)?r:M})})}},l=function(n){return function(t){return z(function(){var u,e,o,i,f;for(o=("function"==typeof t?t:b(t))[r.iterator](),u=!1,e=i=0,f=n;(f>=0?f>i:i>f)&&(u||(u=o()===M),!u);e=f>=0?++i:--i);return u?function(){return M}:o})}},v=function(n){return function(t){return z(function(){var u,e;for(u=("function"==typeof t?t:b(t))[r.iterator]();n(e=u())&&e!==M;);return m(function(){var n,r;return r=[e,u()],n=r[0],e=r[1],n})})}},a=function(n){return function(t){return z(function(){var u;return u=null,m(function(){return null===u?(u=("function"==typeof t?t:b(t))[r.iterator](),n):u()})})}},E=function(n){return function(t){return z(function(){var u;return u=("function"==typeof t?t:b(t))[r.iterator](),m(function(){var r;return(r=u())!==M?n(r):M})})}},s=function(n){return function(t){return z(function(){var u;return u=("function"==typeof t?t:b(t))[r.iterator](),m(function(){for(var r;!n(r=u())&&r!==M;);return r})})}},W=function(n,t){return function(u){return z(function(){var e;return e=("function"==typeof u?u:b(u))[r.iterator](),m(function(){var r,u;return r=t,t=(u=e())!==M?n(t,u):M,r})})}},j=function(n){return function(t){return z(function(){var u,e;return e=("function"==typeof t?t:b(t))[r.iterator](),u=[],m(function(){var r;return(r=e())===M?M:(u.push(r),u.length>n&&u.shift(1),u.slice(0))})})}},R=function(n){var r;return r="function"==typeof n?x(n):copy(n),b(r.reverse())},c=function(){var n;return n=1<=arguments.length?u.call(arguments,0):[],z(function(){var t,u;return u=(null!=n[0][r.iterator]?n[0]:b(n[0]))[r.iterator](),t=0,m(function(){var e;return(e=u())!==M?e:++t<n.length?(u=(null!=n[t][r.iterator]?n[t]:b(n[t]))[r.iterator]())():M})})},w=function(){var n,t,e;return n=function(n){var r,t,u;for(r=0,t=n.length;t>r;r++)if(u=n[r],u===M)return!0;return!1},t=function(){var t;return t=1<=arguments.length?u.call(arguments,0):[],z(function(){var u,e;return u=function(){var n,u,o;for(o=[],n=0,u=t.length;u>n;n++)e=t[n],o.push(("function"==typeof e?e:b(e))[r.iterator]());return o}(),m(function(){var r,t;return t=function(){var n,t,e;for(e=[],n=0,t=u.length;t>n;n++)r=u[n],e.push(r());return e}(),n(t)?M:t})})},e=function(t){return function(){var e;return e=1<=arguments.length?u.call(arguments,0):[],z(function(){var u,o;return u=function(){var n,t,u;for(u=[],n=0,t=e.length;t>n;n++)o=e[n],u.push(("function"==typeof o?o:b(o))[r.iterator]());return u}(),m(function(){var r,e;return e=function(){var n,t,e;for(e=[],n=0,t=u.length;t>n;n++)r=u[n],e.push(r());return e}(),n(e)?M:t.apply(null,e)})})}},{zip:t,zipWith:e}}(),U=w.zip,D=w.zipWith,f=function(){var n,r;return r=function(n){var r;return r=n.length-1,function(t){var u;for(u=r;!(++t[u]<n[u]||0>=u);)t[u--]=0;return t}},n=function(n){var r;return r=n.length,function(t){var u,e,o,i;for(i=[],u=e=0,o=r;o>=0?o>e:e>o;u=o>=0?++e:--e)i.push(n[u][t[u]]);return i}},function(){var t;return t=1<=arguments.length?u.call(arguments,0):[],z(function(){var u,e,o,i,f,c,a,l,v;for(t=function(){var n,r,u;for(u=[],n=0,r=t.length;r>n;n++)v=t[n],u.push(x(v));return u}(),a=function(){var n,r,u;for(u=[],e=n=0,r=t.length;r>=0?r>n:n>r;e=r>=0?++n:--n)u.push(t[e].length);return u}(),i=0,c=a.length;c>i;i++)if(f=a[i],0===f)return M;return o=r(a),u=n(t),l=function(){var n,r,u;for(u=[],e=n=0,r=t.length;r>=0?r>n:n>r;e=r>=0?++n:--n)u.push(0);return u}(),m(function(){var n;return l[0]<a[0]?(n=u(l),o(l),n):M})})}}(),x=function(n){var t,u,e,o,i;if("number"==typeof n)return u=n,function(n){return x(q(u)(n))};if("function"==typeof n){for(t=n[r.iterator](),e=[];(i=t())!==M;)e.push(i);return e}if(null!=n[r.iterator]){for(t=b(n)[r.iterator](),o=[];(i=t())!==M;)o.push(i);return o}if(n instanceof Array)return n;throw Error("list(xs): xs is neither LazyList nor Array")},d=function(n){var t,u,e,o;if(null==n[r.iterator])return null!=(e=n[n.length-1])?e:M;for(t=("function"==typeof n?n:b(n))[r.iterator](),u=M;(o=t())!==M;)u=o;return u},S=function(n){var t,u,e;if(null==n[r.iterator])return n.length;for(t=("function"==typeof n?n:b(n))[r.iterator](),u=0;(e=t())!==M;)++u;return u},p=function(n,t){return function(u){var e,o,i;for(o=t,e=("function"==typeof u?u:b(u))[r.iterator]();(i=e())!==M;)o=n(o,i);return o}},o=function(n){return function(t){var u,e,o;if(e=("function"==typeof t?t:b(t))[r.iterator](),(o=e())===M)return null;for(;(u=e())!==M;)o=n(u,o)?u:o;return o}},t=function(n){return"function"!=typeof n&&(n=function(r){return r===n}),function(t){var u,e;for(u=("function"==typeof t?t:b(t))[r.iterator]();(e=u())!==M;)if(!n(e))return!1;return!0}},e=function(n){var r;return r=t(function(r){return!n(r)}),function(n){return!r(n)}},i=function(){return i},i.toString=function(){return"foreach.break"},g=function(n,t,u){var e,o;for(e=("function"==typeof n?n:b(n))[r.iterator]();(o=e())!==M&&t(o,u)!==i;);return u},Object.defineProperties(g,{"break":{writable:!1,configurable:!1,enumerable:!1,value:i}}),{nil:M,lazylist:z,iterator:m,Symbol:r,naturals:A,range:O,primes:k,lazy:b,enumerate:h,repeat:I,generate:y,random_gen:L,ranged_random_gen:_,permutation_gen:N,cons:a,map:E,filter:s,take:q,takeWhile:T,drop:l,dropWhile:v,scanl:W,streak:j,reverse:R,concat:c,zip:U,zipWith:D,cartProd:f,list:x,last:d,length:S,foldl:p,best:o,all:t,any:e,foreach:g}},r.exports=t({Symbol:"undefined"!=typeof Symbol&&null!==Symbol?Symbol:{iterator:"iter"}})},{}]},{},[1]);
//# sourceMappingURL=lazy.coffee.js.map
},{}],3:[function(require,module,exports){
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



},{"lazy.coffee":2}],4:[function(require,module,exports){
var basics, convertors, funny, lazy, url_helpers, utils;

utils = require('./utils');

basics = require('./basics');

lazy = require('lazy.coffee');

funny = require('./funny');

convertors = require('./convertors');

url_helpers = require('./url-helpers');

module.exports = utils.extend({})(utils, basics, lazy, funny, convertors, url_helpers);



},{"./basics":3,"./convertors":5,"./funny":6,"./url-helpers":9,"./utils":10,"lazy.coffee":2}],5:[function(require,module,exports){
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



},{}],6:[function(require,module,exports){
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



},{}],7:[function(require,module,exports){
(function (global){
var k, mate, v;

require('./reinforce');

mate = require('./coffee-mate');

for (k in mate) {
  v = mate[k];
  global[k] = v;
}



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./coffee-mate":4,"./reinforce":8}],8:[function(require,module,exports){
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

},{"_process":1}]},{},[7])


//# sourceMappingURL=global.js.map