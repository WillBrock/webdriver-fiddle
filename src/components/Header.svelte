
<header>
	<div>
		<p>WebDriver Fiddle</p>
	</div>

	<div class="run-button-container">
		<button class="ui button primary small">
			<i class="icon play"></i>
			Run
		</button>

		<button class="ui button primary small">
			<i class="icon save"></i>
			Save
		</button>

		<!-- If viewing another persons repo, instead of save you can fork -->
		<button class="ui button primary small">
			<i class="icon random"></i>
			Fork
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

			button {
				margin-right: 7px;
			}
		}

		.right-container {
			margin-left: auto;
		}
	}
</style>
