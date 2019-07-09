<script>
	import EditorTabs from './EditorTabs.svelte';
	import Editor     from './Editor.svelte';

	export let CDN;
</script>

<div class="editor-container">
	<EditorTabs />
	<Editor {CDN} />
</div>

<style lang="scss">
	.editor-container {
		min-width: 900px;
		border-right: 1px solid #2d333b;
	}
</style>
