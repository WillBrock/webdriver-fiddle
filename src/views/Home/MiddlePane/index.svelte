<script>
	import EditorTabs from './EditorTabs.svelte';
	import Editor     from './Editor.svelte';

	export let CDN;
	export let saving;
	export let saveChanges;
	export let editor_expanded = false;
</script>

<div
	class:expanded={editor_expanded}
	class="editor-container"
>
	<EditorTabs {editor_expanded} />
	<Editor {CDN} {saveChanges} {saving} />
</div>

<style lang="scss">
	.editor-container {
		flex: 1.5;
		border-right: 1px solid #2d333b;
	}

	.editor-container.expanded {
		flex: 100 !important;
	}
</style>
