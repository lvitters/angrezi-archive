<script lang="ts">
	import YearSlider from "./yearSlider.svelte";
	import { chooseRandomFont } from "./randomFont.svelte";
	import AudioPlayer from "./audioPlayer.svelte";

	import "$lib/css/fonts.css";
	import Header from "./header.svelte";

	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } = $props();
	const { audioFiles } = data;

	// selector for the year
	let selectedYear = $state();

	//	filter for if there are any files with the same year as the selectedYear when side loads // TODO: why does this also need state? shouldn't it be triggered by selectedYear changing?
	let filteredAudioFiles = $state([]);

	// when a $state() changes (need to understand this better)
	$effect(() => {
		chooseRandomFont();

		// determine if there are any files with the same year as the selectedYear when the site updates
		filteredAudioFiles = audioFiles.filter((file) => file.year == selectedYear);
	});
</script>

<Header></Header>

<div class="mx-4 border border-black pt-4">
	<YearSlider bind:year={selectedYear}></YearSlider>
</div>

<!-- display files -->
{#if filteredAudioFiles.length > 0}
	<!-- entire "table" -->
	<div class="mx-4 flex flex-col border-b border-black">
		{#each audioFiles as file}
			{#if file.year == selectedYear}
				<!-- file row -->
				<div class="flex flex-wrap border-t border-r border-l border-black first:border-t-0 md:flex-nowrap">
					<!-- date -->
					<div
						class="justify-content flex min-w-min items-center border-r border-black p-4 whitespace-nowrap"
						id={chooseRandomFont()}>
						{file.displayDate}
					</div>
					<!-- title -->
					<div
						class="justify-content flex w-full items-center border-y border-black p-4 md:w-auto md:min-w-min md:border-y-0 md:whitespace-nowrap"
						id={chooseRandomFont()}>
						{file.title}
					</div>
					<!-- player -->
					<AudioPlayer src={file.filePath} />
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<p class="ml-4 pt-4" id={chooseRandomFont()}>{selectedYear} does not have any uploads. Yet.</p>
{/if}
