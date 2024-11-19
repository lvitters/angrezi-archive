<script lang="ts">
	import YearSlider from './yearSlider.svelte';
	import '$lib/css/fonts.css';

	let selectedYear = $state(0);
	let audioFiles = $state([] as string[]);	//TODO: why does this need to be $state? selectedYear should trigger the change, no?
	let audioData: {[year: number]: string[] } = {};	//declare audioData object with array of strings for every year, init as empty

	let fonts: string[] = ['Archivo_Narrow', 'Millimetre', 'savateregular', 'Sporting_Grotesque_Regular', 'terminal_grotesque', 'VG5000'];

	//when a $state() changes
	$effect(()=> {
		loadAudioData(selectedYear);
		chooseRandomFont();
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

	//choose a random font for each audioFile, insert as class name in divs
	function chooseRandomFont() {
		let font = fonts[Math.floor(Math.random() * fonts.length)];
		//console.log(font);
		return font;
	}
</script>

<YearSlider bind:year={selectedYear}></YearSlider>

<!-- display files -->
	{#if audioFiles.length}
		<ul class="audioFilesList">
		{#each audioFiles as file}
			<li class="audioFile">
				<p id={chooseRandomFont()}>{file.replace("/audio/" + selectedYear + "/","").replace(".mp3", "")}</p>	<!-- remove path and file ending from name for display -->
				<audio controls class="controls">
					<source src={file} type="audio/mp3"/>
					Your browser does not support the audio element.
				</audio>
			</li>
		{/each}
		</ul>
	{:else}
		<p class={chooseRandomFont()}>No audio files available for {selectedYear}.</p>
	{/if}

<style>

	.audioFilesList {
		margin-top: 3rem;
		list-style-type: none;  /* remove marker next to list item */
	}

	.audioFile {
		display: flex;
		margin-left: -2.5rem;
		padding: .5rem;
		border-style: solid;
		border-width: 1px;
	}

	.controls {
		margin-left: auto;
	}

</style>