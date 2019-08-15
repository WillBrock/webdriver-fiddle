<script>
	import { onMount }            from 'svelte';
	import { files, active_file } from '../../../store';
	import gql                    from '../../../utils/request';
	import Popup                  from '../../../components/ui/Popup.svelte';
	import Folder                 from './Folder.svelte';
	import File                   from './File.svelte';
	import ImportRepo             from './ImportRepo.svelte';
	import AddDependency          from './AddDependency.svelte';
	import History                from './History.svelte';

	export let getTemplate, getRepo;
	export let tree               = [];
	export let frameworks         = [];
	export let active_framework   = `webdriverio`;
	export let repo_url           = null;
	export let history            = [];

	$: added_dependencies = getDependencies($files);

	const PACKAGE_PATH = `package.json`;

	const accordion = {
		templates    : false,
		files        : true,
		dependencies : false,
		cliargs      : false,
	};

	const display_modal = {};
	let new_name        = null;

	const templates = {
		webdriverio : [
			{
				title : `Mocha and Chai`,
				key   : `mocha`,
			},
			{
				title : `Jasmine`,
				key   : `jasmine`,
			},
			{
				title : `Cucumber`,
				key   : `cucumber`,
			},
		],
		python : [
			{
				title : `Mocha and Chai`,
				key   : `mocha`,
			},
		],
	};

	onMount(async () => {
		const query = `
			query GetHistory($user: Int) {
				getHistory(user: $user)
			}
		`;

		history = (await gql.request(query, { user : 123 })).getHistory;
	});

	function handleAccordionClick(e) {
		const title = e.target.dataset.title;
		accordion[title] = !accordion[title];
	}

	function displayModal(e, action) {
		if(e.target.dataset.action === undefined) {
			return;
		}

		clearModals();

		new_name = null;
		display_modal[action] = true;
	}

	// Add a file or folder
	function addFile(e, type = `file`) {
		if(!new_name) {
			return;
		}

		const folder    = type !== `file`;
		const file_path = new_name;

		const new_files = [...$files, {
			path   : file_path,
			open   : !folder,
			active : !folder,
			name   : new_name,
			// @todo make dynamic icon
			icon   : !folder ? `js square` : ``,
			type,
		}];

		if(!folder) {
			files.removeActive();
		}

		files.setFiles(new_files);

		if(!folder) {
			//const editor = ace.edit("editor");
			//editor.setValue($active_file.content || ``, -1);
		}

		display_modal[type] = false;
	}

	function clearModals() {
		for(const type in display_modal) {
			display_modal[type] = false;
		}
	}

	async function importRepo() {
		console.log(`importRepo`, repo_url);

		const query = `
			query ImportRepo($repo_url: String) {
				importRepo(repo_url: $repo_url)
			}
		`;

		const data = await gql.request(query, { repo_url });
		const repo = data.importRepo;

		if(!repo) {
			throw new Error(`Invalid repo returned`);
		}

		// Get and set the new files
		await getRepo(repo);
	}

	function getDependencies(all_files) {
		const package_file = all_files.find(file => file.path === PACKAGE_PATH);
		const content      = JSON.parse(package_file.content);
		const dependencies = content.devDependencies;
		const tmp          = [];

		for(const [ title, version ] of Object.entries(dependencies)) {
			tmp.push({
				title,
				version,
			});
		}

		return tmp;
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

<ImportRepo {display_modal} repo_url={repo_url} {importRepo} />
<AddDependency {display_modal} {added_dependencies} />
<History {display_modal} {getRepo} {history} />

<div class="container">
	<!--
	<button class="ui button small framework-selection">
		WebdriverIO
		<i class="icon chevron down"></i>
	</button>
	-->

	<div class="accordion">
		<div class="title" data-title="templates" on:click={handleAccordionClick}>
			<i class="icon angle {accordion.templates ? 'down' : 'right'}"></i>
			Templates

			<div class="icon-container">
				<i
					class="icon info circle"
					title="Select a template to get started fast."
				></i>
			</div>
		</div>

		{#if accordion.templates}
			<ul class="template-list">
				{#each templates[active_framework] as { title, key }}
					<li
						on:click={(e) => {
							getTemplate(active_framework, e.target.dataset.key);
						}}
						data-key={key}
					>{title}</li>
				{/each}
			</ul>
		{/if}

		<div class="title" data-title="files" on:click={handleAccordionClick}>
			<i class="icon angle {accordion.files ? 'down' : 'right'}"></i>
			Files

			<span class="icon-container">
				<i data-action on:click={e => displayModal(e, `file`)} class="icon file outline" title="New File"></i>
				<i data-action on:click={e => displayModal(e, `folder`)} class="icon folder open outline" title="New Directory"></i>
			</span>
		</div>

		{#if accordion.files}
			<div class="file-list">
				<Folder name="" files={tree} expanded />
			</div>
		{/if}

		<div class="title" data-title="cliargs" on:click={handleAccordionClick}>
			<i class="icon angle {accordion.cliargs ? 'down' : 'right'}"></i>
			Command Line Options

			<div class="icon-container">
				<i
					class="icon info circle"
					title="By default all tests will be ran. This can be overwritten by specifying additional cli arguments"
				></i>
			</div>
		</div>

		{#if accordion.cliargs}
			<ul class="cliargs-list">
				<li class="ui input small">
					<input name="config" placeholder="config" value="wdio.conf.js" />
				</li>
				<li class="ui input small">
					<input name="spec" placeholder="spec" />
				</li>
				<li class="ui input small">
					<input name="suite" placeholder="suite" />
				</li>
			</ul>
		{/if}

		<div class="title" data-title="dependencies" on:click={handleAccordionClick}>
			<i class="icon angle {accordion.dependencies ? 'down' : 'right'}"></i>
			Dependencies
		</div>

		{#if accordion.dependencies}
			{#if added_dependencies.length}
				<ul class="dependencies-list">
					{#each added_dependencies as { title, version }}
						<li>
							<div>{title}</div>
							<div class="version">{version}</div>
						</li>
					{/each}
				</ul>
			{/if}

			<div class="pane-button add-dependency">
				<button
					data-action
					class="ui button primary"
					on:click={(e) => displayModal(e, `dependency`)}
				>
					<i class="icon code"></i>
					Add Dependency
				</button>
			</div>
		{/if}
	</div>

	<div class="pane-button">
		<button
			data-action
			class="ui button primary"
			on:click={(e) => displayModal(e, `import`)}
		>
			<i class="icon github"></i>
			Import Repo
		</button>
	</div>

	<div class="pane-button">
		<button class="ui button primary">
			<i class="icon history"></i>
			History
		</button>
	</div>
</div>

<style lang="scss">
	.container {
		padding: 0 5px 5px 5px;
		flex: 0 0 250px;
		background-color: #20262e;
		border-right: 1px solid #2d333b;

		.framework-selection {
			margin: 7px 0 10px 0;
			width: 100%;

			i {
				margin-left: 10px !important;
			}
		}

		.file-list {
			margin: -5px 0 0 0;
			padding: 0;
		}

		.icon-container {
			i {
				font-size: .9em;

				&:hover {
					color: #FFF !important;
				}
			}
		}

		.cliargs-list {
			margin: 5px 0 5px 10px;
			padding: 5px 0 0 0;

			li {
				width: 100%;
				padding-right: 10px;
			}

			input {
				margin-bottom: 10px;
				border-radius: 3px !important;
			}
		}

		.pane-button {
			margin-top: 15px;

			button {
				width: 100%
			}
		}
	}

	.accordion {
		color: #FFF;
	}

	.accordion .title {
		padding: 12px 0;
		font-size: 16px;
		border-bottom: 1px solid #2d333b;
		border-top: 1px solid #2d333b;

		&:hover {
			color: #8e9195;
		}
	}

	.accordion .title:hover {
		cursor: pointer;
	}

	.template-list {
		font-size: 14px;
		padding: 5px 0 0 35px;
		margin: 0 0 13px 0;
	}

	.template-list li {
		padding: 3px 0 0 0;
		color: #8e9195;
	}

	.template-list li:hover {
		cursor: pointer;
		opacity: .5;
	}

	.icon-container {
		float: right;
		margin-right: 5px;
	}

	.button-container {
		margin-top: 15px;
		display: flex;
		justify-content: flex-end;
	}

	.add-dependency {
		border-bottom: 1px solid #2d333b;
	}

	.dependencies-list {
		margin-left: -30px;
		margin-right: 10px;

		li {
			display: flex;
			color: #8e9195;
			padding: 1px 0;

			.version {
				margin-left: auto;
			}
		}
	}
</style>
