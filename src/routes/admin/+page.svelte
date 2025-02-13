<script>
	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } = $props();
	let { audioFiles } = $state(data);
	let isAuthenticated = $state(data.isAuthenticated);

	// this is not how this is supposed to be done, but I don't think the Radio will be the victim of a cyberattack, so it should be fine
	let placeHolder = $state("enter admin password");
	let passwordInput = $state("");

	// for uploading a new file
	let inputtingNewFile = $state(false);
</script>

<!-- auth -->
{#if isAuthenticated}
	<!-- display files -->
	{#if audioFiles.length > 0}
		<table class="m-2">
			<thead>
				<tr class="border border-black">
					<th class="border border-black" scope="col">date</th>
					<th class="border border-black p-4 whitespace-nowrap" scope="col">year folder</th>
					<th class="border border-black p-4 whitespace-nowrap" scope="col">
						title (click to edit - enter to submit)
					</th>
					<!-- activate file input -->
					{#if !inputtingNewFile}
						<th
							class="cursor-pointer p-2 text-center font-bold whitespace-nowrap text-green-500 hover:bg-green-500 hover:text-white"
							scope="col"
							onclick={(inputtingNewFile = true)}>
							submit new file
						</th>
					{/if}
				</tr>
			</thead>

			<tbody>
				{#if inputtingNewFile}
					<tr>
						<td class="border border-black p-2 whitespace-nowrap"></td>
						<td class="border border-black p-2 whitespace-nowrap"></td>
						<td class="border border-black p-2 whitespace-nowrap">
							<form action="?/uploadFile" method="POST" enctype="multipart/form-data">
								<!-- hidden input to upload file -->
								<input
									id="files"
									type="file"
									name="fileToUpload"
									class="hidden"
									accept=".mp3"
									required />
								<!-- label for hidden input to change placeholder -->
								<label class="cursor-pointer font-bold text-green-500" for="files">
									select new file to upload
								</label>
								<button class="ml-auto cursor-pointer font-bold" type="submit">submit</button>
							</form>
						</td>
						<td class="border border-black p-2 whitespace-nowrap"></td>
					</tr>
				{/if}
				{#each audioFiles as audioFile (audioFile.id)}
					<tr>
						<td class="border border-black p-2 whitespace-nowrap">{audioFile.sortDate}</td>
						<td class="border border-black p-2 whitespace-nowrap">{audioFile.year}</td>
						<td class="w-full border border-black p-2">
							<form action="?/editEntry" method="post">
								<!-- hidden field to pass the ID -->
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
{:else}
	<!-- show login form if not authenticated -->
	<div class="flex h-screen items-center justify-center">
		<form class="flex -translate-y-15 placeholder-black" method="post" action="?/setAuthCookie">
			<input
				class="mr-2 w-80 border border-black p-4"
				name="passwordInput"
				type="password"
				value={passwordInput}
				placeholder={placeHolder} />
			<button class="border border-black p-4" type="submit">login</button>
		</form>
	</div>
{/if}
