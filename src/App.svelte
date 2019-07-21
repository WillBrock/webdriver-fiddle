<script>
	import { files, editor_sessions } from './store';
	import gql    from './utils/request';
	import Header from './components/Header.svelte';
	import Home   from './views/Home/Home.svelte';

	let saving = false;

	async function saveChanges() {
		const repo = window.location.pathname.slice(1) || ``;

		for(const file of $files) {
			const filepath = file.path;

			if(!$editor_sessions[filepath]) {
				continue;
			}

			const session_content = $editor_sessions[filepath].getValue();

			// If the file didn't change then nothing to save
			if(session_content === file.content) {
				continue;
			}

			files.updateFileState(filepath, { content : session_content });
		}

		const updates = $files.filter(file => (file.updated || file.deleted || file.active || file.open));

		if(!updates.length) {
			return;
		}

		const query = /* GraphQL */`
			mutation SendData($repo: String, $files: [SaveFilesInput]) {
				saveFiles(repo: $repo, files: $files) {
					repo,
					files {
						original_path,
						original_name,
						path,
						name,
						content,
						type,
						extension,
						active,
						open,
						icon,
					}
				}
			}
		`;

		const variables = {
			repo,
			files : updates,
		};

		saving = true;

		const fresh_files = await gql.request(query, variables);
		files.setFiles(fresh_files.saveFiles.files);

		saving = false;

		// Check if this was a new repo, if so update the url with the repo id
		if(!repo) {
			history.pushState({}, null, fresh_files.saveFiles.repo);
		}
	}
</script>

<style>
	.flex-container {
		display: flex;
		align-content: stretch;
		position: relative;
	}
</style>

<Header {saveChanges} {saving} />
<div class="flex-container">
	<Home {saveChanges} />
</div>
