CoffeeMate
==========

Having CoffeeScript for **Functional Programming** is cool, and it will be much better with this **CoffeeMate**, which provides a lot of util functions for js and some of them are especially for coffeescript, includes **log macro**, **dict comprehension**, function `cart` for **nested list comprehensions**, **pseudo-random**, **type transformation** , **string formating** and **a sort of high-order helper functions for functional programming**.

API list
--------

here lists all apis provided, click it to see the demo. you can also read [API description](API_description.md) for more details.

- useful utils:
	[`log`]( http://luochen1990.me/try_coffee?code=%22log%20-%3E%201%20%2B%201%5Cnlog%20-%3E%20json%20list%20range(10)%5Cnlog%20-%3E%20json%20list%20take(10)%20prime_number()%5Cn%5Cna%20%3D%201%5Cnb%20%3D%202%5Cnlog.info%20-%3E%20a%20%2B%20b%22 ),
	[`assert`](http://luochen1990.me/try_coffee?code=%22a%20%3D%201%5Cnb%20%3D%20sum(0%2C%201)%5Cnassert%20-%3E%20a%20!%3D%20b%22),
	[`dict`](),
	[`copy`](),
	[`deepcopy`](),

- type convertors:
	[`int`](),
	[`float`](),
	[`bool`](),
	[`str`](),
	[`hex`](),
	[`ord`](),
	[`chr`](),
	[`json`](),
	[`obj`](),

- url helpers:
	[`uri_encoder`](),
	[`uri_decoder`](),

- lazy evaluation:
	- iterator convertors:
		[`iterator`](),
		[`enumerate`](),
	- basic iterators:
		[`range`](),
		[`nature_number`](),
		[`prime_number`](),
		[`random_gen`](),
		[`ranged_random_gen`](),
	- iterator decorators:
		[`map`](),
		[`filter`](),
		[`take`](),
		[`takeWhile`](),
		[`drop`](),
		[`dropWhile`](),
		[`scanl`](),
		[`streak`](),
		[`reverse`](),
	- the iterator combiners:
		[`concat`](),
		[`zip`](),
		[`cartProd`](),
	- the iterator consumers:
		[`list`](),
		[`last`](),
		[`foldl`](),
		[`best`](),
		[`all`](),
		[`any`](),
		[`foreach`](),

- funny functions:
	[`church`](),
	[`Y`](),
	[`memoize`](),

- mathematical functions:
	[`square`](),
	[`cube`](),
	[`abs`](),
	[`floor`](),
	[`ceil`](),
	[`sum`](),
	[`max`](),
	[`min`](),
	[`max_index`](),
	[`min_index`](),

- reinforce String:
	[`a_string.format`](),
	[`a_string.repeat`](),

- reinforce Array:
	[`an_array.first`](),
	[`an_array.second`](),
	[`an_array.third`](),
	[`an_array.last`](),

- reinforce Object:
	[`Object.size`](),
	[`Object.extend`](),
	[`Object.update`](),

Install
-------

#### for nodejs

1. install with npm: `your-repo/> npm install coffee-mate --save`
2. require separately or globally:
	- require separately: `{log, assert, dict} = require 'coffee-mate'`
	- require globally: `require 'coffee-mate/global'`

#### for browsers

```html
<script src="http://cdn.rawgit.com/luochen1990/coffee-mate/master/coffee_mate.js" type="text/javascript"></script>
<script src="http://cdn.rawgit.com/luochen1990/coffee-mate/master/global.js" type="text/javascript"></script>
```

Run Demo (nodejs)
-----------------

run `coffee ./demo.coffee` under directory `coffee-mate/` directly after you have `coffee-script` installed.

