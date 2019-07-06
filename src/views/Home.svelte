<script>
	import gql         from '../utils/request';
	import LeftPane    from '../components/LeftPane.svelte';
	import Editor      from '../components/Editor.svelte';
	import TestResults from '../components/TestResults.svelte';

	export let all_files = gql.request(`{ getTemplate }`);

</script>

{#await all_files}
	loading...
{:then files}
	<LeftPane all_files={JSON.parse(files.getTemplate)} />
	<Editor all_files={JSON.parse(files.getTemplate)} />
	<TestResults />
{/await}
