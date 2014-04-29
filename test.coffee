{log, dict, sleep, json, int, float, hex, chr, ord, size, extend, sum, all, zip, url_encode, random_gen, square, cube} = require './coffee_mate.coffee'

###################### reinforce syntax ##########################

# the log macro
a = 1
b = 2
log -> a
log (-> a + b), 'warn'
log (-> a - b), 'error'
log -> log.logs

# dict comprehension
d = dict([i, i*i] for i in [1..3])
log -> d

# sleep syntactic sugar
sleep 2, ->
	log 'THE END'

######################### type trans #############################

log (-> int(a)), (-> int('12ab'))
log (-> float(1.2e-3)), (-> float('1.2a-3'))
log -> json(d)
log (-> hex(15)), (-> hex(16)), (-> hex(1234))

####################### reinforce String #########################

log -> 'hello, {name}!'.format(name: 'beauty')
log -> 'hello, beauty! '.repeat(3)

######################## reinforce array #########################

ls = [0..100]
log -> sum(ls)
log -> ls2
log -> all(ls, (n) -> 'a'.repeat(n).length == n)

ls2 = (chr(ord('a')+i) for i in [0...3])
log -> zip(ls, ls2)

###################### reinforce dictionary ######################

log -> size(d)
log -> extend(d, 0: 0, 1: 'known')

######################### url helpers ############################

log -> url_encode(d)

###################### simple pseudo-random ######################

random = random_gen(0)
(log -> random()) for i in [0...3]

#################### mathematical functions ######################

log -> square(2)
log -> cube(2)

