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
	<div class="flex flex-col m-4 border-b border-black">
		{#each audioFiles as file}
				{#if file.year == selectedYear}
					<div class="flex md:flex-nowrap flex-wrap border-t border-l border-r border-black">
						<div class="flex items-center justify-content min-w-min whitespace-nowrap p-4 border-r border-black" id={chooseRandomFont()}>{file.date}</div>
						<div class="flex items-center justify-content w-full md:whitespace-nowrap md:w-auto md:min-w-min p-4 border-y md:border-y-0 border-black" id={chooseRandomFont()}>{file.title}</div>
						<!-- <div class="basis-full md:hidden"></div> -->
						<AudioPlayer src={file.filePath}/>
					</div>
				{/if}
		{/each}
	</div>
{:else}
	<p class="ml-4" id={chooseRandomFont()}>{selectedYear} does not have any uploads. Yet.</p>
{/if}