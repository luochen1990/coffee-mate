coffee_mate = do ->

###################### reinforce syntax ##########################

	log = do ->
		histories = []
		foo = (op) -> (args...) ->
			ball = []
			for f in args
				if typeof f == 'function'
					expr = f.toString().replace(/^\s*function\s?\(\s?\)\s?{\s*return\s*([^]*?);?\s*}$/, '$1')
					expr = expr.replace(/[\r\n]{1,2}\s*/g, '') if expr.length <= 100
					ball.push("## #{expr} ==>", f())
				else
					ball.push('##', f)
			console[op] ball...
			histories.push(ball)
			histories.shift() if histories.length >= 10
			return null
		ret = foo('log')
		ret.histories = histories
		ret.info = foo('info')
		ret.warn = foo('warn')
		ret.error = ret.err = foo('error')
		return ret

	sleep = (seconds, callback) -> setTimeout(callback, seconds * 1000)

	dict = (pairs) -> #constract object from list of pairs; recover the lack of dict comprehensions
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
		uri_decode:
			enumerable: false
			value: (unpacker = ((s) -> s)) ->
				d = {}
				for s in (@match /[^?=&]+=[^&]*/g) ? []
					[..., k, v] = s.match /([^=]+)=(.*)/
					d[decodeURIComponent(k)] = (unpacker decodeURIComponent v)
				return d

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

	Object.defineProperties Object.prototype,
		len:
			get: -> Object.keys(@).length
		extend:
			enumerable: false
			value: (defaults...) -> #NOTE: modified inplace, use copy() to protect it.
				for d in defaults when d?
					@[k] ?= v for k, v of d #NOTE: null values will be replaced if a default value exists.
				return @
		update:
			enumerable: false
			value: (updates...) ->
				for d in updates when d?
					@[k] = v for k, v of d
				return @
		uri_encode:
			enumerable: false
			value: (packer = str) ->
				("#{encodeURIComponent(k)}=#{encodeURIComponent packer v}" for k, v of @).join('&')

###################### simple pseudo-random ######################

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

######################## logic functions #########################

	iter_end = new Object #can be used outside the lib via iterator.end
	iter_brk = new Object #can be used outside the lib via foreach.break

	nature_number = (first = 0) -> i = first-1; (-> ++i)

	range = (args...) ->
		if args.length == 0
			i = -1
			(-> ++i)
		else if args.length == 1
			[stop] = args
			i = -1
			(-> if ++i < stop then i else iter_end)
		else if args.length == 2
			[start, stop] = args
			if start < stop
				i = start - 1
				(-> if ++i < stop then i else iter_end)
			else
				i = start + 1
				(-> if --i > stop then i else iter_end)
		else
			[start, stop, step] = args
			throw 'ERR IN range(): YOU ARE CREATING AN UNLIMITTED RANGE' if stop != start and (stop - start) * step < 0
			i = start - step
			if start < stop
				(-> if (i += step) < stop then i else iter_end)
			else
				(-> if (i += step) > stop then i else iter_end)

	iterator = (iterable, replaced_end) ->
		return iterable if typeof(iterable) is 'function'
		throw 'ERR IN iterator(): ONLY Array & Iterator IS ACCEPTABLE' if not iterable instanceof Array
		i = -1
		->
			i += 1
			if i < iterable.length
				if iterable[i] is iter_end
					if not replaced_end?
						throw 'ERR IN iterator(): iterator.end APPEARS IN LIST, PASS A SECOND ARG FOR REPLACEMENT'
					replaced_end
				else
					iterable[i]
			else
				iter_end

	Object.defineProperties iterator,
		end:
			writable: false
			configurable: false
			enumerable: false
			value: iter_end

	list = (iterable) ->
		return iterable if typeof(iterable) isnt 'function'
		(x while (x = iterable()) isnt iter_end)

	head = (n) -> (iter) ->
		iter = iterator(iter)
		c = -1
		-> if ++c < n then iter() else iter_end

	tail = (n) -> (iter) ->
		iter = iterator(iter)
		finished = false
		(finished or= (iter() is iter_end); break if finished) for i in [0...n]
		if finished then (-> iter_end) else iter

	foreach = (iterable, callback, fruit) ->
		iter = iterator(iterable)
		while (x = iter()) isnt iter_end
			break if callback(x, fruit) is iter_brk
		fruit

	Object.defineProperties foreach,
		break:
			writable: false
			configurable: false
			enumerable: false
			value: iter_brk

	filter = (ok) ->
		(iter) ->
			iter = iterator(iter)
			->
				null while not ok(x = iter()) and x isnt iter_end
				return x

	best = (better) ->
		(iter) ->
			iter = iterator(iter)
			return null if (r = iter()) is iter_end
			while (it = iter()) isnt iter_end
				r = if better(it, r) then it else r
			return r

	all = (f) ->
		f = ((x) -> x is f) if typeof(f) isnt 'function'
		(iter) ->
			iter = iterator(iter)
			while (x = iter()) isnt iter_end
				return false if not f(x)
			return true

	any = (f) ->
		all_not = all (x) -> not f(x)
		(iter) -> not (all_not iter)

	zip = (iters...) ->
		iters = (iterator(iter) for iter in iters)
		finished = do ->
			another_end = new Object
			any_is_end = any (x) -> x is another_end
			(ls) -> any_is_end iterator(ls, another_end)
		->
			next = (iter() for iter in iters)
			if finished(next)
				return iter_end
			else
				return next

	enumerate = (iterable, replaced_end) ->
		iterable = iterator(iterable) if iterable instanceof Array
		if typeof(iterable) is 'function'
			return zip((-> i = -1; (-> ++i))(), iterable)
		else
			keys = Object.keys(iterable)
			i = -1
			->
				if ++i < keys.length then [(k = keys[i]), iterable[k]] else iter_end

	inc_vector = (limits) ->
		len_minus_1 = limits.length - 1
		(vec) ->
			i = len_minus_1
			vec[i--] = 0 until ++vec[i] < limits[i] or i <= 0
			vec

	desc_vector = (limits) ->
		len_minus_1 = limits.length - 1
		(vec) ->
			i = len_minus_1
			vec[i] = limits[i--] - 1 until --vec[i] >= 0 or i <= 0
			vec
 
	apply_vector = (space) ->
		len = space.length
		(vec) ->
			(space[i][vec[i]] for i in [0...len])

	cart = (iters...) -> #cartesian_product: recover the lack of nested list comprehensions
		sets = (list(set) for set in iters)
		limits = (sets[i].length for i in [0...sets.length])
		inc = inc_vector(limits)
		get_value = apply_vector(sets)
		v = (0 for i in [0...sets.length])
		->
			if v[0] < limits[0] then (r = get_value v; inc v; r) else iter_end

	#cart = (sets...) ->
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

	church = (n) -> #the nth church number
		iter = (f, n, r) ->
			if n == 0 then r else iter(f, n - 1, f(r))
		(f) ->
			(x) -> iter(f, n + 0, x)

	Y = (f) ->
		((x) -> (x x)) ((x) -> (f ((y) -> ((x x) y))))

	memorize = (f, get_key = ((args...) -> json(args))) ->
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

#################### mathematical functions ######################

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
		log: log
		sleep: sleep
		dict: dict
		copy: copy
		deepcopy: deepcopy

		int: int
		float: float
		bool: bool
		str: str
		hex: hex
		ord: ord
		chr: chr
		json: json
		obj: obj

		random_gen: random_gen
		ranged_random_gen: ranged_random_gen

		iterator: iterator
		list: list
		foreach: foreach
		filter: filter
		enumerate: enumerate
		nature_number: nature_number
		range: range
		head: head
		tail: tail
		best: best
		all: all
		any: any
		zip: zip
		cart: cart
		church: church
		Y: Y
		memorize: memorize

		square: square
		cube: cube
		abs: abs
		floor: floor
		ceil: ceil
		sum: sum
		max: max
		min: min
		max_index: max_index
		min_index: min_index
	}

if window?
	window.coffee_mate = coffee_mate
	window._ ?= coffee_mate
else
	module.exports = coffee_mate

