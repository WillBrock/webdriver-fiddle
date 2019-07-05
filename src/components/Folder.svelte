<script>
	import File from './File.svelte';

	export let expanded = false;
	export let name;
	export let files;

	function toggle() {
		expanded = !expanded;
	}
</script>

<span on:click={toggle}>
	<i class="icon folder outline {expanded ? `open` : ``}"></i>
	{name}
</span>

{#if expanded}
	<ul>
		{#each files as file}
			<li>
				{#if file.type === `folder`}
					<svelte:self {...file} />
				{:else}
					<File {...file} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	span {
		cursor: pointer;
	}

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		padding: 0.2em 0;
	}
</style>
