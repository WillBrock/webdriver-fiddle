<script>
	import Popup from '../../../components/ui/Popup.svelte';

	export let display_modal, repo_url, importRepo;
</script>

<Popup open={display_modal.import}>
	<div slot="header">
		Import GitHub Repo
	</div>

	<div slot="content">
		<div class="ui input fluid">
			<input bind:value={repo_url} placeholder="Repo url" />
		</div>

		<div class="button-container">
			<button class="ui red button" type="button">Cancel</button>
			<button class="ui green button" on:click={importRepo}>Import</button>
		</div>
	</div>
</Popup>

<style lang="scss">
	.button-container {
		margin-top: 15px;
		display: flex;
		justify-content: flex-end;
	}
</style>
