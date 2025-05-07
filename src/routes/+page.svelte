<!-- Copyright © 2025 Lucca Vitters. All rights reserved -->

<script lang="ts">
	import YearSlider from "./yearSlider.svelte";
	import { chooseRandomFont } from "./RandomFont.svelte";
	import AudioPlayer from "./audioPlayer.svelte";
	import Header from "./header.svelte";
	import "$lib/css/fonts.css";

	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } = $props();
	const { audioFiles } = data;

	// selector for the year
	let selectedYear = $state();

	//	filter for if there are any files with the same year as the selectedYear when side loads // TODO: why does this also need state? shouldn't it be triggered by selectedYear changing?
	let filteredAudioFiles = $state([]);

	// get one random fonts per audio file, so that each row has the same font
	let randomFonts: string[] = [];
	for (let i = 0; i < audioFiles.length; i++) {
		randomFonts[i] = chooseRandomFont();
	}

	// when a $state() changes (need to understand this better)
	$effect(() => {
		//chooseRandomFont();

		// determine if there are any files with the same year as the selectedYear when the site updates
		filteredAudioFiles = audioFiles.filter((file) => file.year == selectedYear);
	});
</script>

<Header></Header>

<YearSlider bind:year={selectedYear}></YearSlider>

<!-- display files -->
{#if filteredAudioFiles.length > 0}
	<!-- entire "table" -->
	<div class="mx-7 mb-10 flex flex-col border-b border-black max-md:mx-4">
		{#each audioFiles as file, index}
			{#if file.year == selectedYear}
				<!-- file row -->
				<div
					class="flex flex-wrap border-t border-r border-l border-double border-black first:border-t-0 max-md:border-y-1 max-md:first:border-t-1 md:flex-nowrap">
					<!-- date -->
					<div
						class="flex items-center justify-center border-r border-black p-4 whitespace-nowrap md:w-30 md:min-w-30"
						id={randomFonts[index]}>
						{file.displayDate}
					</div>
					<!-- title -->
					<div
						class="flex w-full items-center border-y border-black p-4 md:w-auto md:min-w-min md:border-y-0"
						id={randomFonts[index]}>
						{file.title}
					</div>
					<!-- player -->
					<AudioPlayer randomFont={randomFonts[index]} src={file.filePath} />
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<p class="mx-7 justify-center border-r border-b border-l border-black p-3 max-md:mx-4" id={chooseRandomFont()}>
		{selectedYear} does not have any uploads. Yet.
	</p>
{/if}
