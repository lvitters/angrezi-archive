import { writable, get } from 'svelte/store'

export const audioPlayer = writable();
export const status = writable('default');
export const isPlaying = writable(false);
export const index = writable(0);

export const trackList = writable([
	{
		title: 'BARADIO #23',
		artist: 'katze203',
		file: '',
	},
	{
		title: 'BARADIO #24',
		artist: 'katze203',
		file: '',
	}
]);

export const addTrack = track => {
	trackList.update(v => [...v, track])
};