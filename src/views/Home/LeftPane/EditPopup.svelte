<script>
	import Popup from '../../../components/ui/Popup.svelte';

	export let title = ``;
	export let name  = ``;
	export let show_edit_modal;
</script>

<Popup open={show_edit_modal}>
	<div slot="header">
		{title} {show_edit_modal}
	</div>

	<div slot="content">
		<div class="ui input fluid">
			<input bind:value={name} />
		</div>

		<div class="button-container">
			<div><button on:click={() => show_edit_modal = false} class="ui red button">Cancel</button></div>
			<div><button on:click={() => show_edit_modal = false} class="ui green button">Save</button></div>
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
