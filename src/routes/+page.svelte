<script lang="ts">
	import YearSlider from './yearSlider.svelte';
	import '$lib/css/fonts.css';
	
	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let data = $props();
	const { audioFiles, year } = data;

	// selector for the year
	let selectedYear = $state(0);

	//
	let fonts: string[] = ['Archivo_Narrow', 'Millimetre', 'savateregular', 'Sporting_Grotesque_Regular', 'terminal_grotesque', 'VG5000'];

	// when a $state() changes
	$effect(()=> {
		chooseRandomFont();
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
{#if audioFiles.length}
	<ul class="audioFilesList">
	{#each audioFiles as file}
		{#if file.year == selectedYear}
		<li class="audioFile">
			<p id={chooseRandomFont()}>{file.show}</p>
			<audio controls class="controls">
				<source src={file.filePath} type="audio/mp3"/>
				Your browser does not support the audio element.
			</audio>
		</li>
		{/if}
	{/each}
	</ul>
{:else}
	<p id={chooseRandomFont()}>No audio files available for {selectedYear}.</p>
{/if}

<style>

	.audioFilesList {
		margin-top: 3rem;
		list-style-type: none;  /* remove marker next to list item */
	}

	.audioFile {
		display: flex;
		margin-left: -1.8rem;
		margin-right: 1rem;
		padding: .5rem;
		border-style: solid;
		border-width: 1px;
	}

	.controls {
		margin-left: auto;
	}

</style>