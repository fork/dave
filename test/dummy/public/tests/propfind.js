(function() {

	function contains(basename, document) {
	}

	asyncTest("PROPFIND " + "/", function() {
		DAV.propfind('/').
		done(function(xml, response) {
			ok(false, "should not respond with " + response.status + '.');
			start();
		}).
		fail(function(status, response) {
			equal(response.status, 404, "responds with " + response.status + " (expected 404).");
			start();
		});
	});
	asyncTest("PROPFIND " + prefix + "/", function() {
		DAV.propfind(prefix + '/').
		done(function(xml, response) {
			equal(response.status, 207, "responds with " + response.status + " (expected 207).");

			contains('existing-resource', xml);
			contains('existing-collection/', xml);
			contains('qunit.js', xml);
			contains('qunit.css', xml);
			contains('tests/', xml);

			start();
		}).
		fail(function(status, response) {
			ok(false, "should not respond with " + response.status + '.');
			start();
		});
	});
	asyncTest("PROPFIND " + prefix + "/existing-collection/", function() {
		DAV.propfind(prefix + '/existing-collection/').
		done(function(xml, response) {
			equal(response.status, 207, "responds with " + response.status + " (expected 207).");
			start();
		}).
		fail(function(status, response) {
			ok(false, "should not respond with " + response.status + '.');
			start();
		});
	});
	asyncTest("PROPFIND " + prefix + "/existing-resource", function() {
		DAV.propfind(prefix + '/existing-resource').
		done(function(xml, response) {
			equal(response.status, 207, "responds with " + response.status + " (expected 207).");
			start();
		}).
		fail(function(status, response) {
			ok(false, "should not respond with " + response.status + '.');
			start();
		});
	});
	asyncTest("PROPFIND " + prefix + "/non-existing", function() {
		DAV.propfind(prefix + '/non-existing').
		done(function(xml, response) {
			ok(false, "should not respond with " + response.status + '.');
			start();
		}).
		fail(function(status, response) {
			equal(response.status, 404, "responds with " + response.status + " (expected 404).");
			start();
		});
	});
})();
