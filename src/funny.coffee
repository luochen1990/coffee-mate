this_module = () ->
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

	fix = Y

	memoFix = (ff) ->
		f = memoize (ff ((args...) -> f(args...)))
		return f

	return {
		church, Y, memoize, fix, memoFix,
	}

module.exports = this_module()

