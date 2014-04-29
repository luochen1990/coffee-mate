{log, sum, json, int} = require './coffee_mate.coffee'
a = 1
b = 2
log -> int(a)
log (-> b), 'warn'
log (-> a + b), (-> a - b), 'error'
log -> sum([a, b])
log -> json 'hello, {name}'.format(name: 'world')
log -> log.logs
