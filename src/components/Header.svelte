<script>
	import {
		files,
		editor_sessions,
		terminal,
	} from '../store';
	import gql from '../utils/request';

	export let saving = false;
	export let saveChanges;

	const socket_path = `ws://localhost:4000/foo`;

	async function runTests() {
		await saveChanges();

		const repo = window.location.pathname.slice(1);

		if(!repo) {
			throw new Error(`No repo specified in runTests()`);
		}

		console.log(`it triggered`, repo);

		const socket = new WebSocket(socket_path);

		socket.on(`message`, (data) => {
			console.log(`from message`, data);
		});

		const query = `
			query RunTests($repo: String) {
				runTests(repo: $repo)
			}
		`;

		await gql.request(query, { repo });

		// Results will be streamed real time to the terminal console that was setup
		// All the above needs to do is trigger the job AKA kind of like a jenkins job
	}
</script>

<header>
	<div>
		<p>WebDriver Fiddle</p>
	</div>

	<div class="run-button-container">
		<button
			on:click={runTests}
			class="ui button primary small"
		>
			<i class="icon play"></i>
			Run
		</button>

		<button
			class:loading={saving}
			class="ui button primary small"
			on:click={saveChanges}
		>
			<i class="icon save"></i>
			Save
		</button>

		<!-- If viewing another persons repo, instead of save you can fork -->
		<!--
		<button class="ui button primary small">
			<i class="icon random"></i>
			Fork
		</button>
		-->
	</div>

	<div class="right-container">
		<button class="ui button primary small">
			<i class="icon share alternate"></i>
			Share
		</button>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		padding: 0 10px;
		height : 50px;
		background-color: #1c2128;
		border-bottom : 1px solid rgb(17, 21, 24);

		p {
			color : #FFF;
			font-weight: bold;
			font-size: 16px;
		}

		.run-button-container {
			margin-left: 25px;

			button {
				margin-right: 7px;
			}
		}

		.right-container {
			margin-left: auto;
		}
	}
</style>
