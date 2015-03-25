CoffeeMate
==========

Having CoffeeScript for **Functional Programming** is cool, and it will be much better with this **CoffeeMate**, which provides a lot of properties(which should be implemented by a library rather than the CS-compiler) for CSers, includes:

- [log macro](http://luochen1990.me/try_coffee?code=%22log%20-%3E%20%27hello%2C%20coffee-mate!%27%5Cn%5Cna%20%3D%201%5Cnb%20%3D%202%5Cnlog%20-%3E%20a%20%2B%20b%5Cn%5Cnls%20%3D%20%5B0..100%5D%5Cnlog%20-%3E%20sum(ls)%22)
- [assert macro](http://luochen1990.me/try_coffee?code=%22a%20%3D%201%5Cnb%20%3D%202%5Cnassert%20-%3E%20a%20%3C%20b%5Cnassert%20-%3E%20a%20%3D%3D%20b%5Cn%22)
- [dict comprehension](http://luochen1990.me/try_coffee?code=%22squared%20%3D%20dict(%5Bi%2C%20i%20*%20i%5D%20for%20i%20in%20%5B1..5%5D)%5Cnlog%20-%3E%20json%20squared%5Cn%5Cnchars%20%3D%20dict(%5Bi%2C%20chr(ord(%27a%27)%20%2B%20i)%5D%20for%20i%20in%20%5B0...26%5D)%5Cnlog%20-%3E%20json%20chars%22)
- [nested list comprehensions](http://luochen1990.me/try_coffee?code=%22ls1%20%3D%20%5B1%2C%202%2C%203%5D%5Cnls2%20%3D%20%5B%27a%27%2C%20%27b%27%5D%5Cnr1%20%3D%20(%5C%22%23%7Bn%7D%23%7Bc%7D%5C%22%20for%20%5Bn%2C%20c%5D%20in%20list%20cartProd%20ls1%2C%20ls2)%5Cnlog%20-%3E%20json%20r1%5Cn%5Cn%23without%20cartProd%2C%20you%20chould%20only%20got%20this%3A%5Cnr2%20%3D%20(%5C%22%23%7Bn%7D%23%7Bc%7D%5C%22%20for%20n%20in%20ls1%20for%20c%20in%20ls2)%5Cnlog%20-%3E%20json%20r2%22)
- [copy & deepcopy](http://luochen1990.me/try_coffee?code=%22a%20%3D%20%5B1%2C%201%2C%20%7Bx%3A%201%2C%20y%3A%201%7D%5D%5Cnb%20%3D%20deepcopy%20a%5Cnc%20%3D%20copy%20a%5Cn%5Cnb.first%20%3D%202%5Cnlog%20-%3E%20json%20b%5Cnlog%20-%3E%20json%20a%20%23a%20will%20not%20be%20changed%20since%20we%20are%20modifing%20b%20which%20is%20a%20copy%20of%20a%5Cn%5Cnb.third.x%20%3D%202%5Cnlog%20-%3E%20json%20b%5Cnlog%20-%3E%20json%20a%20%23a.third%20will%20not%20be%20changed%20since%20we%20are%20modifing%20b.third%20which%20is%20a%20copy%20of%20a.third%5Cn%5Cnc.third.x%20%3D%202%5Cnlog%20-%3E%20json%20c%5Cnlog%20-%3E%20json%20a%20%23a.third%20will%20be%20changed%20since%20we%20are%20modifing%20c.third%20which%20is%20eq%20(the%20same%20one)%20of%20a.third%22)
- [lazy evaluation]()
- [type convertions]()
- [string formating]()
- [pseudo-random]()
- [classic js object reinforcement]()
- [funny & useful high-order functions for FPers.]()

API list
--------

Here lists all APIs provided, **click it to see demo**. you can also read [API description](API_description.md) for more details.

- useful utils:
	[`log`]( http://luochen1990.me/try_coffee?code=%22log%20-%3E%201%20%2B%201%5Cnlog%20-%3E%20json%20list%20range(10)%5Cnlog%20-%3E%20json%20list%20take(10)%20prime_number()%5Cn%5Cna%20%3D%201%5Cnb%20%3D%202%5Cnlog.info%20-%3E%20a%20%2B%20b%22 ),
	[`assert`](http://luochen1990.me/try_coffee?code=%22a%20%3D%201%5Cnb%20%3D%20sum(0%2C%201)%5Cnassert%20-%3E%20a%20!%3D%20b%22),
	[`dict`](),
	[`copy`](),
	[`deepcopy`](),
	[`securely`](),

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
		[`new_iterator`](),
		[`pretty_iterator`](),
	- basic iterators:
		[`range`](),
		[`nature_number`](),
		[`prime_number`](),
		[`random_gen`](),
		[`ranged_random_gen`](),
		[`permutation_gen`](),
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
	[`next_permutation`](),

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

