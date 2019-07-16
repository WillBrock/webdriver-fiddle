<script>
	import { onMount } from 'svelte';
	import { files }   from '../../store';
	import gql         from '../../utils/request';
	import LeftPane    from './LeftPane/index.svelte';
	import MiddlePane  from './MiddlePane/index.svelte';
	import TestResults from './RightPane/index.svelte';

	const CDN = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict';

	const query = /* GraphQL */`
		query getData($repo: String, $framework: String, $template: String) {
			getRepo(repo: $repo, framework: $framework, template: $template) {
				path, name, content, type, extension, icon, active, open,
			}
		}
	`;

	$: tree = convertToHierarchy($files).files;

	onMount(async() => {
		const variables = {};
		const route     = window.location.pathname.slice(1);

		if(route) {
			variables.repo = route;
		}

		const data  = await gql.request(query, variables);
		const flat  = data.getRepo;

		files.setFiles(flat);
	});

	function getTemplate() {

	}

	function convertToHierarchy(paths) {
		// Build the node structure
		const root_node = { name : `root`, files : [] };

		paths.sort();

		for(let item of paths) {
			buildNodeRecursive(root_node, item.path.split('/'), 0, item);
		}

		return root_node;
	}

	function buildNodeRecursive(node, path, idx, main_item) {
		if(idx < path.length) {
			const item = path[idx];

			node.files.sort((a, b) => b.files.length > a.files.length);

			let directory = node.files.find(child => child.name == item);

			if(!directory) {
				node.files.push(directory = {
					name      : item,
					type      : `file`,
					path      : main_item.path,
					extension : main_item.extension,
					icon      : main_item.icon,
					files     : [],
				});
			}
			else {
				directory.type = `directory`;
			}

			buildNodeRecursive(directory, path, idx + 1, main_item);
		}
	}

</script>

{#if !tree.length}
	loading...
{:else}
	<LeftPane {tree} {getTemplate} />
	<MiddlePane {CDN} />
	<TestResults />
{/if}
