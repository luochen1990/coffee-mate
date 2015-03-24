API Description
---------------

### reinforce syntax

- `log`: can be used as a convenient log macro
- `dict`: can be used to construct an dict conveniently just like dict comprehension
- `copy`: return a copy of an Array or Object, the second argument indicates the depth of copying
- `deepcopy`: almost same as copy, but the default depth is Infinity

### lazy evaluation

#### the iterator transfers

- `iterator`: given an array, return it's iterator form, an iterator will pass through directly.
- `iterator.end`: the symbol of iterating ending. if `iterating.end` is returned, the iterating is finished.
- `list`: given an iterator, return an array, an array will pass through directly.
- `enumerate`: given an iterator, array or object, returns an iterator which yields `[key, value]` pairs.

#### the basic generators

- `nature_number`: given an optional first element, returns an unlimitted increasing integer iterator.
- `range`: 0~3 arguments is allowed, just like the python function range(), returns a limitted integer iterator.
- `prime_number`: a prime number iterator

#### the iterator decorators

- `take`: given a nature number `n`, return a decorator which decorate an iterator `iter` to an iterator which yields the first `n` item of `iter`.
- `takeWhile`: given a function `ok`, return a decorator when decorate an iterator `iter` to an iterator which yields `x` for each item `x` in `iter` until `ok(x)` is `false`.
- `drop`: given a nature number `n`, return a decorator which decorate an iterator `iter` to an iterator which yields the item of `iter` without the first `n` ones.
- `dropWhile`: given a function `ok`, return a decorator when decorate an iterator `iter` to an iterator which yields `x` for each item `x` in `iter` start from the first x where `ok(x)` is `true`.
- `map`: given a function `f`, return a decorator which decorate an iterator `iter` to an iterator which yields `f(x)` for each item `x` in `iter`.
- `filter`: given a function `ok`, return a decorator which decorate an iterator `iter` to an iterator which yields `x` for each item `x` in `iter` when `ok(x)` is `true`.
- `streak`: given a nature number `n`, return a decorator which decorate an iterator `iter` to an iterator which yields the latest `n` item of `iter` each time.

#### the iterator combiners

- `concat`: given a sort of iterators, return a concated one.
- `zip`: given a sort of iterators, return a zipped one which is also an iterator.
- `cart`: given a sort of iterators, return their cartesian product which is also an iterator.

#### the iterator consumers

- `foreach`: given an iterator, an callback function, an optional init value for result, execute `callback(item, result)` for each item yield by the iterator, finally return the result value(which should be modified by the callback directly).
- `foreach.break`: the symbol of foreach breaking. if `foreach.break` is returned, the foreach loop is finished.
- `last`: given an iterator, return the last element it generates.
- `foldl`: given an operator and a init value, return an iterator processor which generate a result
- `best`: given a function describing which one is better, return a function describing which one is best
- `all`: given a judge function, return a function deals with an iterator, which returns true only if for every item in the iterator, the judge function returns true
- `any`: given a judge function, return a function deals with an iterator, which returns true if for any item in the iterator, the judge function returns true

### simple pseudo-random

- `random_gen`: given a seed, return a random iterator which generate an decimal in range `[0, 1)` each time
- `ranged_random_gen`: given an integer `n` and a seed, return a random iterator which generate an integer in range `[0, n-1]`

### intersting higher-order functions

- `church`: given a nature number `n`, return the church number `n`.
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

### mathematical functions

- `square`: given x, return x * x
- `cube`: given x, return x * x * x
- `abs`: alias of Math.abs
- `floor`: alias of Math.floor
- `ceil`: alias of Math.ceil
- `sum`: given an array of numbers, return their sum
- `max`: given an array of numbers, return the greatest one
- `min`: given an array of numbers, return the smallest one
- `max_index`: given an array of numbers, return the index of the greatest one
- `min_index`: given an array of numbers, return the index of the smallest one

