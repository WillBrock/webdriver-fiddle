<script>
	import {
		files,
		active_file,
		editor,
		editor_sessions
	} from '../../../store';
	import { onMount } from 'svelte';
	import getEditorMode from '../../../helpers/getEditorMode';
	import 'ace-builds/src-min-noconflict/ace';
	import 'ace-builds/src-min-noconflict/theme-chrome';
	import 'ace-builds/src-min-noconflict/mode-javascript';

	export let CDN = null;
	export let saveChanges;

	onMount(() => {
		// Now we tell ace to use the CDN locations to look for files
		ace.config.set('basePath', CDN);
		ace.config.set('modePath', CDN);
		ace.config.set('themePath', CDN);
		ace.config.set('workerPath', CDN);

		const init_editor = ace.edit("editor");
		init_editor.setTheme("ace/theme/monokai");
		init_editor.setShowPrintMargin(false);
		init_editor.setFontSize(`17px`);

		editor.set(init_editor);

		$files.filter(file => file.open).forEach(file => {
			const editor_mode = getEditorMode(file.extension);
			editor_sessions.add(file.path, ace.createEditSession(file.content, editor_mode));
		});

		$editor.setSession($editor_sessions[$active_file.path]);
	});

	function checkSaving(e) {
		if((e.ctrlKey || e.metaKey) && e.which === 83) {
			e.preventDefault();

			saveChanges();
		}
	}
</script>

<div
	id="editor"
	on:keydown={checkSaving}
>

</div>

<style lang="scss">
	#editor {
		min-height: 100vh;
		overflow-y: scroll;
	}
</style>
