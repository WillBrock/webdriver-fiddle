import { writable, derived } from 'svelte/store';

const createFiles = () => {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		setFiles         : files => set(files),
		updateFiles      : files => update(files),
		addFile          : (data) => {
			update((files) => {
				files = files.push(data);

				return files;
			});
		},
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
					if(file.path !== path) {
						return file;
					}

					file.updated = true;

					if(data.name) {
						file.path = file.path.replace(file.name, data.name)
					}

					file = {...file, ...data};

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

function _editor() {
	const { subscribe, set } = writable(null);

	return {
		subscribe,
		set : (editor) => set(editor),
	}
}

export const editor = _editor();

function editorSessions() {
	const { subscribe, update } = writable({});

	return {
		subscribe,
		add : (path, session) => {
			update((sessions) => {
				if(!sessions[path]) {
					sessions[path] = session;
				}

				const new_sessions = sessions;

				return new_sessions;
			});
		},
		remove : (path) => {
			update((sessions) => {
				delete sessions[path];

				return sessions;
			});
		},
	};
}

export const editor_sessions = editorSessions();

/*
const recentFiles = () => {

}
*/
