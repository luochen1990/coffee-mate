require './global'

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
log "dict([i, i*i] for i in [1..3]) ==> #{json d}"

# sleep syntactic sugar
sleep 2, ->
	log 'THE END'

######################### type trans #############################

log (-> int(a)), (-> int('12a')), (-> int('12a', 16))
log (-> float(a)), (-> float('1.2e-3')), (-> float('1.2x-3'))
log -> json(d)
log (-> hex(15)), (-> hex(16)), (-> hex(1234))

####################### reinforce String #########################

log -> 'hello, {name}!'.format(name: 'beauty')
log -> 'hello, beauty! '.repeat(3)

######################## reinforce array #########################

ls = [0..100]
log -> sum(ls)
log -> all((n) -> 'a'.repeat(n).length == n)(ls)

ls2 = (chr(ord('a')+i) for i in [0...3])
log -> ls2
log -> list(zip(ls, ls2))
log -> list head(4)(cart(ls, ls2))

###################### reinforce dictionary ######################

log -> d
log -> size(d)
log -> extend({}, d, 0: 0, 1: 'known')

######################### url helpers ############################

log -> uri_encode(d)
log -> uri_decode(uri_encode(d))

###################### simple pseudo-random ######################

random = random_gen(0)
(log -> random()) for i in [0...3]

#################### mathematical functions ######################

log -> square(2)
log -> cube(2)

######################## copy & deepcopy #########################

a = {x:1,y:2, z:[1, 2]}
b = copy(a)
b.x = 2
b.z[0] = 2
log -> json a
log -> json b

a = {x:1,y:2, z:[1, 2]}
b = deepcopy(a)
b.x = 2
b.z[0] = 2
log -> json a
log -> json b

