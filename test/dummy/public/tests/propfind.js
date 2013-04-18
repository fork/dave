asyncTest("PROPFIND " + prefix + "/", function() {
	DAV.propfind(prefix + '/').
	done(function(xml, response) {
		ok(response.status === 207, "responds with " + response.status + " (expected 207).");
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
		ok(response.status === 207, "responds with " + response.status + " (expected 207).");
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
		ok(response.status === 207, "responds with " + response.status + " (expected 207).");
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
		ok(response.status === 404, "responds with " + response.status + " (expected 404).");
		start();
	});
});
