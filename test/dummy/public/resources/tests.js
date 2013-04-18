var prefix = '/dav';

asyncTest("PROPFIND " + prefix + "/", function() {
	DAV.propfind(prefix + '/').
	done(function(xml, response) {
		ok(response.status === 207, "responds with 207.");
		start();
	}).
	fail(function(status, response) {
		ok(false, "should not respond with " + response.status + '.');
		start();
	});
});
asyncTest("PROPFIND " + prefix + "/resources/", function() {
	DAV.propfind(prefix + '/resources/').
	done(function(xml, response) {
		ok(response.status === 207, "responds with 207.");
		start();
	}).
	fail(function(status, response) {
		ok(false, "should not respond with " + response.status + '.');
		start();
	});
});
asyncTest("PROPFIND " + prefix + "/resource", function() {
	DAV.propfind(prefix + '/resource').
	done(function(xml, response) {
		ok(response.status === 207, "responds with 207.");
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
		ok(response.status === 404, "responds with 404.");
		start();
	});
});

asyncTest("MKCOL " + prefix + "/non-existing/", function() {
	DAV.mkcol(prefix + '/non-existing/').
	done(function(response) {
		ok(response.status === 201, "responds with 201.");
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
		ok(response.status === 404, "responds with 404");
		start();
	}).
	always(function() {
		DAV.delete(prefix + '/non-existing');
	});
});
asyncTest("MKCOL " + prefix + "/existing/", function() {
	DAV.mkcol(prefix + '/existing/').
	done(function(response) {
		ok(false, "should not respond with " + response.status + '.')
		start();
	}).
	fail(function(status, response) {
		ok(response.status === 405, "responds with 405.");
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
		ok(response.status === 409, "responds with 409.");
		start();
	}).
	always(function() {
		DAV.delete(prefix + '/non-existing/');
	});
});

asyncTest("DELETE " + prefix + "/existing-resource", function() {
	DAV.delete(prefix + '/existing-resource').
	done(function(response) {
		ok(response.status === 204, "responds with 204.")
		start();
	}).
	fail(function(status, response) {
		ok(false, "should respond with 204.");
		start();
	}).
	always(function() {
		DAV.mkcol(prefix + '/existing-resource');
	});
});
asyncTest("DELETE " + prefix + "/non-existing-resource", function() {
	
});
asyncTest("DELETE " + prefix + "/existing-collection/", function() {
	
});
asyncTest("DELETE " + prefix + "/non-existing-collection/", function() {
	
});
