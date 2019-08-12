<script>
	import debounce  from 'lodash.debounce';
	import { files } from '../../../store';
	import Popup     from '../../../components/ui/Popup.svelte';
	import gql       from '../../../utils/request';

	export let display_modal;
	export let results = [];
	export let search  = null;

	const PACKAGE_PATH = `package.json`;

	const handleSearch = debounce(async () => {
		const query = `
			query SearchPackages($search: String) {
				searchPackages(search: $search) {
					id,
					version,
					title,
				}
			}
		`;

		results = (await gql.request(query, { search })).searchPackages;
		console.log(results, `results`)
	}, 300);

	function selectDependency(e) {
		const dataset      = e.target.dataset;
		const package_file = $files.find(file => file.path === PACKAGE_PATH);
		const content      = JSON.parse(package_file.content);

		content.devDependencies[dataset.id] = dataset.version;
		package_file.content                = JSON.stringify(content, null, `\t`);

		files.updateFileState(PACKAGE_PATH, package_file);

		display_modal.dependency = false;
	}
</script>

<Popup open={display_modal.dependency}>
	<div slot="header">
		Add Dependency
	</div>

	<div slot="content">
		<div class="ui input fluid">
			<input
				bind:value={search}
				on:keyup={handleSearch}
				placeholder="Search"
			/>
		</div>

		<div class="results-container">
			<div class="ui relaxed divided list">
				{#each results as { title, id, version }}
					<div
						class="item"
						data-id={id}
						data-version={version}
						on:click={selectDependency}
					>
						<div class="content">
							<span class="header">{title}</span>
							<div class="description">{version}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Popup>

<style lang="scss">
	.results-container {
		margin-top: 15px;

		.item {
			cursor: pointer;

			&:hover {
				background: #F5F5F5;
			}
		}
	}
</style>
