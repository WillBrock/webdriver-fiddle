<script>
	import { onMount } from 'svelte';
	import 'ace-builds/src-min-noconflict/ace';
	import 'ace-builds/src-min-noconflict/theme-chrome';
	import 'ace-builds/src-min-noconflict/mode-javascript';

	const default_code = `import Register from './Register.page';

describe('Registration', () => {
	it('should test form', () => {
		Register.open();

		expect(Register.name.isExisting()).to.be.true;
	});
});
`;

	onMount(() => {
		const CDN = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict';

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
	});
</script>

<style>
	#editor {
		width: 2300px;
		min-height: 100vh;
		overflow-y: scroll;
	}
</style>

<div id="editor">
	{default_code}
</div>
