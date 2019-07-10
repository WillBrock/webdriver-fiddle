<script>
	import { onMount } from 'svelte';
	import { files, active_file } from '../store';

	let hover = null;

	$: open_files = $files.filter((file) => file.open);

	onMount(() => {

	});

	const handleClose = (e, path) => {
		if(e.target.dataset.close === undefined) {
			return;
		}

		files.updateFileState(path, { open : false });
	}

	const handleTabClick = (e, path) => {
		if(e.target.dataset.close !== undefined) {
			return;
		}

		files.removeActive();
		files.updateFileState(path, { active : true });

		const editor = ace.edit("editor");
		editor.setValue($active_file.content || ``);
	}
</script>

<div class="tabs">
	<div class="tabs-container">
		{#each open_files as { path, name, icon, active }}
			<div
				class:active={active}
				class="tab"
				on:mouseover={() => hover = path}
				on:mouseout={() => hover = null}
				on:click={(e) => handleTabClick(e, path)}
			>
				<span>
					<i class="icon yellow {icon}"></i>
					{name}
				</span>

				<span
					class="close-x"
					on:click={(e) => handleClose(e, path)}
				>
					<i
						data-close
						class:hidden={hover !== path}
						class="icon close small"
					></i>
				</span>
			</div>
		{/each}
	</div>

	<div class="expand-editor" title="Expand Editor">
		<i class="icon angle right large"></i>
	</div>
</div>

<style lang="scss">
	.tabs {
		display: flex;
		background-color: #20262e;
		position: relative;
		align-items: center;

		.tabs-container {
			display: flex;
			overflow-x: auto;
		}

		.tab {
			color: #8e9195;
			min-width: 150px;
			padding: 7px 7px;
			border-right: 1px solid #2d333b;
			text-align: center;
			position: relative;
			cursor: pointer;

			.close-x {
				position: absolute;
				right: 0;
			}
		}

		.tab.active {
			background-color: #2d333b;
			color: #FFF;
		}

		.expand-editor {
			margin-left: auto;
			color: #FFF;
			cursor: pointer;
		}
	}
</style>
