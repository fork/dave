(function(content) {
	asyncTest("PUT " + prefix + "/existing-resource", function() {
		DAV.put(prefix + '/existing-resource', content).
		done(function(response) {
			equal(response.status, 201, "responds with " + response.status + " (expected 201).");
			start();
		}).
		fail(function(status, response) {
			ok(false, "should not respond with " + response.status + '.');
			start();
		});
	});
	asyncTest("PUT " + prefix + "/existing-collection/", function() {
		DAV.put(prefix + '/existing-collection/', content).
		done(function(response) {
			ok(false, "should not respond with " + response.status + '.');
			start();
		}).
		fail(function(status, response) {
			equal(response.status, 404, "responds with " + response.status + " (expected 404).");
			start();
		});
	});
})("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
