<script lang="ts">
	import YearSlider from './yearSlider.svelte';
	import { chooseRandomFont } from './RandomFont.svelte';
	import AudioPlayer from './audioPlayer.svelte';
	import '$lib/css/fonts.css';
	
	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } =  $props();
	const { audioFiles } = data;

	// selector for the year
	let selectedYear = $state();

	//	filter for if there are any files with the same year as the selectedYear when side loads // TODO: why does this also need state? shouldn't it be triggered by selectedYear changing?
	let filteredAudioFiles = $state([]);

	// when a $state() changes
	$effect(()=> {
		chooseRandomFont();

		// determine if there are any files with the same year as the selectedYear when the site updates
		filteredAudioFiles = audioFiles.filter(file => file.year == selectedYear);
		$inspect(filteredAudioFiles.length);
	})

	// // some random fonts from the regular radio website
	// let fonts: string[] = ['Archivo_Narrow', 'Millimetre', 'savateregular', 'Sporting_Grotesque_Regular', 'terminal_grotesque', 'VG5000'];

	// // choose a random font for each audioFile, insert as class name in divs
	// function chooseRandomFont() {
	// 	let font = fonts[Math.floor(Math.random() * fonts.length)];
	// 	//console.log(font);
	// 	return font;
	// }

</script>

<YearSlider bind:year={selectedYear}></YearSlider>

<!-- display files --> 
{#if filteredAudioFiles.length > 0}
	<div class="audio-list">
		{#each audioFiles as file}
				{#if file.year == selectedYear}
					<div class="audio-row">
						<div class="audio-box" id={chooseRandomFont()}>{file.date}</div>
						<div class="audio-box" id={chooseRandomFont()}>{file.artist}</div>
						<div class="audio-box" id={chooseRandomFont()}>{file.show}</div>
						<div class="audio-box" id={chooseRandomFont()}>{file.title}</div>
						<div class="audio-box">
							<AudioPlayer src={file.filePath}/>
						</div>
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
		margin-top: 2rem;
		margin-left: 1rem;
		margin-right: 1rem;
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
		margin-top: -1px; /* make borders overlap so they remain 1px thick */
		margin-left: -1px; /* make borders overlap so they remain 1px thick */
		border: 1px solid;
		text-align: left; /* Align text to the left */
		word-wrap: break-word; /* Prevent long text from overflowing */
		align-items: center; /* Vertically center the text inside the box */
		justify-content: center; /* Horizontally center the text inside the box */
	}

</style>