coffee_mate = do ->

###################### reinforce syntax ##########################

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

	#dict = (pairs) -> #for dict comprehensions
	#	foreach pairs, ([k, v], r) ->
	#		r[k] = v
	#	, {}

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

######################### type trans #############################

	int = (s, base) -> if typeof(s) == 'string' then (r = parseInt(s, base); unless s.slice? and r == parseInt(s.slice(0,-1), base) then r else null) else parseInt(0 + s)
	float = (s) -> if /^-?[0-9]*(\.[0-9]+)?([eE]-?[0-9]+)?$/.test(s) then parseFloat(s) else null
	str = (x, base) -> x.toString(base)
	bool = (x) -> if x in [true, false] then x else null
	hex = (x) -> x.toString(16)
	ord = (c) -> c.charCodeAt()
	chr = (x) -> String.fromCharCode(x)
	json = (it, indent) -> JSON.stringify(it, null, indent)
	obj = (s) -> JSON.parse(s)

####################### reinforce String #########################

	Object.defineProperties String.prototype,
		format:
			enumerable: false
			value: (args) ->
				@.replace /\{(\w+)\}/g, (m, i) -> if args[i]? then args[i] else m
		repeat:
			enumerable: false
			value: (n) ->
				[r, pat] = ['', @]
				while n > 0
					r += pat if n & 1
					n >>= 1
					pat += pat
				return r
		cut:
			enumerable: false
			value: (start_pat, end_pat) ->
				i = @.search(start_pat) + 1
				return null if i == 0
				j = @.substr(i).search(end_pat)
				return null if j == -1
				@.substr(i, j)

######################## reinforce Array #########################

	Object.defineProperties Array.prototype,
		first:
			get: -> @[0]
			set: (v) -> @[0] = v
		second:
			get: -> @[1]
			set: (v) -> @[1] = v
		third:
			get: -> @[2]
			set: (v) -> @[2] = v
		last:
			get: -> @[@length - 1]
			set: (v) -> @[@length - 1] = v
		repeat:
			enumerable: false
			value: (n) ->
				[r, pat] = [[], @]
				while n > 0
					r = r.concat(pat) if n & 1
					n >>= 1
					pat = pat.concat(pat)
				return r
		unique:
			enumerable: false
			value: do ->
				init = new Object
				(equal)->
					i = 0
					t = init
					if not equal?
						for x, j in @ when x != t
							@[i] = t = x
							i += 1
					else
						for x, j in @ when t is init or not equal(x, t)
							@[i] = t = x
							i += 1
					@splice(i, Infinity)
					return @

####################### reinforce Object #########################

	Object.defineProperties Object,
		size:
			enumerable: false
			value: (d) -> Object.keys(d).length
		extend:
			enumerable: false
			value: (base, defaults...) -> #NOTE: modified inplace, use copy() to protect it.
				for d in defaults when d?
					base[k] ?= v for k, v of d #NOTE: null values will be replaced if a default value exists.
				return base
		update:
			enumerable: false
			value: (base, updates...) -> #NOTE: modified inplace, use copy() to protect it.
				for d in updates when d?
					base[k] = v for k, v of d
				return base

####################### url helpers ########################

	uri_encoder = (component_packer = str) ->
		(obj) ->
			("#{encodeURIComponent(k)}=#{encodeURIComponent component_packer v}" for k, v of obj).join('&')

	uri_decoder = (component_unpacker = ((s) -> s)) ->
		(str) ->
			d = {}
			for s in (str.match /[^?=&]+=[^&]*/g) ? []
				[..., k, v] = s.match /([^=]+)=(.*)/
				d[decodeURIComponent(k)] = (component_unpacker decodeURIComponent v)
			return d

###################### pseudo-random #######################

	random_gen = do ->
		hash = (x) ->
			x = Math.sin(x) * 1e4
			x - Math.floor(x)
		(seed = Math.random()) ->
			cnt = hash(seed)
			-> hash(++cnt)

	ranged_random_gen = (range, seed = Math.random()) ->
		random = random_gen(seed)
		-> Math.floor(random() * range)

########################### lazy ###########################

	# Iterator Producers
	iter_end = new Object #can be used outside the lib via iterator.end
	iter_brk = new Object #can be used outside the lib via foreach.break

	pretty_iterator = (show, it) ->
		it.toString = show
		it.next = ->
			r = it()
			{value: r, done: r == iter_end}
		return it

	new_iterator = (init, next) ->
		status = init
		pretty_iterator (-> "Iterator: #{json status} ..."), ->
			last = status
			status = next status
			return last

	show_iter = (it) ->
		s = it.toString()
		if it.next?
			if s.startsWith('function') then 'Iterator' else s
		else
			'???'

	nature_number = (first = 0) ->
		i = first - 1
		pretty_iterator (-> "Counter: #{i + 1}, #{i + 2} ..."), -> ++i

	range = (args...) ->
		if args.length == 0
			nature_number()
		else if args.length == 1
			[stop] = args
			i = -1
			pretty_iterator (-> "Counter: #{i + 1}, #{i + 2} until #{stop}"), ->
				if ++i < stop then i else iter_end
		else if args.length == 2
			[start, stop] = args
			if start < stop
				i = start - 1
				pretty_iterator (-> "Counter: #{i + 1}, #{i + 2} until #{stop}"), ->
					if ++i < stop then i else iter_end
			else
				i = start + 1
				pretty_iterator (-> "Counter: #{i - 1}, #{i - 2} until #{stop}"), ->
					if --i > stop then i else iter_end
		else
			[start, stop, step] = args
			throw 'ERR IN range(): YOU ARE CREATING AN UNLIMITTED RANGE' if stop != start and (stop - start) * step < 0
			i = start - step
			if start < stop
				pretty_iterator (-> "Counter: #{i + step}, #{i + step + step} until #{stop}"), ->
					if (i += step) < stop then i else iter_end
			else
				pretty_iterator (-> "Counter: #{i + step}, #{i + step + step} until #{stop}"), ->
					if (i += step) > stop then i else iter_end

	prime_number = ->
		filter((x) -> all((p) -> x % p != 0) takeWhile((p) -> p * p <= x) range(2, Infinity)) range(2, Infinity)

	next_permutation = (x) ->
		l = x.length - 1
		while (l >= 1 and x[l] <= x[l - 1])
			l--

		if (l != 0)
			m = x.length - 1
			while(m > l - 1 and x[m] <= x[l - 1])
				m--
			[x[m], x[l - 1]] = [x[l - 1], x[m]]

		r = x.length - 1
		while(l < r)
			[x[l], x[r]] = [x[r], x[l]]
			l++
			r--
		return x

	permutation_gen = (arr) ->
		a = -> new_iterator arr, securely next_permutation
		concat [copy(arr)], takeWhile((ls) -> json(ls) != json(arr)) drop(1) a()

	iterate = (ls, replaced_end) ->
		i = -1
		pretty_iterator (-> "Enumerator: #{ls.join(', ')}"), ->
			i += 1
			if i < ls.length
				if ls[i] is iter_end
					if not replaced_end?
						throw 'ERR IN iterate(): iterate.done APPEARS IN Array, PASS A SECOND ARG FOR REPLACEMENT'
					replaced_end
				else
					ls[i]
			else
				iter_end

	iterator = (iterable, replaced_end) ->
		if typeof iterable is 'function'
			iterable
		else
			throw 'ERR IN iterator(): ONLY Array & Iterator IS ACCEPTABLE' if iterable not instanceof Array
			iterate(iterable, replaced_end)

	Object.defineProperties iterator,
		end:
			writable: false
			configurable: false
			enumerable: false
			value: iter_end

	enumerate = (it, replaced_end) -> # iterator with index(key for object)
		if typeof it is 'function'
			return zip((-> i = -1; (-> ++i))(), it)
		else if it instanceof Array
			return zip((-> i = -1; (-> ++i))(), it)
		else
			keys = Object.keys(it)
			i = -1
			pretty_iterator (-> "Enumerator: #{("[#{k},#{v}]" for k, v of it).join(', ')}"), ->
				if ++i < keys.length then [(k = keys[i]), it[k]] else iter_end

	# Iterator Decorators
	take = (n) ->
		if typeof n == 'number'
			(iter) ->
				iter = iterator(iter)
				c = -1
				pretty_iterator (-> "take(#{n}) #{show_iter iter}"), ->
					if ++c < n then iter() else iter_end
		else
			takeWhile(n)

	takeWhile = (ok) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			pretty_iterator (-> "takeWhile(...) #{show_iter iter}"), ->
				if (x = iter()) isnt iter_end and ok(x) then x else iter_end

	drop = (n) ->
		if typeof n == 'number'
			(iter) ->
				iter = iterator(iter) if typeof iter isnt 'function'
				finished = false
				(finished or= (iter() is iter_end); break if finished) for i in [0...n]
				if finished then (-> iter_end) else iter
		else
			dropWhile(n)

	dropWhile = (ok) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			null while ok(x = iter()) and x isnt iter_end
			pretty_iterator (-> "dropWhile(...) #{show_iter iter}"), ->
				[prevx, x] = [x, iter()]
				return prevx

	map = (f) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			pretty_iterator (-> "map(...) #{show_iter iter}"), ->
				if (x = iter()) isnt iter_end then f(x) else iter_end

	filter = (ok) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			pretty_iterator (-> "filter(...) #{show_iter iter}"), ->
				null while not ok(x = iter()) and x isnt iter_end
				return x

	scanl = (f, r) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			pretty_iterator (-> "scanl(...) #{show_iter iter}"), ->
				got = r
				r = if (x = iter()) isnt iter_end then f(r, x) else iter_end
				return got

	streak = (n) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			buf = []
			pretty_iterator (-> "streak(#{n}) #{show_iter iter}"), ->
				return iter_end if (x = iter()) is iter_end
				buf.push(x)
				buf.shift(1) if buf.length > n
				return buf[...]

	reverse = (iter) ->
		ls = if typeof iter is 'function' then list iter else copy iter
		return iterator ls.reverse()

	# Iterator Combiners
	concat = (iters...) ->
		iters[i] = iterator(iter) for iter, i in iters when typeof iter isnt 'function'
		[iter, current_index] = [iters[0], 0]
		pretty_iterator (-> "concat #{(show_iter it for it in iters).join(', ')}"), ->
			if (x = iter()) isnt iter_end
				return x
			else if (++current_index < iters.length)
				iter = iters[current_index]
				return iter()
			else
				return iter_end

	zip = (iters...) ->
		iters[i] = iterator(iter) for iter, i in iters when typeof iter isnt 'function'
		finished = do ->
			another_end = new Object
			any_is_end = any (x) -> x is another_end
			(ls) -> any_is_end iterator(ls, another_end)
		pretty_iterator (-> "zip #{(show_iter it for it in iters).join(', ')}"), ->
			next = (iter() for iter in iters)
			if finished(next)
				return iter_end
			else
				return next

	cartProd = do ->
		inc_vector = (limits) ->
			len_minus_1 = limits.length - 1
			(vec) ->
				i = len_minus_1
				vec[i--] = 0 until ++vec[i] < limits[i] or i <= 0
				vec

		#desc_vector = (limits) ->
		#	len_minus_1 = limits.length - 1
		#	(vec) ->
		#		i = len_minus_1
		#		vec[i] = limits[i--] - 1 until --vec[i] >= 0 or i <= 0
		#		vec

		apply_vector = (space) ->
			len = space.length
			(vec) ->
				(space[i][vec[i]] for i in [0...len])

		(iters...) -> #cartesian_product: recover the lack of nested list comprehensions
			sets = (list(set) for set in iters)
			limits = (sets[i].length for i in [0...sets.length])
			inc = inc_vector(limits)
			get_value = apply_vector(sets)
			v = (0 for i in [0...sets.length])
			pretty_iterator (-> "cartProd #{(show_iter it for it in iters).join(', ')}"), ->
				if v[0] < limits[0] then (r = get_value v; inc v; r) else iter_end

	#cartProd = (sets...) ->
	#	sets = (list(set) for set in sets)
	#	rst = []
	#	len = sets.length
	#	rec = (st, d) ->
	#		if d == len
	#			rst.push(st)
	#		else
	#			rec(st.concat([x]), d + 1) for x in sets[d]
	#	rec([], 0)
	#	return rst

	# Iterator Consumers
	list = (it) -> #force the iterator to get the array
		return it if typeof it isnt 'function'
		(x while (x = it()) isnt iter_end)

	foreach = (iter, callback, fruit) ->
		iter = iterator(iter) if typeof iter isnt 'function'
		while (x = iter()) isnt iter_end
			break if callback(x, fruit) is iter_brk
		fruit

	Object.defineProperties foreach,
		break:
			writable: false
			configurable: false
			enumerable: false
			value: iter_brk

	foldl = (f, r) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			r = f(r, x) while (x = iter()) isnt iter_end
			return r

	best = (better) ->
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			return null if (r = iter()) is iter_end
			while (it = iter()) isnt iter_end
				r = if better(it, r) then it else r
			return r

	all = (f) ->
		f = ((x) -> x is f) if typeof(f) isnt 'function'
		(iter) ->
			iter = iterator(iter) if typeof iter isnt 'function'
			while (x = iter()) isnt iter_end
				return false if not f(x)
			return true

	any = (f) ->
		all_not = all (x) -> not f(x)
		(iter) -> not (all_not iter)

	last = (iter, empty_sign) -> #empty_sign is returned if the iter is empty, defaults to undefined
		iter = iterator(iter) if typeof iter isnt 'function'
		r = empty_sign
		r = x while (x = iter()) isnt iter_end
		return r

##################### funny functions ######################

	church = (n) -> #the nth church number
		iter = (f, n, r) ->
			if n == 0 then r else iter(f, n - 1, f(r))
		(f) ->
			(x) -> iter(f, n + 0, x)

	Y = (f) -> #the Y combinator
		((x) -> (x x)) ((x) -> (f ((y) -> ((x x) y))))

	memoize = (f, get_key = ((args...) -> json(args))) ->
		cache = {}
		(args...) ->
			key = get_key(args...)
			cached = cache[key]
			if cached?
				cached
			else
				r = f(args...)
				cache[key] = r
				r

################ mathematical functions ####################

	square = (n) -> n * n
	cube = (n) -> n * n * n
	abs = Math.abs
	floor = Math.floor
	ceil = Math.ceil

	accept_multi_or_array = (f) ->
		(arr...) ->
			f(if arr.length == 1 and arr.first instanceof Array then arr.first else arr)

	sum = accept_multi_or_array (arr) ->
		arr = arr.first if arr.length == 1 and arr.first instanceof Array
		r = 0
		r += x for x in arr
		r

	max = accept_multi_or_array (arr) ->
		best((a, b) -> a > b) arr

	min = accept_multi_or_array (arr) ->
		best((a, b) -> a < b) arr

	max_index = accept_multi_or_array (arr) ->
		best((i, j) -> arr[i] > arr[j]) [0...arr.length]

	min_index = accept_multi_or_array (arr) ->
		best((i, j) -> arr[i] < arr[j]) [0...arr.length]

########################### exports ##############################

	return {
		log, assert, assertEq, assertEqOn, dict, copy, deepcopy, securely,

		int, float, bool, str, hex, ord, chr, json, obj,

		uri_encoder, uri_decoder,

		iterator, enumerate, new_iterator, pretty_iterator,

		range, nature_number, prime_number, random_gen, ranged_random_gen, permutation_gen,

		map, filter, take, takeWhile, drop, dropWhile, scanl, streak, reverse,

		concat, zip, cartProd,

		list, last, foldl, best, all, any, foreach,

		church, Y, memoize,

		square, cube, abs, floor, ceil, sum, max, min, max_index, min_index, next_permutation,
	}

if window?
	window.coffee_mate = coffee_mate
	window._ ?= coffee_mate
else
	module.exports = coffee_mate

