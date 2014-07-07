###################### reinforce syntax ##########################

log = do ->
	logs = []
	window.logs = logs if window? # window env used, for debugging easier in broswer console.
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

######################### type trans #############################

int = (s, base) -> r = parseInt(s, base); unless s.slice? and r == parseInt(s.slice(0,-1), base) then r else null
float = (s) -> if /^-?[0-9]*(\.[0-9]+)?([eE]-?[0-9]+)?$/.test(s) then parseFloat(s) else null
str = (x, base) -> x.toString(base)
bool = (x) -> if x == true or x == false then x else null
hex = (x) -> x.toString(16)
ord = (c) -> c.charCodeAt()
chr = (x) -> String.fromCharCode(x)
json = (it, indent) -> JSON.stringify(it, null, indent)
obj = (s) -> JSON.parse(s)

####################### reinforce String #########################

String::format = (args) ->
	this.replace /\{(\w+)\}/g, (m, i) -> if args[i]? then args[i] else m

String::repeat = (n) ->
	[r, pat] = ['', this]
	while n > 0
		r += pat if n & 1
		n >>= 1
		pat += pat
	r

String::cut = (start_pat, end_pat) ->
    i = @.search(start_pat) + 1
    return null if i == 0
    j = @.substr(i).search(end_pat)
    return null if j == -1
    @.substr(i, j)

######################## reinforce Array #########################

Object.defineProperties Array.prototype,
    first:
        get: -> this[0]
        set: (v) -> this[0] = v
    last:
        get: -> this[@length - 1]
        set: (v) -> this[@length - 1] = v

reversed = (arr) ->
	arr.slice().reverse()

###################### reinforce Dictionary ######################

extend = (base, defaults...) ->
	r = if base? then dict([k, v] for k, v of base) else {}
	for d in defaults
		r[k] ?= v for k, v of d if d? # null value will be replaced if a default value exists.
	r

size = (obj) -> Object.keys(obj).length

######################### url helpers ############################

url_encode = (obj) ->
	("#{encodeURIComponent(k)}=#{encodeURIComponent(v)}" for k, v of obj).join('&')

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

iterator = do ->
	end = new Object
	ret = (iterable) ->
		return iterable if typeof(iterable) is 'function'
		i = -1
		->
			i += 1
			if i < iterable.length
				iterable[i]
			else
				end
	ret.end = end
	ret

array = (iterable) ->
	return iterable if typeof(iterable) isnt 'function'
	r = []
	x = iterable()
	while x isnt iterator.end
		r.push(x)
		x = iterable()
	r

accumulate = (fruit, nutri, foo) ->
	fruit = foo(fruit, it) for it in nutri
	fruit

best = (better) ->
	(iter) ->
		iter = (iterator iter) if typeof(iter) isnt 'function'
		r = iter()
		return null if r is iterator.end
		it = iter()
		while it isnt iterator.end
			r = if better(it, r) then it else r
			it = iter()
		r

all = (f) ->
	f = ((x) -> x == f) if typeof(f) isnt 'function'
	(iter) ->
		iter = (iterator iter) if typeof(iter) isnt 'function'
		x = iter()
		while x isnt iterator.end
			return false if not f(x)
			x = iter()
		true

any = (f) ->
	(iter) ->
		not (all((x) -> not f(x)) iter)

zip = (arrs...) ->
	len = Infinity; len = a.length for a in arrs when a.length < len
	((arrs[j][i] for j in [0...arrs.length]) for i in [0...len])

cart = (sets...) -> #cartesian_product; recover the lack of nested list comprehensions
	rst = []
	len = sets.length
	rec = (st, d) ->
		if d == len
			rst.push(st)
		else
			rec(st.concat([x]), d + 1) for x in sets[d]
	rec([], 0)
	rst

church = (n) -> #the nth church number
	iter = (f, n, r) ->
		if n == 0 then r else iter(f, n - 1, f(r))

	(f) ->
		(x) -> iter(f, n + 0, x)

Y = (f) ->
	((x) -> (x x)) ((x) -> (f ((y) -> ((x x) y))))

memorize = (f) ->
	cache = {}
	(args...) ->
		key = json(args)
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

if module?
	module.exports =
		log: log
		sleep: sleep
		dict: dict

		int: int
		float: float
		bool: bool
		str: str
		hex: hex
		ord: ord
		chr: chr
		json: json
		obj: obj

		reversed: reversed

		extend: extend
		size: size

		url_encode: url_encode

		random_gen: random_gen
		ranged_random_gen: ranged_random_gen

		iterator: iterator
		array: array
		accumulate: accumulate
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

