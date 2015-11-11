this_module = () ->
	int = (s, base) -> if typeof(s) == 'string' then (r = parseInt(s, base); unless s.slice? and r == parseInt(s.slice(0,-1), base) then r else null) else parseInt(0 + s)
	float = (s) -> if /^-?[0-9]*(\.[0-9]+)?([eE]-?[0-9]+)?$/.test(s) then parseFloat(s) else null
	str = (x, base) -> x.toString(base)
	bool = (x) -> if x in [true, false] then x else null
	hex = (x) -> x.toString(16)
	ord = (c) -> c.charCodeAt()
	chr = (x) -> String.fromCharCode(x)
	json = (it) -> JSON.stringify(it)
	jsonWith = (indent, convertor) -> (it) -> JSON.stringify(it, convertor, indent)
	prettyJson = (it) -> JSON.stringify(it, null, 4)
	obj = (s) -> JSON.parse(s)

	return {
		int, float, bool, str, hex, ord, chr, json, jsonWith, prettyJson, obj,
	}

module.exports = this_module()

