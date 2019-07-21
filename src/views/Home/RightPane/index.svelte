<script>
	import { terminal } from '../../../store';
	import { onMount }  from 'svelte';
	import { Terminal } from 'xterm';
	import { FitAddon } from 'xterm-addon-fit';
	import { AttachAddon } from 'xterm-addon-attach';

	onMount(() => {
		const container = document.querySelector(`.test-results-container`);
		const term = new Terminal();
		term.loadAddon(new FitAddon());

		terminal.setTerminal(term);

		// Add socket here to first param
		//term.loadAddon(new AttachAddon());

		term.open(container);
		term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
	});

</script>

<div class="test-results-container">

</div>

<style lang="scss">
	.test-results-container {
		min-height: 100vh;
	}
</style>
