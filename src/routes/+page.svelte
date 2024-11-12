<script lang="ts">
	import YearSlider from './yearSlider.svelte';
	import { onMount } from 'svelte';

	let year = $state(0);
	let audioFiles: string[] = [];
	let audioData: {[year: number]: string[] } = {};

	//do this on start
	onMount(()=> {
		loadAudioData();
	})

	//load the audio data
	async function loadAudioData() {
		try {
			const response = await fetch('/audio/trackList.json');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			audioData = await response.json();
			loadAudioFiles(year);
		} catch (error) {
			console.error('Failed to load audio data:', error);
		}
  	}

	//load actual files according to year
	function loadAudioFiles(year: number) {
		console.log("loadAudioFiles: " + year);
		// Safely access audioData[year] and handle undefined cases
		const files = audioData[year];
		if (files) {
			audioFiles = files.map(file => `/audio/${year}/${file}`);
		} else {
			audioFiles = []; // No files for this year, clear the array
		}
  	}
</script>

<YearSlider bind:year={year}></YearSlider>

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
		<p>No audio files available for {year}.</p>
	{/if}
</div>

<style>

	.audioFilesBox {
		display: flex;
		row-gap: 5px;
		column-gap: 5px;
	}

</style>