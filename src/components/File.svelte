<script>
	import { files, active_file } from '../store';
	import Popup                  from './Popup.svelte';

	export let name, icon, path, type, content, open, active;
	export let show_modal = false;

	const show_actions = {};

	function handleOpenFile(e, path) {
		if(e.target.dataset.action !== undefined) {
			return;
		}

		files.removeActive();
		files.updateFileState(path, { active : true, open : true });

		const editor = ace.edit("editor");
		editor.setValue($active_file.content);
	}

	function editFile(e) {
		if(e.target.dataset.path !== undefined) {
			return;
		}

		show_modal = true;
	}
</script>

<Popup
	open={show_modal}
>
	<div class="ui input small">
		<input value={name} />
	</div>
</Popup>

<span
	class="file-container"
	on:click={e => handleOpenFile(e, path)}
	on:mouseover={e => show_actions[name] = true}
	on:mouseout={e => show_actions[name] = false}
	data-name={name}
	data-path={path}
>
	<div>
		<i class="icon yellow {icon}"></i>
		{name}
	</div>

	<div
		class:hidden={!show_actions[name]}
		class="action-icons"
	>
		<i on:click={editFile} data-action class="icon pencil alternate" title="Edit Filename"></i>
		<i data-action class="icon close" title="Delete Directory"></i>
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
