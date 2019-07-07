<script>
	import gql         from '../utils/request';
	import LeftPane    from '../components/LeftPane.svelte';
	import Editor      from '../components/Editor.svelte';
	import TestResults from '../components/TestResults.svelte';

	const query = /* GraphQL */`
		{
			getTemplate {
				tree,
				flat {
					path,
					name,
					content,
					type,
				}
			}
		}
	`;

	export let tree_data  = gql.request(query);
	export let flat_data  = {
		'./tests'           : {},
		'./package.json'    : {},
		'./wdio.conf.js'    : {
			name : `wdio.conf.js`,
			open : true,
			icon : `js square`,
		},
		'./tests/test-1.js' : {
			name   : `test-1.js`,
			active : true,
			open   : true,
			icon : `js square`,
		},
		'./package.json' : {
			name : `package.json`,
			open : true,
			icon : `npm`,
		},
	};

</script>

{#await tree_data}
	loading...
{:then files}
	<LeftPane
		tree_data={JSON.parse(files.getTemplate.tree)}
		flat_data={files.getTemplate.flat}
	/>

	<Editor
		tree_data={JSON.parse(files.getTemplate.tree)}
		flat_data={flat_data}
	/>

	<TestResults />
{/await}
