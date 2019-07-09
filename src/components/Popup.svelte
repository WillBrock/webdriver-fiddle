<script>
	export let open = false;
</script>
<div
	class:hidden={!open}
	class="modal"
>
	<slot></slot>
</div>

<div
	class:hidden={!open}
	class="overlay"
>

</div>

<style lang="scss">
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFF;
		width: 200px;
		max-width: 100%;
		height: 200px;
		max-height: 100%;
		z-index: 1000;
		border-radius: 5px;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background: #000;
		opacity: .6;
	}
</style>
