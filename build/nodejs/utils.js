(function() {
  var this_module,
    slice = [].slice;

  this_module = function() {
    var assert, assertEq, assertEqOn, copy, deepcopy, dict, extend, function_literal, log, overload, ref, securely, time_now, update;
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
    overload = function(_d) {
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
      overload: overload
    };
  };

  module.exports = this_module();

}).call(this);

//# sourceMappingURL=utils.js.map