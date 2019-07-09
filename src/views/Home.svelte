<script>
	import { onMount } from 'svelte';
	import { files }   from '../store';
	import gql         from '../utils/request';
	import LeftPane    from '../components/LeftPane.svelte';
	import MiddlePane  from '../components/MiddlePane.svelte';
	import TestResults from '../components/TestResults.svelte';

	const CDN = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict';

	const query = /* GraphQL */`
		{
			getTemplate
		}
	`;

	let tree = [];

	onMount(async() => {
		const data = await gql.request(query);
		tree       = JSON.parse(data.getTemplate);

		files.setFiles(flattenTree(tree));
	});

	// @todo many need to sort the tree by folders first
	function flattenTree(tree, files = []) {
		for(const branch of tree) {
			const type = branch.type;

			files.push(branch);

			if(type === `folder`) {
				flattenTree(branch.files, files);
			}
		}

		return files;
	}

</script>

{#if !tree.length}
	loading...
{:else}
	<LeftPane {tree} />
	<MiddlePane {CDN} />
	<TestResults />
{/if}
