API Description
---------------

### utils

- `log`: can be used as a convenient log macro
- `dict`: can be used to construct an dict conveniently just like dict comprehension
- `copy`: return a copy of an Array or Object, the second argument indicates the depth of copying
- `deepcopy`: almost same as copy, but the default depth is Infinity

### lazy evaluation

#### the lazylist transfers

- `lazy`: given an array, return it's lazylist form, an lazylist will pass through directly.
- `nil`: the symbol of iterating ending. if `nil` is returned, the iterating is finished.
- `list`: given an lazylist, return an array, an array will pass through directly.
- `enumerate`: given an lazylist, array or object, returns an lazylist which yields `[key, value]` pairs.

#### the basic generators

- `naturals`: given an optional first element, returns an unlimitted increasing integer lazylist.
- `range`: 0~3 arguments is allowed, just like the python function range(), returns a limitted integer lazylist.
- `primes`: a prime number lazylist

#### the lazylist decorators

- `take`: given a number `n`, return a decorator which decorate an lazylist `iter` to an lazylist which yields the first `n` item of `iter`.
- `takeWhile`: given a function `ok`, return a decorator when decorate an lazylist `iter` to an lazylist which yields `x` for each item `x` in `iter` until `ok(x)` is `false`.
- `drop`: given a number `n`, return a decorator which decorate an lazylist `iter` to an lazylist which yields the item of `iter` without the first `n` ones.
- `dropWhile`: given a function `ok`, return a decorator when decorate an lazylist `iter` to an lazylist which yields `x` for each item `x` in `iter` start from the first x where `ok(x)` is `true`.
- `map`: given a function `f`, return a decorator which decorate an lazylist `iter` to an lazylist which yields `f(x)` for each item `x` in `iter`.
- `filter`: given a function `ok`, return a decorator which decorate an lazylist `iter` to an lazylist which yields `x` for each item `x` in `iter` when `ok(x)` is `true`.
- `streak`: given a number `n`, return a decorator which decorate an lazylist `iter` to an lazylist which yields the latest `n` item of `iter` each time.

#### the lazylist combiners

- `concat`: given a sort of iterators, return a concated one.
- `zip`: given a sort of iterators, return a zipped one which is also an lazylist.
- `cart`: given a sort of iterators, return their cartesian product which is also an lazylist.

#### the lazylist consumers

- `foreach`: given an lazylist, an callback function, an optional init value for result, execute `callback(item, result)` for each item yield by the lazylist, finally return the result value(which should be modified by the callback directly).
- `foreach.break`: the symbol of foreach breaking. if `foreach.break` is returned, the foreach loop is finished.
- `last`: given an lazylist, return the last element it generates.
- `foldl`: given an operator and a init value, return an lazylist processor which generate a result
- `best`: given a function describing which one is better, return a function describing which one is best
- `all`: given a judge function, return a function deals with an lazylist, which returns true only if for every item in the lazylist, the judge function returns true
- `any`: given a judge function, return a function deals with an lazylist, which returns true if for any item in the lazylist, the judge function returns true

### simple pseudo-random

- `random_gen`: given a seed, return a random lazylist which generate an decimal in range `[0, 1)` each time
- `ranged_random_gen`: given an integer `n` and a seed, return a random lazylist which generate an integer in range `[0, n-1]`

### intersting higher-order functions

- `church`: given a number `n`, return the church number `n`.
- `Y`: the Y Combinator, given a high-order function, return it's fixed point which is also a function.
- `memorize`: given a function, return it's memorized version.

### reinforce String

- `some_string.format`: given an dictionary, return a formated string
- `some_string.repeat`: given a integer, return a repeated version

### reinforce Array

- `some_array.first`: this is an attribute of an array, means the first element in it
- `some_array.second`: this is an attribute of an array, means the second element in it
- `some_array.third`: this is an attribute of an array, means the third element in it
- `some_array.last`: this is an attribute of an array, means the last element in it

### reinforce Object

- `Object.len`: return the keys number of an dictionary(object), that's just a shortcut for `Object.keys(obj).length`
- `Object.extend`: return a extended version of an dictionary(object), values from the param dictionaries will be treated as defaults
- `Object.update`: return a extended version of an dictionary(object), values from the param dictionaries will be treated as updates

### url helpers

- `uri_encoder`: given an component_packer, returns an encoder which accepts a dictionary to get an uri which will be appended after a url as params
- `uri_decoder`: given an component_unpacker, returns an decoder which accepts an uri to get a dictionary of the params from url

### type trans

- `int`: transform string to int, base can be specified, return `null` with illegal string
- `float`: transform string to float, return `null` with illegal string
- `str`: transform int to string, base can be specified
- `hex`: transform int to hex string. (base is specified as 16)
- `ord`: return the ascii code of a char
- `chr`: convert an ascii code to a char
- `json`: return the json string of an object
- `obj`: convert the json string to an object

### basic functions

- `abs`: alias of Math.abs
- `floor`: alias of Math.floor
- `ceil`: alias of Math.ceil
- `sum`: given an array of numbers, return their sum
- `max`: given an array of numbers, return the greatest one
- `min`: given an array of numbers, return the smallest one
- `max_index`: given an array of numbers, return the index of the greatest one
- `min_index`: given an array of numbers, return the index of the smallest one

