<script>
	import { onMount } from 'svelte';
	import { files, active_file }   from '../../../store';
	import 'ace-builds/src-min-noconflict/ace';
	import 'ace-builds/src-min-noconflict/theme-chrome';
	import 'ace-builds/src-min-noconflict/mode-javascript';

	export let CDN = null;

	onMount(() => {

		// Now we tell ace to use the CDN locations to look for files
		ace.config.set('basePath', CDN);
		ace.config.set('modePath', CDN);
		ace.config.set('themePath', CDN);
		ace.config.set('workerPath', CDN);

		const editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.session.setMode("ace/mode/javascript");
		editor.setShowPrintMargin(false);
		editor.setFontSize(`17px`);

		editor.setValue($active_file.content, -1);
	});
</script>

<div id="editor"></div>

<style lang="scss">
	#editor {
		min-height: 100vh;
		overflow-y: scroll;
	}
</style>
