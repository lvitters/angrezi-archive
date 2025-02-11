<script>
	import { enhance } from "$app/forms";

	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } = $props();
	let { audioFiles } = $state(data);
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
					<td class="w-full border border-black p-2">
						<form action="?/editEntry" method="post">
							<!-- didden field to pass the ID -->
							<input type="hidden" name="id" value={audioFile.id} />
							<!-- field for updated title -->
							<input class="w-full" type="text" name="title" value={audioFile.title} />
						</form>
					</td>
					<td
						class="cursor-pointer border border-black p-2 text-center font-bold text-red-500 hover:bg-red-500 hover:text-white">
						delete
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
