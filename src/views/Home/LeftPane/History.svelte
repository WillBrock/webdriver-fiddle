<script>
	import Popup  from '../../../components/ui/Popup.svelte';
	import Loader from '../../../components/ui/Loader.svelte';

	export let display_modal, getRepo;
	let history = [];

	async function selectRepo(e) {
		await getRepo(e.target.dataset.repo)
		open = false;
	}
</script>

<Popup open={display_modal.history}>
	<div slot="header">
		Latest Fiddles
	</div>

	<div slot="content">
		<ul>
			{#each history as { repo }}
				<li
					on:click={selectRepo}
					data-repo={repo}
				>{repo}</li>
			{/each}
		</ul>
	</div>
</Popup>
