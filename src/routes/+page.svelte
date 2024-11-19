<script lang="ts">
	import YearSlider from './yearSlider.svelte';

	let selectedYear = $state(0);
	let audioFiles = $state([] as string[]);	//TODO: why does this need to be $state? selectedYear should trigger it, no?
	let audioData: {[year: number]: string[] } = {};	//declare audioData object with array of strings for every year, init as empty

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
		//Safely access audioData and handle undefined cases
		const files = audioData[yearToLoad];
		if (files) {
			audioFiles = files.map(file => `/audio/${yearToLoad}/${file}`);
		} else {
			audioFiles = []; //No files for this year, clear the array
		}
  	}
</script>

<YearSlider bind:year={selectedYear}></YearSlider>

<!-- display files -->
<div class="audioFilesBox">
	{#if audioFiles.length}
		<ul class="audioFilesList">
		{#each audioFiles as file}
			<li>
				<p class="audioFile">{file.replace("/audio/" + selectedYear + "/","").replace(".mp3", "")}</p>	<!-- remove path and file ending from name for display -->
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

	.audioFilesList {
		display: flex-box;
		list-style-type: none;
	}

	.audioFile {
		/* font-family: 'Archivo Narrow'; */
		/* font-family: 'Sporting Grotesque_Regular'; */
		/* font-family: 'Sporting Grotesque_Bold'; */
		/* font-family: 'savateregular'; */
		/* font-family: 'VG5000'; */
		font-family: Millimetre;
		/* font-family: 'terminal_grotesque'; */
		/* font-family: 'Roboto Regular'; */
	}

</style>