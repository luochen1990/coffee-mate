coffee_mate = do ->

###################### reinforce syntax ##########################

	log = do ->
		logs = []
		foo = (args...) ->
			op = if args.slice(-1)[0] in ['log', 'warn', 'error'] then args.pop() else 'log'
			ball = []
			for f in args
				if typeof f == 'function'
					expr = f.toString().replace(/^\s*function\s?\(\s?\)\s?{\s*return\s*([^]*?);?\s*}$/, '$1')
					expr = expr.replace(/[\r\n]{1,2}\s*/g, '') if expr.length <= 100
					ball.push("## #{expr} ==>", f())
				else
					ball.push('##', f)
			console[op] ball...
			logs.push(ball)
		foo.logs = logs
		foo

	sleep = (seconds, callback) -> setTimeout(callback, seconds * 1000)

	dict = (pairs) -> #constract object from list of pairs; recover the lack of dict comprehensions
		d = {}
		d[k] = v for [k, v] in pairs
		d

	{copy, deepcopy} = do ->
		cp = (root, dep) ->
			return root if dep == 0 or typeof(root) != 'object'
			if root instanceof Array
				r = (cp(v, dep-1) for v in root)
			else
				r = {}
				r[k] = cp(v, dep-1) for k, v of root
			r
		copy: (obj, depth=1) -> cp(obj, depth)
		deepcopy: (obj, depth=Infinity) -> cp(obj, depth)

######################### type trans #############################

	int = (s, base) -> if typeof(s) == 'string' then (r = parseInt(s, base); unless s.slice? and r == parseInt(s.slice(0,-1), base) then r else null) else parseInt(0 + s)
#	int('2') ==> 2
#	int('2.34') ==> null
#	int('2.34.56') ==> null
#	int(2) ==> 2
#	int(2.34) ==> 2
#	int(true) ==> 1
#	int(false) ==> 0
	float = (s) -> if /^-?[0-9]*(\.[0-9]+)?([eE]-?[0-9]+)?$/.test(s) then parseFloat(s) else null
	str = (x, base) -> x.toString(base)
	bool = (x) -> if x in [true, false] then x else null
	hex = (x) -> x.toString(16)
	ord = (c) -> c.charCodeAt()
	chr = (x) -> String.fromCharCode(x)
	json = (it, indent) -> JSON.stringify(it, null, indent)
	obj = (s) -> JSON.parse(s)

####################### reinforce String #########################

	String::format = (args) ->
		@.replace /\{(\w+)\}/g, (m, i) -> if args[i]? then args[i] else m

	String::repeat = (n) ->
		[r, pat] = ['', @]
		while n > 0
			r += pat if n & 1
			n >>= 1
			pat += pat
		return r

	String::cut = (start_pat, end_pat) ->
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
		last:
			get: -> @[@length - 1]
			set: (v) -> @[@length - 1] = v
		unique:
			writable: false
			configurable: false
			enumerable: false
			value: ->
				i = 0
				t = new Object
				for x, j in @ when x != t
					@[i] = t = x
					i += 1
				@.splice(i, Infinity)
				return @

###################### reinforce Dictionary ######################

	extend = (base, defaults...) ->
		r = base ? {} #NOTE: to avoid modifying base inplace: `extend(copy(base), default)` or `extend({}, base, default)`
		for d in defaults
			r[k] ?= v for k, v of d if d? #NOTE: null value will be replaced if a default value exists.
		return r #NOTE: you should always use `a = extend(a, b)` instead of `extend(a, b)` since when a is null extend won't be inplace

	size = (obj) -> Object.keys(obj).length

######################### url helpers ############################

	uri_encode = (obj, packer = ((o) -> str(o))) ->
		return '' if obj is null
		("#{encodeURIComponent(k)}=#{encodeURIComponent packer v}" for k, v of obj).join('&')

	uri_decode = (uri, unpacker = ((s) -> s)) ->
		d = {}
		for s in (uri.match /[^?=&]+=[^&]*/g) ? []
			[..., k, v] = s.match /([^=]+)=(.*)/
			d[decodeURIComponent(k)] = (unpacker decodeURIComponent v)
		return d

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

	nature_number = (min = 0) -> i = min-1; (-> ++i)

	range = (args...) ->
		if args.length == 0
			i = -1
			(-> ++i)
		else if args.length == 1
			[stop] = args
			i = -1
			(-> if ++i < stop then i else iterator.end)
		else if args.length == 2
			[start, stop] = args
			if start < stop
				i = start - 1
				(-> if ++i < stop then i else iterator.end)
			else
				i = start + 1
				(-> if --i > stop then i else iterator.end)
		else
			[start, stop, step] = args
			throw 'ERR IN range(): YOU ARE CREATING AN UNLIMITTED RANGE' if stop != start and (stop - start) * step < 0
			i = start - step
			if start < stop
				(-> if (i += step) < stop then i else iterator.end)
			else
				(-> if (i += step) > stop then i else iterator.end)

	iterator = do ->
		end = new Object
		ret = (iterable, replaced_end) ->
			return iterable if typeof(iterable) is 'function'
			throw 'ERR IN iterator(): ONLY Array & Iterator IS ACCEPTABLE' if not iterable instanceof Array
			i = -1
			->
				i += 1
				if i < iterable.length
					if iterable[i] is iterator.end
						if not replaced_end?
							throw 'ERR IN iterator(): iterator.end APPEARS IN LIST, PASS A SECOND ARG FOR REPLACEMENT'
						replaced_end
					else
						iterable[i]
				else
					end
		ret.end = end
		ret

	list = (iterable) ->
		return iterable if typeof(iterable) isnt 'function'
		r = []
		x = iterable()
		while x isnt iterator.end
			r.push(x)
			x = iterable()
		return r

	head = (n) -> (iter) ->
		iter = iterator(iter)
		c = 0
		->
			if c < n
				c += 1
				iter()
			else
				iterator.end

	foreach = do ->
		brk = new Object
		ret = (iterable, callback, fruit) ->
			iter = iterator(iterable)
			while (x = iter()) isnt iterator.end
				break if callback(x, fruit) is brk
			fruit
		ret.break = brk
		return ret

	best = (better) ->
		(iter) ->
			iter = iterator(iter)
			r = iter()
			return null if r is iterator.end
			it = iter()
			while it isnt iterator.end
				r = if better(it, r) then it else r
				it = iter()
			return r

	all = (f) ->
		f = ((x) -> x is f) if typeof(f) isnt 'function'
		(iter) ->
			iter = iterator(iter)
			x = iter()
			while x isnt iterator.end
				return false if not f(x)
				x = iter()
			return true

	any = (f) ->
		all_not = all (x) -> not f(x)
		(iter) ->
			not (all_not iter)

	zip = (iters...) ->
		iters = (iterator(iter) for iter in iters)
		finished = do ->
			end = new Object
			any_is_end = any (x) -> x is end
			(ls) -> any_is_end iterator(ls, end)
		->
			next = (iter() for iter in iters)
			if finished(next)
				return iterator.end
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
				if ++i < keys.length then [(k = keys[i]), iterable[k]] else iterator.end

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

	cart = (iters...) ->
		sets = (list(set) for set in iters)
		limits = (sets[i].length for i in [0...sets.length])
		inc = inc_vector(limits)
		get_value = apply_vector(sets)
		v = (0 for i in [0...sets.length])
		->
			if v[0] < limits[0] then (r = get_value v; inc v; r) else iterator.end

	#cart = (sets...) -> #cartesian_product; recover the lack of nested list comprehensions
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

	sum = (arr) ->
		r = 0
		r += x for x in arr
		r

	max = (arr) ->
		best((a, b) -> a > b) arr

	min = (arr) ->
		best((a, b) -> a < b) arr

	max_index = (arr) ->
		best((i, j) -> arr[i] > arr[j]) [0...arr.length]

	min_index = (arr) ->
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

		extend: extend
		size: size

		uri_encode: uri_encode
		uri_decode: uri_decode

		random_gen: random_gen
		ranged_random_gen: ranged_random_gen

		iterator: iterator
		list: list
		foreach: foreach
		enumerate: enumerate
		nature_number: nature_number
		range: range
		head: head
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
