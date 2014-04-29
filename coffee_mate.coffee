###################### reinforce syntax ##########################

log = do ->
	logs = []
	window.logs = logs if window? # window env used, for debugging easier in broswer console.
	foo = (args...) ->
		op = if args.slice(-1)[0] in ['log', 'warn', 'error'] then args.pop() else 'log'
		ball = []
		for f in args
			if typeof f == 'function'
				expr = f.toString().replace(/\s*function\s*\(\s*\)\s*{\s*return\s*([^]*);\s*}/, '$1')
				expr = expr.replace /[\r\n]{1,2}\s*/g, '' if expr.length <= 100
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

int = (s) -> if /^-?[0-9]+$/.test(s) then parseInt(s) else null
float = (s) -> if /^-?[0-9]*(\.[0-9]+)?([eE]-?[0-9]+)?$/.test(s) then parseFloat(s) else null
str = (x) -> x + ''
json = (it) -> JSON.stringify(it)
obj = (s) -> JSON.parse(s)
chr = (x) -> String.fromCharCode(x)
ord = (c) -> c.charCodeAt()
hex = (x) -> x.toString(16)

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

######################## reinforce array #########################

reversed = (arr) ->
	arr.slice().reverse()

accumulate = (fruit, nutri, foo) ->
	fruit = foo(fruit, it) for it in nutri
	fruit

sum = (arr) ->
	r = 0
	r += x for x in arr
	r

zip = (a, b) ->
	len = Math.min(a.length, b.length)
	([a[i], b[i]] for i in [0...len])

all = (arr, f) ->
	return false for x in arr when not f(x)
	true

any = (arr, f) ->
	return true for x in arr when f(x)
	false

###################### reinforce dictionary ######################

extend = (base, defaults) ->
	r = if defaults? then dict([k, v] for k, v of defaults) else {}
	r[k] = v for k, v of base if base?
	r

size = (obj) -> Object.keys(obj).length

######################### url helpers ############################

url_encode = (obj) ->
	("#{encodeURIComponent(k)}=#{encodeURIComponent(v)}" for k, v of obj).join('&')

###################### simple pseudo-random ######################

random_gen = (seed = Math.random()) ->
	->
		x = Math.sin(++seed) * 10000
		x - Math.floor(x)

ranged_random_gen = (range, seed = 0) ->
	random = random_gen(seed)
	->
		Math.floor(random() * range)

#################### mathematical functions ######################

square = (n) -> n * n
cube = (n) -> n * n * n

########################### exports ##############################

module.exports =
	log: log
	sleep: sleep
	dict: dict

	int: int
	float: float
	str: str
	json: json
	obj: obj
	chr: chr
	ord: ord
	hex: hex

	extend: extend
	size: size

	reversed: reversed
	accumulate: accumulate
	sum: sum
	zip: zip
	all: all
	any: any

	url_encode: url_encode

	random_gen: random_gen
	ranged_random_gen: ranged_random_gen

	square: square
	cube: cube
