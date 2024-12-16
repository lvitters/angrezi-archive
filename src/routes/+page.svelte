<script lang="ts">
	import YearSlider from './yearSlider.svelte';
	import '$lib/css/fonts.css';
	
	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } =  $props();
	const { audioFiles } = data;

	// selector for the year
	let selectedYear = $state(0);

	//	filter for if there are any files with the same year as the selectedYear when side loads
	let filteredAudioFiles = $state([]);

	// some random fonts from the regular radio website
	let fonts: string[] = ['Archivo_Narrow', 'Millimetre', 'savateregular', 'Sporting_Grotesque_Regular', 'terminal_grotesque', 'VG5000'];

	// when a $state() changes
	$effect(()=> {
		chooseRandomFont();

		// determine if there are any files with the same year as the selectedYear when the site updates
		filteredAudioFiles = audioFiles.filter(file => file.year == selectedYear);
		$inspect(filteredAudioFiles.length);
	})

	// choose a random font for each audioFile, insert as class name in divs
	function chooseRandomFont() {
		let font = fonts[Math.floor(Math.random() * fonts.length)];
		//console.log(font);
		return font;
	}

</script>

<YearSlider bind:year={selectedYear}></YearSlider>

<!-- display files --> 
{#if filteredAudioFiles.length > 0}
	<div class="audio-list">
		{#each audioFiles as file}
				{#if file.year == selectedYear}
					<div class="audio-row">
						<p class="audio-box" id={chooseRandomFont()}>{file.date}</p>
						&emsp;
						<p class="audio-box" id={chooseRandomFont()}>{file.artist}</p>
						&emsp;
						<p class="audio-box" id={chooseRandomFont()}>{file.show}</p>
						&emsp;
						<p class="audio-box" id={chooseRandomFont()}>{file.title}</p>
						<p class="audio-box">
							<audio controls id="controls">
								<source src={file.filePath} type="audio/mp3"/>
								Your browser does not support the audio element.
							</audio>
						</p>
					</div>
				{/if}
		{/each}
	</div>
{:else}
	<p id={chooseRandomFont()}>No audio files available for {selectedYear}.</p>
{/if}

<style>

	.audio-list {
		display: flex;
		flex-direction: column; /* Stack rows vertically */
	}	
	
	.audio-row {
		display: flex;
		flex-direction: row; /* Align boxes horizontally in a row */
		align-items: stretch; /* Ensure all cells stretch to the row's height */
	}

	.audio-box {
		display: flex; /* Enable flexbox inside the box */
		flex-grow: 1; /* Boxes grow dynamically based on content */
		padding: 1rem; /* Add padding for spacing inside the box */
		border: 1px solid;
		text-align: left; /* Align text to the left */
		word-wrap: break-word; /* Prevent long text from overflowing */
		align-items: center; /* Vertically center the text inside the box */
		justify-content: center; /* Horizontally center the text inside the box */
	}

	#controls {
		margin-left: auto;
	}

</style>