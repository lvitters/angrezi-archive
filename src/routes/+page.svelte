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

	// when a $state() changes (need to understand this better)
	$effect(() => {
		chooseRandomFont();

		// determine if there are any files with the same year as the selectedYear when the site updates
		filteredAudioFiles = audioFiles.filter(file => file.year == selectedYear);
	})

</script>

<YearSlider bind:year={selectedYear}></YearSlider>

<!-- display files --> 
{#if filteredAudioFiles.length > 0}
	<div class="files-list">
		{#each audioFiles as file}
				{#if file.year == selectedYear}
					<div class="files-row">
						<div class="date-box" id={chooseRandomFont()}>{file.date}</div>
						<div class="files-box" id={chooseRandomFont()}>{file.title}</div>
						<AudioPlayer src={file.filePath}/>
					</div>
				{/if}
		{/each}
	</div>
{:else}
	<p id={chooseRandomFont()}>{selectedYear} does not have any uploads. Yet.</p>
{/if}

<style>

	.files-list {
		display: flex;
		flex-direction: column; /* Stack rows vertically */
		margin-top: 2rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}	
	
	.files-row {
		display: flex;
		flex-direction: row; /* Align boxes horizontally in a row */
		align-items: stretch; /* Ensure all cells stretch to the row's height */
	}

	.date-box {
		display: flex; /* enable flexbox inside the box */
		flex-grow: 0; /* boxes grow dynamically based on content */
		padding: 1rem; /* add padding for spacing inside the box */
		margin-top: -1px; /* make borders overlap so they remain 1px thick */
		margin-left: -1px; /* make borders overlap so they remain 1px thick */
		border: 1px solid;
		text-align: left; /* align text to the left */
		word-wrap: break-word; /* prevent long text from overflowing */
		align-items: center; /* vertically center the text inside the box */
		justify-content: center; /* horizontally center the text inside the box */
	}

	.files-box {
		display: flex; /* enable flexbox inside the box */
		flex-grow: 1; /* boxes grow dynamically based on content */
		padding: 1rem; /* add padding for spacing inside the box */
		margin-top: -1px; /* make borders overlap so they remain 1px thick */
		margin-left: -1px; /* make borders overlap so they remain 1px thick */
		border: 1px solid;
		text-align: left; /* align text to the left */
		word-wrap: break-word; /* prevent long text from overflowing */
		align-items: center; /* vertically center the text inside the box */
		justify-content: left; /* horizontally center the text inside the box */
	}

</style>