<script lang="ts">
	import YearSlider from "./yearSlider.svelte";
	import { chooseRandomFont } from "./randomFont.svelte";
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

<div class="mx-7 mt-7 overflow-hidden border border-black px-1 pt-1 pb-0 text-lg max-md:hidden" id={chooseRandomFont()}>
	<div class="animate-scroll-left mx-6">
		<span>
			Welcome to the Radio Angrezi Archive. Want to see your stuff here? <a
				class="cursor-pointer"
				href="mailto:radioangrezi@hfk-bremen.de">
				Do a show!
			</a>
		</span>
	</div>
</div>

<Header></Header>

<YearSlider bind:year={selectedYear}></YearSlider>

<!-- display files -->
{#if filteredAudioFiles.length > 0}
	<!-- entire "table" -->
	<div class="mx-7 mb-10 flex flex-col border-b border-black max-sm:mx-4">
		{#each audioFiles as file, index}
			{#if file.year == selectedYear}
				<!-- file row -->
				<div
					class="flex flex-wrap border-t border-r border-l border-double border-black first:border-t-0 max-md:border-y-2 max-md:first:border-t-2 md:flex-nowrap">
					<!-- date -->
					<div
						class="justify-content flex min-w-min items-center border-r border-black p-4 whitespace-nowrap"
						id={randomFonts[index]}>
						{file.displayDate}
					</div>
					<!-- title -->
					<div
						class="justify-content flex w-full items-center border-y border-black p-4 md:w-auto md:min-w-min md:border-y-0"
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
	<p class="mx-7 justify-center border-r border-b border-l border-black p-3 max-sm:mx-4" id={chooseRandomFont()}>
		{selectedYear} does not have any uploads. Yet.
	</p>
{/if}
