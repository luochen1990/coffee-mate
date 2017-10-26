this_module = () ->
	simpl = (lit) ->
		lit = lit.replace(/^\s*\(\s*function\s*\(\s*\)\s*{\s*return\s*([^]*?);?\s*}\s*\)\s*\(\s*\)\s*$/, '$1')
		lit = lit.replace(/^\s*\(\s*\(\s*\)\s*=>\s*{\s*return\s*([^]*?);?\s*}\s*\)\s*\(\s*\)\s*$/, '$1')
		lit = lit.replace(/^\s*\(\s*\(\s*\)\s*=>\s*([^]*?)\s*\)\s*\(\s*\)\s*$/, '$1')
		return lit

	literal = (thunk) ->
		s0 = "(#{thunk.toString()})()"
		s1 = simpl(s0)
		until s1 == s0
			s0 = s1
			s1 = simpl(s1)
		s2 = s0.replace(/[\r\n]{1,2}\s*/g, '') #inline
		r = if s2.length <= 60 then s2 else s0
		return r

	time_now = ->
		(new Date).getTime()

	log = do -> #log an expression with it's literal and time used
		dye = do ->
			# ANSI Terminal Colors.
			cavailable = (not window?) and process? and not process.env.NODE_DISABLE_COLORS
			palette =
				bold: '\x1B[0;1m'
				red: '\x1B[0;31m'
				green: '\x1B[0;32m'
				yellow: '\x1B[0;33m'
				blue: '\x1B[0;34m'
				bold_grey: '\x1B[1;30m'
			if not cavailable
				(color) -> (s) -> s
			else
				(color) ->
					(s) -> "#{palette[color]}#{s}#{'\x1B[0m'}"

		log_label = do ->
			flag_palette =
				'#': 'bold_grey'
				'I': 'green'
				'E': 'red'
				'W': 'yellow'
			op_flag = (op) ->
				if op == 'log' then '#' else op[0].toUpperCase()
			(op) ->
				flag = op_flag(op)
				dye(flag_palette[flag]) flag

		histories = []
		factory = (op) ->
			prefix = "#{dye('bold_grey') '#'}#{log_label op}"
			(args...) ->
				ball = []
				for f in args
					if typeof f == 'function'
						expr = literal(f)
						start_time = time_now()
						eval_result = f()
						time_used = time_now() - start_time
						ball.push("#{prefix} #{dye('green') expr} #{dye('bold_grey') '==>'}", eval_result)
						ball.push(dye('yellow') "[#{time_used}ms]") if time_used > 0
					else
						ball.push("#{prefix}", f)
				console[op] ball...
				histories.push(ball)
				histories.shift() if histories.length >= 10
				return null
		got = factory('log')
		got.histories = histories
		got.info = factory('info')
		got.warn = factory('warn')
		got.error = got.err = factory('error')
		return got

	assert = (f, msg) ->
		[msg, f] = [f, msg] if f not instanceof Function
		try
			r = f()
		catch e
			throw Error "Assertion Not Available: #{literal(f)}\n  Inner Error: #{e}"
		if not (r is true)
			if msg? and msg instanceof Function
				msg(literal(f))
			else
				throw Error "Assertion Failed: #{msg ? literal(f)}"

	assertEq = (l, r, msg) ->
		[msg, l, r] = [l, r, msg] if l not instanceof Function
		try
			lv = l()
			rv = r()
		catch e
			throw Error "Equation Not Available: ( #{literal(l)} ) == ( #{literal(r)} )\n  Inner Error: #{e}"
		if lv isnt rv
			if msg? and msg instanceof Function
				msg(literal(l), literal(r))
			else
				throw Error "Equation Does Not Hold:\n  Left Expr  : #{literal(l)}\n  Right Expr : #{literal(r)}\n  Left Value : #{lv}\n  Right Value: #{rv}\n"

	assertEqOn = (f) -> (l, r, msg) ->
		[msg, l, r] = [l, r, msg] if l not instanceof Function
		try
			lv = l()
			rv = r()
			flv = f(lv)
			frv = f(rv)
		catch e
			throw Error "Equation Not Available: ( #{literal(l)} ) == ( #{literal(r)} ) ON #{f.name}\n  Inner Error: #{e}"
		if flv isnt frv
			if msg? and msg instanceof Function
				msg(literal(l), literal(r), f.name)
			else
				throw Error "Equation Does Not Hold:\n  Left Expr  : #{literal(l)}\n  Right Expr : #{literal(r)}\n  Compared On: #{f.name}\n  Left Value : #{flv}\n  Right Value: #{frv}\n"

	purify = (f) -> # ensure a function not to modify it's arguments
		(args...) ->
			args = deepcopy args
			f(args...)

	dict = (pairs) -> #for dict comprehensions
		d = {}
		d[k] = v for [k, v] in pairs
		return d

	{copy, deepcopy} = do ->
		cp = (root, dep) ->
			return root if dep == 0 or not root? or typeof(root) != 'object'
			if root instanceof Array
				r = (cp(v, dep-1) for v in root)
			else
				r = {}
				r[k] = cp(v, dep-1) for k, v of root
			return r
		copy: (obj, depth=1) -> cp(obj, depth)
		deepcopy: (obj, depth=Infinity) -> cp(obj, depth)

	extend = (base) -> (defaults...) -> #NOTE: modified inplace, use copy() to protect it.
		for d in defaults when d?
			base[k] ?= v for k, v of d #NOTE: null values will be replaced if a default value exists.
		return base

	update = (base) -> (updates...) -> #NOTE: modified inplace, use copy() to protect it.
		for d in updates when d?
			base[k] = v for k, v of d
		return base

	overload = (_d) ->
		d = copy _d
		fallback = d['_']
		if fallback?
			(args...) ->
				(d[args.length] ? fallback) args...
		else
			(args...) ->
				f = d[args.length]
				if not f?
					throw Error "This Function Can't Accept #{args.length} Args"
				else
					return f args...

	return {
		log, assert, assertEq, assertEqOn, dict, copy, deepcopy, purify, extend, update, overload,
	}

module.exports = this_module()

