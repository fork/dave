/*
* An URI datatype.  Based upon examples in RFC3986.
*
* TODO %-escaping
* TODO split apart authority
* TODO split apart query_string (on demand, anyway)
*
* @(#) $Id$
*/
 
// Constructor for the URI object. Parse a string into its components.
function URI(str) {
	if (!str) str = "";
	// Based on the regex in RFC2396 Appendix B.
	var parser = /^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/;
	var result = str.match(parser);
	this.scheme    = result[1] || null;
	this.authority = result[2] || null;
	this.path      = result[3] || null;
	this.query     = result[4] || null;
	this.fragment  = result[5] || null;
}
// Introduce a new scope to define some private helper functions.
(function (fn) {
	URI.current = new URI(location.href);

	// Restore the URI to it's stringy glory.
	function toString() {
		var str = "";
		if (this.scheme) {
			str += this.scheme + ":";
		}
		if (this.authority) {
			str += "//" + this.authority;
		}
		if (this.path) {
			str += this.path;
		}
		if (this.query) {
			str += "?" + this.query;
		}
		if (this.fragment) {
			str += "#" + this.fragment;
		}
		return str;
	};
	fn.toString = toString;
	fn.__defineGetter__('href', toString);
	fn.__defineGetter__('basename', function() {
		var basenames = this.path.split('/');

		if (this.isCollection()) {
			return basenames.slice(-2, -1)[0];
		} else {
			return basenames.slice(-1)[0];
		}
	});

	fn.decode = function() {
		return new URI(decodeURI(this.href));
	}
	fn.decode = function() {
		return new URI(encodeURI(this.href));
	}
	fn.parent = function() {
		return new URI('../').resolve(this);
	};

	// RFC3986 §5.2.3 (Merge Paths)
	var dirname = /^(.*)\//;
	function merge(base, rel_path) {
		if (base.authority && !base.path) {
			return "/" + rel_path;
		} else {
			return base.path.match(dirname)[0] + rel_path;
		}
	}

	// Match two path segments, where the second is ".." and the first must
	// not be "..".
	var DoubleDot = /\/((?!\.\.\/)[^\/]*)\/\.\.\//;

	function remove_dot_segments(path) {
		if (!path) return "";
		// Remove any single dots
		var newpath = path.replace(/\/\.\//g, '/');
		// Remove any trailing single dots.
		newpath = newpath.replace(/\/\.$/, '/');
		// Remove any double dots and the path previous.  NB: We can't use
		// the "g", modifier because we are changing the string that we're
		// matching over.
		while (newpath.match(DoubleDot)) {
			newpath = newpath.replace(DoubleDot, '/');
		}
		// Remove any trailing double dots.
		newpath = newpath.replace(/\/([^\/]*)\/\.\.$/, '/');
		// If there are any remaining double dot bits, then they're wrong
		// and must be nuked.  Again, we can't use the g modifier.
		while (newpath.match(/\/\.\.\//)) {
			newpath = newpath.replace(/\/\.\.\//, '/');
		}
		return newpath;
	}

	// RFC3986 §5.2.2. Transform References;
	fn.resolve = function(base) {
		var target = new URI();
		if (this.scheme) {
			target.scheme    = this.scheme;
			target.authority = this.authority;
			target.path      = remove_dot_segments(this.path);
			target.query     = this.query;
		}
		else {
			if (this.authority) {
				target.authority = this.authority;
				target.path      = remove_dot_segments(this.path);
				target.query     = this.query;
			}        
			else {
				// XXX Original spec says "if defined and empty"…;
				if (!this.path) {
					target.path = base.path;
					if (this.query) {
						target.query = this.query;
					}
					else {
						target.query = base.query;
					}
				}
				else {
					if (this.path.charAt(0) === '/') {
						target.path = remove_dot_segments(this.path);
					} else {
						target.path = merge(base, this.path);
						target.path = remove_dot_segments(target.path);
					}
					target.query = this.query;
				}
				target.authority = base.authority;
			}
			target.scheme = base.scheme;
		}

		target.fragment = this.fragment;

		return target;
	};
})(URI.prototype);
