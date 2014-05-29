coffee-mate
===========

mate util functions for coffeescript, includes log macro, dict comprehension,  pseudo-random, and so on

api list
--------

### reinforce syntax

- `log`: can be used as a convinent log macro
- `dict`: can be used to construct an dict convinently just like dict comprehension
- `sleep`: sleep syntactic sugar, second is used instead of millisecond

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

- `url_encode`: given an object and return a url_encoded string which will be appended after a url as params

### simple pseudo-random

- `random_gen`: given a seed, return a random generator which generate an decimal in range `[0, 1)` each time
- `ranged_random_gen`: given an integer `n` and a seed, return a random generator which generate an integer in range `[0, n-1]`

### logical functions

- `accumulate`: given an initial value, an iterator and a function, return an final value
- `all`: given an iterator and a function, return true only if for every item in the iterator, the function returns true
- `any`: given an iterator and a function, return true if for any item in the iterator, the function returns true
- `best`: given a function describing which one is better, return a function describing which one is best
- `zip`: given a sort of iterators, return a zipped one
- `cart`: given a sort of iterators, return their cartesian product
- `church`: given an integer, return a church number
- `memorize`: given a function, return it's memorized version

### mathematical functions

- `square`: given x, return x * x
- `cube`: given x, return x * x * x
- `sum`: given an iterator, return their sum
- `max`: given an iterator, return the greatest one
- `min`: given an iterator, return the smallest one
- `max_index`: given an iterator, return the index of the greatest one
- `min_index`: given an iterator, return the index of the smallest one

useage
------

see the file `test.coffee` for example.

run demo
--------

run `coffee ./test.coffee` directly if you have `coffee-script` installed.

