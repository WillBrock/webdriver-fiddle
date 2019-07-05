<script>
	import Header from './components/Header.svelte';
	import LeftPane from './components/LeftPane.svelte';
	import Editor from './components/Editor.svelte';
	import TestResults from './components/TestResults.svelte';

	export let name;
</script>

<style>
	.flex-container {
		display: flex;
		align-content: stretch;
		position: relative;
	}
</style>

<Header />
<div class="flex-container">
	<LeftPane />
	<Editor />
	<TestResults />
</div>
