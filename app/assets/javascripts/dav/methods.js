/*
 * WARNING: These methods should not be called directly!
 * RADAR: check http://stackoverflow.com/a/9478670
 */
(function(_, $, undef) {

	var xmlContentTypes = [ 'application/xml', 'text/xml' ];

	function setDepthFn(depth) {
		return function(r) { r.setRequestHeader('DEPTH', depth); };
	}

	_.propfind = function(url, depth) {
		if (depth === undef) depth = 1;
		var defer = $.Deferred();

		$.ajax({
			'beforeSend':  setDepthFn(depth),
			'accepts':     {'xml': 'text/xml'},
			'dataType':    'xml',
			'type':        'PROPFIND',
			'processData': false,
			'url':         url
		}).complete(function(response) {
			switch (response.status) {
				case 207:
					var contentType = response.
						getResponseHeader('Content-Type').
						split(';', 2)[0];

					if (xmlContentTypes.indexOf(contentType) < 0) {
						defer.reject('Invalid content type.', response);
						return;
					}

					if (!response.responseXML) try {
						response.responseXML = jQuery.parseXML(response.responseText);
					} catch (e) {
						defer.reject('Cannot parse XML.', response);
						return;
					}

					defer.resolve(response.responseXML, response);
					break;
				case 404:
					defer.reject('Resource not found.', response);
					break;
				default:
					defer.reject('Invalid status code.', response);
			}
		});

		return defer;
	}

	_.mkcol = function(url) {
		var defer = $.Deferred();

		$.ajax({
			'type':        'MKCOL',
			'processData': false,
			'url':         url
		}).complete(function(response) {
			switch (response.status) {
				case 201:
					defer.resolve(response);
					break;
				case 405:
					defer.reject('Collection already exists.', response);
					break;
				case 409:
					defer.reject('MKCOL without parent collection.', response);
					break;
				default:
					defer.reject('Invalid status code.', response);
			}
		});

		return defer;
	}

	_.delete = function(url) {
		var defer = $.Deferred();

		$.ajax({
			'type':        'DELETE',
			'processData': false,
			'url':         url
		}).complete(function(response) {
			switch (response.status) {
				case 204:
					defer.resolve(response);
					break;
				case 404:
					defer.reject('Resource not found.', response);
					break;
				default:
					defer.reject('Invalid status code.', response);
			}
		});

		return defer;
	}
	_.put = function(url, data, type) {
		var defer = $.Deferred();

		$.ajax({
			'type':        'PUT',
			'data':        data,
			'contentType': type || 'application/octet-stream',
			'processData': false,
			'url':         url
		}).complete(function(response) {
			switch (response.status) {
				case 201:
					defer.resolve(response);
					break;
				case 405:
					defer.reject('PUT cannot create collections.', response);
					break;
				case 409:
					defer.reject('PUT without parent collection.', response);
					break;
				default:
					defer.reject('Invalid status code.', response);
			}
		});

		return defer;
	}

})(DAV, jQuery);
