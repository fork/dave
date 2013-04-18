asyncTest("GET " + prefix + "/existing-resource", function() {
	$.get(prefix + "/existing-resource").
	done(function(content) {
		equal(content, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
		start();
	}).
	fail(function() {
		ok(false, "should find existing resource.");
		start();
	});
});
asyncTest("GET " + prefix + "/non-existing-resource", function() {
	$.get(prefix + "/non-existing-resource").
	fail(function(response) {
		equal(response.status, 404);
		start();
	}).
	done(function() {
		ok(false, "should not find resource.");
		start()
	});
});
asyncTest("GET " + prefix + "/existing-collection/", function() {
	$.get(prefix + "/existing-resource/").
	fail(function(response) {
		equal(response.status, 404);
		start();
	}).
	done(function() {
		ok(false, "should not find existing collection.");
		start()
	});
});
