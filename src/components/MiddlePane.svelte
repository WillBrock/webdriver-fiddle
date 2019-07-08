<script>
	import EditorTabs from './EditorTabs.svelte';
	import Editor     from './Editor.svelte';
</script>

<div class="editor-container">
	<EditorTabs />
	<Editor />
</div>

<style lang="scss">
	.editor-container {
		min-width: 900px;
		border-right: 1px solid #2d333b;
	}
</style>
