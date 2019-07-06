
<header>
	<div>
		<p>WebDriver Fiddle</p>
	</div>

	<div class="run-button-container">
		<button class="ui button primary small">
			<i class="icon play"></i>
			Run
		</button>
	</div>

	<div class="right-container">
		<button class="ui button primary small">
			<i class="icon share alternate"></i>
			Share
		</button>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		padding: 0 10px;
		height : 50px;
		background-color: #1c2128;
		border-bottom : 1px solid rgb(17, 21, 24);

		p {
			color : #FFF;
			font-weight: bold;
			font-size: 16px;
		}

		.run-button-container {
			margin-left: 25px;
		}

		.right-container {
			margin-left: auto;
		}
	}
</style>
