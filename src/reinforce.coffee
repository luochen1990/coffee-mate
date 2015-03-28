this_module = ({String, Array, Object}) ->
	# reinforce String

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

	# reinforce Array

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

	# reinforce Object

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

	return {
		String, Array, Object
	}

module.exports = this_module {String, Array, Object}
