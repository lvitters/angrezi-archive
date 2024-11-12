<script lang="ts">
	import YearSlider from './yearSlider.svelte';
	import { onMount } from 'svelte';

	let selectedYear = $state(0);
	let audioFiles = $state([] as string[]);	//TODO: why does this need to be $state? selectedYear should trigger it, no? well
	let audioData: {[year: number]: string[] } = {};	//TODO: I don't understand why it is declared like this

	//when a $state() changes
	$effect(()=> {
		loadAudioData(selectedYear);
	})

	//load the audio data
	async function loadAudioData(yearToLoad: number) {
		try {
			const response = await fetch('/audio/trackList.json');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			audioData = await response.json();
			loadAudioFiles(yearToLoad);
		} catch (error) {
			console.error('Failed to load audio data:', error);
		}
  	}

	//load actual files according to year
	function loadAudioFiles(yearToLoad: number) {
		console.log("loadAudioFiles: " + yearToLoad);
		// Safely access audioData[year] and handle undefined cases
		const files = audioData[yearToLoad];
		if (files) {
			audioFiles = files.map(file => `/audio/${yearToLoad}/${file}`);
		} else {
			audioFiles = []; // No files for this year, clear the array
		}
		console.log(audioFiles.length);
  	}
</script>

<YearSlider bind:year={selectedYear}></YearSlider>

<div class="audioFilesBox">
	{#if audioFiles.length}
		<ul>
		{#each audioFiles as file}
			<li>
			<audio controls>
				<source src={file} type="audio/mp3" />
				Your browser does not support the audio element.
			</audio>
			</li>
		{/each}
		</ul>
	{:else}
		<p>No audio files available for {selectedYear}.</p>
	{/if}
</div>

<style>

	.audioFilesBox {
		display: flex;
		row-gap: 5px;
		column-gap: 5px;
	}

</style>