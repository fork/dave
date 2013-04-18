asyncTest("DELETE " + prefix + "/existing-resource", function() {
	DAV.delete(prefix + '/existing-resource').
	done(function(response) {
		ok(response.status === 204, "responds with " + response.status + " (expected 204).")
		start();
	}).
	fail(function(status, response) {
		ok(false, "should respond with 204.");
		start();
	}).
	always(function() {
		var content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
		DAV.put(prefix + '/existing-resource', content);
	});
});
asyncTest("DELETE " + prefix + "/non-existing-resource", function() {
	DAV.delete(prefix + '/non-existing-resource').
	done(function(response) {
		ok(false, "should respond with 404.")
		start();
	}).
	fail(function(status, response) {
		ok(response.status === 404, "responds with " + response.status + " (expected 404).");
		start();
	});
});
asyncTest("DELETE " + prefix + "/existing-collection/", function() {
	
});
asyncTest("DELETE " + prefix + "/non-existing-collection/", function() {
	
});
