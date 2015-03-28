this_module = ({best}) ->
	flip = (f) ->
		(x) -> (y) -> f(y)(x)

	seek = (arr) ->
		(i) -> arr[i]

	pluck = (attr) ->
		(d) -> d[attr]

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

	return {
		flip, seek, pluck,
		equal, notEqual, lessThan, lessEqual, greaterThan, greaterEqual,
		abs, floor, ceil, sum, max, min, max_index, min_index,
	}

module.exports = this_module
	best: require('./lazy').best

