<script>
	import { files } from '../store';

	let hover = null;

	$: open_files = $files.filter((file) => file.open);

	const handleClose = (e, path) => {
		if(e.target.dataset.close === undefined) {
			return;
		}

		files.closeFile(path);
	}

	const handleTabClick = (e, path) => {
		if(e.target.dataset.close !== undefined) {
			return;
		}
	}
</script>

<div class="tabs">
	<div class="tabs-container">
		{#each open_files as { path, name, icon, active }}
			<div
				class="tab {active ? `active` : ``}"
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
						class="icon close small {hover === path ? `` : `hidden`}"
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
