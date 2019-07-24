<script>
	import {
		files,
		editor_sessions,
		results_socket,
	} from '../store';
	import gql from '../utils/request';
	import * as attach  from 'xterm/lib/addons/attach/attach';
	import * as fit     from 'xterm/lib/addons/fit/fit';
	import { Terminal } from 'xterm';

	export let saving = false;
	export let saveChanges;

	async function runTests() {
		await saveChanges();

		const repo = window.location.pathname.slice(1);

		if(!repo) {
			throw new Error(`No repo specified in runTests()`);
		}

		const container = document.querySelector(`.test-results-container`);

		Terminal.applyAddon(fit);
		Terminal.applyAddon(attach);

		const term = new Terminal({
		//	cols       : 100,
			convertEol : true,
			useStyle   : true,
		});

		term.open(container);
		term.fit();

		term.attach($results_socket, true, true);

		console.log(repo, `repo..`)

		$results_socket.send(JSON.stringify({
			action : `run-tests`,
			repo,
		}));
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

		<button class="ui button primary small">
			<i class="icon download"></i>
			Download
		</button>

		<!-- If viewing another persons repo, instead of save you can fork -->
		<!--
		<button class="ui button primary small">
			<i class="icon random"></i>
			Fork
		</button>
		-->
	</div>
</header>

<style lang="scss">
	header {
		position: absolute;
		display: flex;
		top: 0;
		left: 0;
		align-items: center;
		padding: 0 10px;
		height : 50px;
		width: 100%;
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
	}
</style>
