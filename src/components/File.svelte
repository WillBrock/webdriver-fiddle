<script>
	export let name;
	$: type = name.slice(name.lastIndexOf('.') + 1);
</script>

<span>
	<i class="icon yellow {name.match(/.json/) ? `` : `js square`}"></i>
	{name}
</span>

<style lang="scss">
	span {
		&:hover {
			cursor: pointer;
		}
	}
</style>
