<script>
	const results = `
[0-0] RUNNING in chrome - /sis/modules/Login/tests/FOCUS-10565.js
[0-0] PASSED in chrome - /sis/modules/Login/tests/FOCUS-10565.js

 "spec" Reporter:
------------------------------------------------------------------
[chrome  linux #0-0] Spec: /home/focus/dev/trunk/focus-automation/sis/modules/Login/tests/FOCUS-10565.js
[chrome  linux #0-0] Running: chrome on linux
[chrome  linux #0-0]
[chrome  linux #0-0] FOCUS-10565 - Verify that you can't login with an empty or invalid password
[chrome  linux #0-0]    ✓ Tries to log in without password
[chrome  linux #0-0]    ✓ Tries to log in with an incorrect password
[chrome  linux #0-0]
[chrome  linux #0-0] 2 passing (4.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:07
	`.split(`\n`);
</script>

<div class="test-results-container">
	{#each results as line}
		<p>{line}</p>
	{/each}
</div>

<style>
	.test-results-container {
		background-color: #20262e;
		color: #FFF;
		min-height: 100vh;
		overflow-y: scroll;
		padding: 3px 10px;
	}

	.test-results-container p {
		margin: 3px 0;
	}
</style>
