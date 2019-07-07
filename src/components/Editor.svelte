<script>
	import { onMount } from 'svelte';
	import 'ace-builds/src-min-noconflict/ace';
	import 'ace-builds/src-min-noconflict/theme-chrome';
	import 'ace-builds/src-min-noconflict/mode-javascript';

	export let flat_data = {};

	const default_code = `import Register from './Register.page';

describe('Registration', () => {
	it('should test form', () => {
		Register.open();

		expect(Register.name.isExisting()).to.be.true;
	});
});
`;

	onMount(() => {
		const CDN = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict';

		// Now we tell ace to use the CDN locations to look for files
		ace.config.set('basePath', CDN);
		ace.config.set('modePath', CDN);
		ace.config.set('themePath', CDN);
		ace.config.set('workerPath', CDN);

		const editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.session.setMode("ace/mode/javascript");
		editor.setShowPrintMargin(false);
		editor.setFontSize(`17px`);
	});
</script>

<div class="editor-container">
	<div class="tabs">
		{#each Object.entries(flat_data) as [path, {name, icon, active, open, hover}]}
			{#if open}
				<div
					class="tab {active ? `active` : ``}"
					data-file={name}
					on:mouseover={e => flat_data[path].hover = true}
					on:mouseout={e => flat_data[path].hover = false}
				>
					<span>
						<i class="icon yellow {icon}"></i>
						{name}
					</span>

					<span class="close-x">
						{#if hover}
							<i class="icon close small"></i>
						{/if}
					</span>
				</div>
			{/if}
		{/each}
	</div>
	<div id="editor">
		{default_code}
	</div>
</div>

<style lang="scss">
	.editor-container {
		min-width: 900px;
		border-right: 1px solid #2d333b;

		.tabs {
			display: flex;
			background-color: #20262e;
			position: relative;


			.tab {
				color: #8e9195;
				min-width: 150px;
				padding: 7px 7px;
				border-right: 1px solid #2d333b;
				text-align: center;
				position: relative;

				.close-x {
					position: absolute;
					right: 2;

					i {
						cursor: pointer;
					}
				}
			}

			.active {
				background-color: #2d333b;
				color: #FFF;
			}
		}

		#editor {
			min-height: 100vh;
			overflow-y: scroll;
		}
	}
</style>
