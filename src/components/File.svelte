<script>
	export let name, icon, path;
	const show_actions = {};

	//$: type = name.slice(name.lastIndexOf('.') + 1);

	function handleClick() {

	}
</script>

<span
	class="file-container"
	on:click={handleClick}
	on:mouseover={e => show_actions[name] = true}
	on:mouseout={e => show_actions[name] = false}
	data-name={name}
	data-path={path}
>
	<div>
		<i class="icon yellow {icon}"></i>
		{name}
	</div>

	<div class="action-icons {show_actions[name] ? `` : `hidden`}">
		<i class="icon pencil alternate" title="Edit Filename"></i>
		<i class="icon close" title="Delete Directory"></i>
	</div>
</span>

<style lang="scss">
	.file-container {
		display: flex;
		cursor: pointer;
		padding: 2px 0;

		&:hover {
			background-color: #2F3129;
			opacity: .7;
		}

		.action-icons {
			margin-left: auto;

			i {
				font-size: .9em;
			}
		}
	}
</style>
