//= require ./uri
//= require ./methods

(function($, undef) {

	function all(tagName, node) {
		return node.getElementsByTagNameNS('DAV:', tagName);
	};
	function first(tagName, node) {
		return all(tagName, node)[0];
	}
	function text(tagName, node) {
		return first(tagName, node).textContent;
	}
	function has(tagName, node) {
		return all(tagName, node).length;
	}

	var slice = [].slice;

	function Resource(node) {
		var children = [], type;
		var href = text('href', node), location = new URI(href).resolve(window.location);
		var properties = first('prop', node);

		this.__defineGetter__('location', function() {
			return location;
		});
		this.__defineGetter__('node', function() {
			return node;
		});
		this.__defineGetter__('type', function() {
			type = type || text('getcontenttype', node)
			return type;
		});
		this.__defineGetter__('children', function() {
			return children;
		});

		this.adopt = function(child) {
			return children.push(child);
		};
		this.property = function(name) {
			return text(name, properties);
		}
	};

	Resource.open = function(url) {
		var defer = $.Deferred();

		$.propfind(url).done(function(document) {
			var responses = all('response', document);
			var response = responses[0]
			var type = first('resourcetype', response);

			var resource = new Resource(response);

			var nodes = slice.call(responses, 1), node, child;
			for (var i = 0, ii = nodes.length; i < ii; i++) {
				node = nodes[i];
				child = new Resource(node);

				resource.adopt(child);
			}

			defer.resolve(resource);
		});

		return defer;
	};
	Resource.open.mkcol = function(url) {
		var defer = $.Deferred();

		var uri = new URI(url);
		var noTrailingSlash =! uri.isCollection();
		if (noTrailingSlash) { uri.pathname += '/'; }

		$.mkcol(uri.href).done(function() {
			Resource.open(url).done(defer.resolve);
		});

		return defer;
	};

	$.Resource = Resource.open;

})(DAV);
