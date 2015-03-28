this_module = () ->
	uri_encoder = (component_packer = str) ->
		(obj) ->
			("#{encodeURIComponent(k)}=#{encodeURIComponent component_packer v}" for k, v of obj).join('&')

	uri_decoder = (component_unpacker = ((s) -> s)) ->
		(str) ->
			d = {}
			for s in (str.match /[^?=&]+=[^&]*/g) ? []
				[..., k, v] = s.match /([^=]+)=(.*)/
				d[decodeURIComponent(k)] = (component_unpacker decodeURIComponent v)
			return d

	return {
		uri_encoder, uri_decoder,
	}

module.exports = this_module()

