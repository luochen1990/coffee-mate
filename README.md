coffee-mate
===========

Having CoffeeScript for **Functional Programming** is cool, and it will be much better with this **coffee-mate**, which provides a lot of util functions for js and some of them are especially for coffeescript, includes **log macro**, **dict comprehension**, function `cart` for **nested list comprehensions**, **pseudo-random**, **type transformation** , **string formating** and **a sort of high-order helper functions for functional programming**.

api list
--------

### reinforce syntax

- `log`: can be used as a convenient log macro
- `dict`: can be used to construct an dict conveniently just like dict comprehension
- `sleep`: sleep syntactic sugar, second is used instead of millisecond
- `copy`: return a copy of an Array or Object, the second argument indicates the depth of copying
- `deepcopy`: almost same as copy, but the default depth is Infinity

### type trans

- `int`: transform string to int, base can be specified, return `null` with illegal string
- `float`: transform string to float, return `null` with illegal string
- `str`: transform int to string, base can be specified
- `hex`: transform int to hex string. (base is specified as 16)
- `ord`: return the ascii code of a char
- `chr`: convert an ascii code to a char
- `json`: return the json string of an object
- `obj`: convert the json string to an object

### reinforce String

- `some_string.format`: given an dictionary, return a formated string
- `some_string.repeat`: given a integer, return a repeated version

### reinforce Array

- `some_array.first`: this is an attribute of an array, means the first element in it
- `some_array.last`: this is an attribute of an array, means the last element in it
- `reversed`: return a reversed version of an array

### reinforce dictionary

- `extend`: return a extended version of an dictionary(object), values of the second dictionary will be treated as defaults
- `size`: return the keys number of an dictionary(object), that's just a shotcut for `Object.keys(obj).length`

### url helpers

- `uri_encode`: given an object and return a url_encoded string which will be appended after a url as params

### simple pseudo-random

- `random_gen`: given a seed, return a random generator which generate an decimal in range `[0, 1)` each time
- `ranged_random_gen`: given an integer `n` and a seed, return a random generator which generate an integer in range `[0, n-1]`

### logical functions

- `iterator`: given an array, return it's iterator form, an iterator will pass through directly.
- `iterator.end`: the symbol of iterating ending. if `iterating.end` is returned, the iterating is finished.
- `list`: given an iterator, return an array, an array will pass through directly.
- `foreach`: given an iterator, an callback function, an optional init value for result, execute `callback(item, result)` for each item yeild by the iterator, finally return the result value(which should be modified by the callback directly).
- `enumerate`: given an iterator, array or object, return an iterator which yields `[key, value]` pairs.
- `head`: given a nature number `n`, return a function which accepts an iterator `iter` and returns an iterator which yields the first `n` item from `iter`.
- `best`: given a function describing which one is better, return a function describing which one is best
- `all`: given a judge function, return a function deals with an iterator, which returns true only if for every item in the iterator, the judge function returns true
- `any`: given a judge function, return a function deals with an iterator, which returns true if for any item in the iterator, the judge function returns true
- `zip`: given a sort of iterators, return a zipped one which is also an iterator.
- `cart`: given a sort of iterators, return their cartesian product which is also an iterator.
- `church`: given a nature number `n`, return the church number `n`.
- `Y`: the Y Combinator, given a high-order function, return it's fixed point which is also a function.
- `memorize`: given a function, return it's memorized version.

### mathematical functions

- `square`: given x, return x * x
- `cube`: given x, return x * x * x
- `sum`: given an array of numbers, return their sum
- `max`: given an array of numbers, return the greatest one
- `min`: given an array of numbers, return the smallest one
- `max_index`: given an array of numbers, return the index of the greatest one
- `min_index`: given an array of numbers, return the index of the smallest one

useage
------

#### install & require in nodejs

- install with npm: `npm install coffee-mate`
- require separately: `{log, dict, sleep} = require 'coffee-mate'`
- require globally: `require 'coffee-mate/global'`

#### reference in html directly

```html
<script src="http://cdn.rawgit.com/luochen1990/coffee-mate/master/coffee_mate.js" type="text/javascript"></script>
<script src="http://cdn.rawgit.com/luochen1990/coffee-mate/master/global.js" type="text/javascript"></script>
```

run demo
--------

run `coffee ./test.coffee` directly if you have `coffee-script` installed.

