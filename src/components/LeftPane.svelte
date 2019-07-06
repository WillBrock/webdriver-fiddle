<script>
	import Folder from './Folder.svelte';
	import File   from './File.svelte';

	export let all_files;

	const accordion = {
		templates    : false,
		files        : true,
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
	<button class="ui button small framework-selection">
		WebdriverIO
		<i class="icon chevron down"></i>
	</button>

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
			</span>
		</div>

		{#if accordion.files}
			<div class="file-list">
				<Folder name="" files={all_files} expanded />
			</div>
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
		<button class="ui button">
			<i class="icon github"></i>
			Import Repo
		</button>
	</div>
</div>

<style lang="scss">
	.container {
		padding: 0 5px 5px 5px;
		min-height: 100vh;
		min-width: 275px;
		background-color: #20262e;

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
