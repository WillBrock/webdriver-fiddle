<script>
	import EditorTabs from './EditorTabs.svelte';
	import Editor     from './Editor.svelte';

	export let CDN;
	export let saving;
	export let saveChanges;
</script>

<div class="editor-container">
	<EditorTabs />
	<Editor {CDN} {saveChanges} {saving} />
</div>

<style lang="scss">
	.editor-container {
		min-width: 900px;
		border-right: 1px solid #2d333b;
	}
</style>
