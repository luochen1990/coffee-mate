this_module = () ->
	function_literal = (f) ->
		expr = f.toString().replace(/^\s*function\s?\(\s?\)\s?{\s*return\s*([^]*?);?\s*}$/, '$1')
		expr = expr.replace(/[\r\n]{1,2}\s*/g, '') if expr.length <= 100
		return expr

	time_now = ->
		(new Date).getTime()

	log = do -> #log an expression with it's literal and time used
		dye = do ->
			# ANSI Terminal Colors.
			cavailable = process? and not process.env.NODE_DISABLE_COLORS
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
						expr = function_literal(f)
						start_time = time_now()
						eval_result = f()
						time_used = time_now() - start_time
						ball.push("#{prefix} #{dye('green') expr} #{dye('bold_grey') '==>'}", f())
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
		[f, msg] = [msg, f] if f not instanceof Function
		try
			throw Error "Assertion #{msg ? function_literal(f)} Failed!" if not f()
		catch e
			throw Error "Assertion #{msg ? function_literal(f)} Unknown:\n#{e}"

	assertEq = (l, r) ->
		try
			lv = l()
			rv = r()
		catch e
			throw Error "Equation Between #{function_literal(l)} And #{function_literal(r)} Unknown:\n#{e}"
		if lv isnt rv
			throw Error "Equation Failed:\n\t#{function_literal(l)} IS #{lv} BUT\n\t#{function_literal(r)} IS #{rv}."

	assertEqOn = (f) -> (l, r) ->
		try
			lv = l()
			rv = r()
			flv = f(lv)
			frv = f(rv)
		catch e
			throw Error "MAPPED Equation Between #{function_literal(l)} And #{function_literal(r)} Unknown:\n#{e}"
		if flv isnt frv
			throw Error "Equation Failed:\n\t#{function_literal(l)} IS #{lv} AND MAPPED TO #{flv} BUT\n\t#{function_literal(r)} IS #{rv} AND MAPPED TO #{frv}."

	securely = (f) -> # ensure a function not to modify it's arguments
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

	return {
		log, assert, assertEq, assertEqOn, dict, copy, deepcopy, securely, extend, update,
	}

module.exports = this_module()

