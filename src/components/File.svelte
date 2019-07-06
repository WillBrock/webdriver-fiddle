<script>
	export let name, icon, path;
	$: type = name.slice(name.lastIndexOf('.') + 1);
</script>

<span data-name={name} data-path={path}>
	<i class="icon yellow {icon}"></i>
	{name}
</span>

<style lang="scss">
	span {
		&:hover {
			cursor: pointer;
		}
	}
</style>
