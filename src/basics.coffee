this_module = ({foldl}) ->
	identity = (x) -> x

	# transformers
	flip = (f) ->
		(x) -> (y) -> f(y)(x)

	combine = (f) -> (g) ->
		(x) -> f g(x)

	curry2 = (f) ->
		(a) -> (b) -> f(a, b)

	curry3 = (f) ->
		(a) -> (b) -> (c) -> f(a, b, c)

	uncurry2 = (f) ->
		(a, b) -> f(a)(b)

	uncurry3 = (f) ->
		(a, b, c) -> f(a)(b)(c)

	pack = (f) ->
		(arr) -> f(arr...)

	unpack = (f) ->
		(arr...) -> f(arr)

	# seek & pluck in Array or Object
	seek = (arr) ->
		(i) -> arr[i]

	pluck = (attr) ->
		(d) -> d[attr]

	# compare
	equal = (it) ->
		(x) -> x == it

	notEqual = (it) ->
		(x) -> x != it

	lessThan = (it) ->
		(x) -> x < it

	greaterThan = (it) ->
		(x) -> x > it

	lessEqual = (it) ->
		(x) -> x <= it

	greaterEqual = (it) ->
		(x) -> x >= it

	# math
	plus = (x) -> (y) -> x + y
	minus = (x) -> (y) -> x - y

	abs = Math.abs
	floor = Math.floor
	ceil = Math.ceil

	precise = (n) ->
		(x) -> parseFloat x.toPrecision(n)

	sum = foldl(plus)(0)

	return {
		identity, flip, combine,
		curry2, curry3, uncurry2, uncurry3, pack, unpack,
		seek, pluck,
		equal, notEqual, lessThan, lessEqual, greaterThan, greaterEqual,
		plus, minus, abs, floor, ceil, precise,
		sum
	}

module.exports = this_module
	foldl: require('lazy-list').foldl

