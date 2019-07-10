<script>
	import Popup from './ui/Popup.svelte';
	import File  from './File.svelte';
	import { files as store_files, active_file } from '../store';

	export let expanded = false;
	export let name, files, path, deleted;

	let new_name        = null;
	const show_actions  = {};
	const display_modal = {};

	function toggle(e) {
		if(e.target.dataset.action !== undefined) {
			return;
		}

		expanded = !expanded;
	}

	function displayModal(e, action) {
		if(e.target.dataset.action === undefined) {
			return;
		}

		new_name = null;
		display_modal[action] = true;
	}

	function renameFolder(path, name) {
		store_files.updateFileState(path, { name });
	}

	// Delete the folder
	function closeDeleteModal(delete_file = false) {
		display_modal.delete = false;

		if(!delete_file) {
			return;
		}

		// @todo need to update all files along with the folder as well
		store_files.updateFileState(path, {
			deleted : true,
			active  : false,
			open    : false,
		});
	}

	// Add a file or folder
	function addFile(e, type = `file`) {
		if(!new_name) {
			return;
		}

		const folder    = type !== `file`;
		const file_path = `${path}/${new_name}`;

		const new_files = [...$store_files, {
			path   : file_path,
			open   : !folder,
			active : !folder,
			name   : new_name,
			// @todo make dynamic icon
			icon   : !folder ? `js square` : ``,
			type,
		}];

		if(!folder) {
			store_files.removeActive();
		}

		store_files.setFiles(new_files);

		if(!folder) {
			const editor = ace.edit("editor");
			editor.setValue($active_file.content || ``);
		}

		display_modal[type] = false;
	}
</script>

<Popup
	open={display_modal.file}
>
	<div slot="header">
		New File
	</div>

	<div slot="content">
		<form on:submit|preventDefault={addFile}>
			<div class="ui input fluid">
				<input
					bind:value={new_name}
					on:keyup={e => new_name = e.target.value}
				/>
			</div>

			<div class="button-container">
				<div><button class="ui green button">Add</button></div>
			</div>
		</form>
	</div>
</Popup>

<Popup
	open={display_modal.folder}
>
	<div slot="header">
		New Folder
	</div>

	<div slot="content">
		<form on:submit|preventDefault={e => addFile(e, `folder`)}>
			<div class="ui input fluid">
				<input
					bind:value={new_name}
					on:keyup={e => new_name = e.target.value}
				/>
			</div>

			<div class="button-container">
				<div><button class="ui green button">Add</button></div>
			</div>
		</form>
	</div>
</Popup>

<Popup
	open={display_modal.edit}
>
	<div slot="header">
		Rename Folder
	</div>

	<div slot="content">
		<form on:submit|preventDefault={() => display_modal.edit = false}>
			<div class="ui input fluid">
				<input
					bind:value={name}
					on:keyup={e => renameFolder(path, name)}
				/>
			</div>

			<div class="button-container">
				<div><button class="ui green button">Save</button></div>
			</div>
		</form>
	</div>
</Popup>

<Popup
	open={display_modal.delete}
>
	<div slot="header">
		Delete Folder
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

{#if name && !deleted}
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

		<div class="action-icons {show_actions[name] ? `` : `hidden`}">
			<i data-action on:click={e => displayModal(e, `file`)} class="icon file outline" title="New File"></i>
			<i data-action on:click={e => displayModal(e, `folder`)} class="icon folder open outline" title="New Directory"></i>
			<i data-action on:click={e => displayModal(e, `edit`)} class="icon pencil alternate" title="Edit Filename"></i>
			<i data-action on:click={e => displayModal(e, `delete`)} class="icon close" title="Delete Directory"></i>
		</div>
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

	.button-container {
		margin-top: 15px;
		display: flex;
		justify-content: flex-end;
	}
</style>
