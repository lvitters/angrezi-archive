<script>
	import YearSlider from "../yearSlider.svelte";
	import AudioPlayer from "../audioPlayer.svelte";

	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } = $props();
	const { audioFiles } = data;
</script>

<!-- display files -->
{#if audioFiles.length > 0}
	<table class="m-2">
		<thead>
			<tr class="border border-black">
				<th class="border border-black" scope="col">date</th>
				<th class="border border-black p-4 whitespace-nowrap" scope="col">year folder</th>
				<th class="border border-black p-4 whitespace-nowrap" scope="col">title</th>
				<th
					class="cursor-pointer p-4 whitespace-nowrap text-green-500 hover:bg-green-500 hover:text-white"
					colspan="2"
					scope="col">
					add new
				</th>
			</tr>
		</thead>

		<tbody>
			{#each audioFiles as audioFile (audioFile.id)}
				<tr>
					<td class="border border-black p-2 whitespace-nowrap">{audioFile.sortDate}</td>
					<td class="border border-black p-2 whitespace-nowrap">{audioFile.year}</td>
					<td class="border border-black p-2">{audioFile.title}</td>
					<th
						class="cursor-pointer border border-black p-2 whitespace-nowrap text-blue-500 hover:bg-blue-500 hover:text-white"
						scope="col">
						edit
					</th>
					<th
						class="cursor-pointer border border-black p-2 whitespace-nowrap text-red-500 hover:bg-red-500 hover:text-white"
						scope="col">
						delete
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
