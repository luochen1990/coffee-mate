var api = require('./coffee_mate.js');
for (var name in api)
	global[name] = api[name];
