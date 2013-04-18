asyncTest("MKCOL " + prefix + "/non-existing/", function() {
	DAV.mkcol(prefix + '/non-existing/').
	done(function(response) {
		ok(response.status === 201, "responds with " + response.status + " (expected 201).");
		start();
	}).
	fail(function(status, response) {
		ok(false, "should not respond with " + response.status + '.');
		start();
	}).
	always(function() {
		DAV.delete(prefix + '/non-existing/');
	});
});
asyncTest("MKCOL " + prefix + "/non-existing", function() {
	DAV.mkcol(prefix + '/non-existing').
	done(function(response) {
		ok(false, "should not respond with " + response.status + '.');
		start();
	}).
	fail(function(status, response) {
		ok(response.status === 404, "responds with " + response.status + " (expected 404).");
		start();
	}).
	always(function() {
		DAV.delete(prefix + '/non-existing');
	});
});
asyncTest("MKCOL " + prefix + "/existing-collection/", function() {
	DAV.mkcol(prefix + '/existing-collection/').
	done(function(response) {
		ok(false, "should not respond with " + response.status + '.')
		start();
	}).
	fail(function(status, response) {
		ok(response.status === 405, "responds with " + response.status + " (expected 405).");
		start();
	});
});
asyncTest("MKCOL " + prefix + "/non-existing/non-existing/", function() {
	DAV.mkcol(prefix + '/non-existing/non-existing/').
	done(function(response) {
		ok(false, "should not respond with " + response.status + '.')
		start();
	}).
	fail(function(status, response) {
		ok(response.status === 409, "responds with " + response.status + " (expected 409).");
		start();
	}).
	always(function() {
		DAV.delete(prefix + '/non-existing/');
	});
});
