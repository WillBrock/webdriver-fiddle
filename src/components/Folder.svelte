<script>
	import File from './File.svelte';

	export let expanded = false;
	export let name, files, path;

	const show_actions = {};

	function toggle() {
		expanded = !expanded;
	}
</script>

{#if name}
	<span
		class="folder-container"
		on:mouseover={e => show_actions[name] = true}
		on:mouseout={e => show_actions[name] = false}
		on:click={toggle}
		data-name={name}
		data-path={path}
	>
		<div>
			<i class="icon folder {expanded ? `open` : ``}"></i>
			{name}
		</div>

		{#if show_actions[name]}
			<div class="action-icons">
				<i class="icon file outline" title="New File"></i>
				<i class="icon folder open outline" title="New Directory"></i>
				<i class="icon pencil alternate" title="Edit Filename"></i>
				<i class="icon close" title="Delete Directory"></i>
			</div>
		{/if}
	</span>
{/if}

{#if expanded}
	<ul class="{!name ? `tree-trunk` : `tree-branch`}">
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
	.folder-container {
		display: flex;
		cursor: pointer;
		padding: 2px 0;

		&:hover {
			background-color: #2F3129;
			opacity: .7;
		}
	}

	.action-icons {
		margin-left: auto;

		i {
			font-size: .9em;
		}
	}

	ul.tree-trunk {
		margin: 10px 0 5px 15px;
		padding: 0 0 0.2em 0;
	}

	ul.tree-branch {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		padding: 0.1em 0;
	}
</style>
