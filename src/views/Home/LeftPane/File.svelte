<script>
	import {
		files,
		active_file,
		editor_sessions,
		editor,
	} from '../../../store';
	import Popup     from '../../../components/ui/Popup.svelte';
	import EditPopup from './EditPopup.svelte';

	export let name, icon, path, type, open, active, deleted;
	export let show_edit_modal   = false;
	export let show_delete_modal = false;

	$: console.log($editor_sessions, `foobar`);

	const show_actions = {};

	function handleOpenFile(e, path) {
		if(e.target.dataset.action !== undefined) {
			return;
		}

		files.removeActive();
		files.updateFileState(path, { active : true, open : true });

		const EditSession = ace.require(`ace/edit_session`).EditSession;

		if(!$editor_sessions[path]) {
			editor_sessions.add(path, ace.createEditSession($active_file.content, `ace/mode/javascript`));
			$editor.setSession($editor_sessions[path]);
		}
	}

	function displayModal(e, action) {
		if(e.target.dataset.path !== undefined) {
			return;
		}

		if(action === `edit`) {
			show_edit_modal = true;
		}
		else {
			show_delete_modal = true;
		}
	}

	function renameFile(e, path) {
		const value = e.target.value;
		files.updateFileState(path, { name : value });
	}

	function closeEditModal() {
		show_edit_modal = false;
	}

	function closeDeleteModal(delete_file = false) {
		show_delete_modal = false;

		if(!delete_file) {
			return;
		}

		files.updateFileState(path, {
			deleted : true,
			active  : false,
			open    : false,
		});
	}
</script>

<Popup
	open={show_edit_modal}
>
	<div slot="header">
		Rename File
	</div>

	<div slot="content">
		<div class="ui input fluid">
			<input
				value={name}
				on:keyup={e => renameFile(e, path)}
			/>
		</div>

		<div class="button-container">
			<div><button on:click={closeEditModal} class="ui red button">Cancel</button></div>
			<div><button on:click={closeEditModal} class="ui green button">Save</button></div>
		</div>
	</div>
</Popup>

<Popup
	open={show_delete_modal}
>
	<div slot="header">
		Delete File
	</div>

	<div slot="content">
		<div>
			Are you sure you want to delete {name}?
		</div>

		<div class="button-container">
			<div><button on:click={e => closeDeleteModal()} class="ui red button">No</button></div>
			<div><button on:click={e => closeDeleteModal(true)} class="ui green button">Yes</button></div>
		</div>
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
		<i on:click={e => displayModal(e, `edit`)} data-action class="icon pencil alternate" title="Edit Filename"></i>
		<i on:click={e => displayModal(e, `delete`)} data-action class="icon close" title="Delete Directory"></i>
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

				&:hover {
					color: #FFF !important;
					font-weight: bold;
				}
			}
		}
	}

	.button-container {
		margin-top: 15px;
		display: flex;
		justify-content: flex-end;
	}
</style>
