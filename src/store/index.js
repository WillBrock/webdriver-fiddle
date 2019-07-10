import { writable, derived } from 'svelte/store';

const createFiles = () => {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		setFiles         : files => set(files),
		updateFiles      : files => update(files),
		removeActive     : () => {
			update((files) => {
				return files.map(file => {
					file.active = false;
					return file;
				});
			});
		},
		updateFileState  : (path, data) => {
			update((files) => {
				return files.map(file => {
					if(file.path === path) {
						file = {...file, ...data};
					}

					return file;
				});
			});
		},
	};
}

const internal_files = createFiles();

export const active_file = derived(
	internal_files,
	files => files.find(file => file.active),
);

export const files = internal_files;

/*
const recentFiles = () => {

}
*/
