import { writable } from 'svelte/store';

function createFiles() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		setFiles    : files => set(files),
		updateFiles : files => update(files),
		closeFile : (path) => {
			update((files) => {
				return files.map(file => {
					if(file.path === path) {
						file.open = false;
					}

					return file;
				});
			});
		}
	}
}

export const files = createFiles();
