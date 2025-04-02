<script lang="ts">
	import YearSlider from "./yearSlider.svelte";
	import { chooseRandomFont, chooseFont } from "./RandomFont.svelte";
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
<!-- entire "table" -->
<div class="mx-7 mb-10 flex flex-col border-b border-black max-md:mx-4">
	<!-- file row -->
	<div
		class="flex flex-wrap border-t border-r border-l border-double border-black first:border-t-0 max-md:border-y-1 max-md:first:border-t-1 md:flex-nowrap">
		<!-- date -->
		<div
			class="flex items-center justify-center border-r border-black p-4 whitespace-nowrap md:w-30 md:min-w-30"
			id={chooseFont(1)}>
			09 May
		</div>
		<!-- title -->
		<div
			class="flex w-full items-center border-y border-black p-4 whitespace-nowrap md:w-auto md:min-w-min md:border-y-0"
			id={chooseFont(1)}>
			balzi dj b2b katze203
		</div>
		<!-- player -->
		<AudioPlayer randomFont={chooseFont(0)} src={audioFiles[0].filePath} />
		<!-- show progress in numbers -->
		<div class="flex flex-shrink-0 items-center justify-center p-4 md:w-50">
			<span id={chooseFont(1)}>19:00 - 20:30</span>
		</div>
	</div>
	<!-- file row -->
	<div
		class="flex flex-wrap border-t border-r border-l border-double border-black first:border-t-0 max-md:border-y-1 max-md:first:border-t-1 md:flex-nowrap">
		<!-- date -->
		<div
			class="flex items-center justify-center border-r border-black p-4 whitespace-nowrap md:w-30 md:min-w-30"
			id={chooseFont(2)}>
			09 May
		</div>
		<!-- title -->
		<div
			class="flex w-full items-center border-y border-black p-4 md:w-auto md:min-w-min md:border-y-0"
			id={chooseFont(2)}>
			dj person
		</div>
		<!-- player -->
		<AudioPlayer randomFont={chooseFont(0)} />
		<!-- show progress in numbers -->
		<div class="flex items-center justify-center p-4 md:w-50">
			<span id={chooseFont(2)}>20:30 - 21:30</span>
		</div>
	</div>
	<!-- file row -->
	<div
		class="flex flex-wrap border-t border-r border-l border-double border-black first:border-t-0 max-md:border-y-1 max-md:first:border-t-1 md:flex-nowrap">
		<!-- date -->
		<div
			class="flex items-center justify-center border-r border-black p-4 whitespace-nowrap md:w-30 md:min-w-30"
			id={chooseFont(6)}>
			09 May
		</div>
		<!-- title -->
		<div
			class="flex w-full items-center border-y border-black p-4 md:w-auto md:min-w-min md:border-y-0"
			id={chooseFont(6)}>
			person die jayt
		</div>
		<!-- player -->
		<AudioPlayer randomFont={chooseFont(0)} />
		<!-- show progress in numbers -->
		<div class="flex items-center justify-center p-4 md:w-50">
			<span id={chooseFont(6)}>21:30 - 22:30</span>
		</div>
	</div>
	<!-- file row -->
	<div
		class="flex flex-wrap border-t border-r border-l border-double border-black first:border-t-0 max-md:border-y-1 max-md:first:border-t-1 md:flex-nowrap">
		<!-- date -->
		<div
			class="flex items-center justify-center border-r border-black p-4 whitespace-nowrap md:w-30 md:min-w-30"
			id={chooseFont(5)}>
			09 May
		</div>
		<!-- title -->
		<div
			class="flex w-full items-center border-y border-black p-4 md:w-auto md:min-w-min md:border-y-0"
			id={chooseFont(5)}>
			deejay persönlich
		</div>
		<!-- player -->
		<AudioPlayer randomFont={chooseFont(0)} />
		<!-- show progress in numbers -->
		<div class="flex items-center justify-center p-4 md:w-50">
			<span id={chooseFont(5)}>21:30 - 22:30</span>
		</div>
	</div>
</div>
