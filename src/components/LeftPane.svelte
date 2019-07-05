<script>
	import Folder from './Folder.svelte';
	import File   from './File.svelte';

	const all_files = [
		{
			name  : `tests`,
			type  : `folder`,
			files : [
				{
					name    : `test-1.js`,
					content : ``,
					type    : `file`,
				},
				{
					name    : `test-2.js`,
					content : ``,
					type    : `file`,
				},
				{
					name    : `Register.page.js`,
					content : ``,
					type    : `file`,
				},
			],
		},
		{
			name    : `package.json`,
			content : ``,
			type    : `file`,
		},
		{
			name    : `wdio.conf.js`,
			content : ``,
			type    : `file`,
		}
	];

	const accordion = {
		templates    : false,
		files        : false,
		dependencies : false,
		cliargs      : false,
	};

	const templates = [
		{
			title : `Mocha and Chai`,
			key   : `mocha-chai`,
		},
		{
			title : `Jasmine`,
			key   : `jasmine`,
		},
		{
			title : `Cucumber`,
			key   : `cucumber`,
		},
	];

	function handleAccordionClick(e) {
		const title = e.target.dataset.title;

		accordion[title] = !accordion[title];
	}
</script>

<div class="container">
	<div class="accordion">
		<div class="title" data-title="templates" on:click={handleAccordionClick}>
			<i class="icon angle {accordion.templates ? 'down' : 'right'}"></i>
			Templates
		</div>

		{#if accordion.templates}
			<ul class="template-list">
				{#each templates as { title, key}}
					<li data-key={key}>{title}</li>
				{/each}
			</ul>
		{/if}

		<div class="title" data-title="files" on:click={handleAccordionClick}>
			<i class="icon angle {accordion.files ? 'down' : 'right'}"></i>
			Files

			<span class="icon-container">
				<i class="upload icon small" title="Upload"></i>
				<i class="download icon small" title="Download"></i>
				<i class="file outline icon small" title="New File"></i>
				<i class="folder open outline icon small" title="New Directory"></i>
			</span>
		</div>

		{#if accordion.files}
			<ul class="file-list">
				{#each all_files as { name, files, content, type }}
					{#if type === `folder`}
						<Folder name={name} files={files} />
					{:else}
						<li>
							<i class="icon yellow {name.match(/.json/) ? `node` : `js square`}"></i>
							{name}
						</li>
					{/if}
				{/each}
			</ul>
		{/if}

		<div class="title" data-title="cliargs" on:click={handleAccordionClick}>
			<i class="icon angle {accordion.cliargs ? 'down' : 'right'}"></i>
			Command Line Options
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
	</div>

	<div class="pane-button">
		<button class="ui button primary">
			<i class="icon github"></i>
			Import Repo
		</button>
	</div>
</div>

<style lang="scss">
	.container {
		padding: 0 5px 5px 5px;
		min-height: 100vh;
		min-width: 225px;
		background-color: #20262e;

		.file-list {
			margin: 5px 0 5px 15px;
			padding: 0 0 0.2em 0;

			li {
				padding: 0.2em 0;

				&:hover {
					cursor: pointer;
				}
			}
		}

		.cliargs-list {
			margin: 5px 0 5px 10px;
			padding: 5px 0 0 0;

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
</style>
