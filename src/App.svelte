<script>
	import Header from './components/Header.svelte';
	import Home from './views/Home/Home.svelte';
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
	<Home />
</div>
