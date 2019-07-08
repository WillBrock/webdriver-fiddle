<script>
	import { onMount } from 'svelte';
	import { files }   from '../store';
	import gql         from '../utils/request';
	import LeftPane    from '../components/LeftPane.svelte';
	import MiddlePane  from '../components/MiddlePane.svelte';
	import TestResults from '../components/TestResults.svelte';

	const query = /* GraphQL */`
		{
			getTemplate
		}
	`;

	let tree = [];

	onMount(async() => {
		const data = await gql.request(query);
		tree = JSON.parse(data.getTemplate);

		//files.setFiles(flattenTree(tree));
		files.setFiles([
			{
				path : `./wdio.conf.js`,
				name : `wdio.conf.js`,
				open : true,
				icon : `js square`,
			},
			{
				path   : `./tests/test-1.js`,
				name   : `test-1.js`,
				active : true,
				open   : true,
				icon   : `js square`,
			},
			{
				path : `./package.json`,
				name : `package.json`,
				open : true,
				icon : `npm`,
			},
		]);
	});

	function flattenTree(tree) {

	}

</script>

{#if !tree.length}
	loading...
{:else}
	<LeftPane {tree} />
	<MiddlePane />
	<TestResults />
{/if}
