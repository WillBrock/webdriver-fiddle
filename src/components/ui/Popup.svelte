<script>
	export let open = false;
</script>

<div
	class:hidden={!open}
	class="modal"
>
	<div class="header">
		<slot name="header"></slot>
	</div>

	<div class="content">
		<slot name="content"></slot>
	</div>
</div>

<div
	on:click={() => open = false}
	class:hidden={!open}
	class="overlay"
></div>

<style lang="scss">
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFF;
		width: 500px;
		max-width: 100%;
		max-height: 100%;
		z-index: 1000;
		border-radius: 5px;
		color: #000;

		.header {
			padding: 15px 0 15px 15px;
			color: #000;
			font-weight: 700;
			font-size: 1.6em;
			font-family: Lato,Helvetica Neue,Arial,Helvetica,sans-serif;
			line-height: 25px;
			z-index: 1001;
			border-bottom: 1px solid rgba(34,36,38,.15);
		}

		.content {
			padding: 15px;
		}
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
