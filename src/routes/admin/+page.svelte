<script>
	import bcrypt from "bcryptjs";

	// apparently this will automatically fetch all the data via the load function in +page.server.ts? this is why SSR is good (I hope it works)
	let { data } = $props();
	let { audioFiles } = $state(data);

	// this is not how this is supposed to be done, but I don't think the Radio will be the victim of a cyberattack, so it should be fine
	const ADMIN_HASH = "$2y$12$fDHH9xV1oVuRadx7xafIAuATra0x9E6HjzS/pevvj9uzt0RRkz25K";
	let passwordInput = $state("");
	let isAuthenticated = $state(false);
	let placeHolder = $state("enter admin password");

	// check input against pre-computed hash using bcrypt
	async function checkPassword() {
		try {
			const result = await bcrypt.compare(passwordInput, ADMIN_HASH);

			if (result) {
				isAuthenticated = true;
			} else {
				placeHolder = "wrong password! try again";
				passwordInput = "";
			}
		} catch (error) {
			console.error("Error comparing password:", error);
		}
	}
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
						title (click to edit, enter to submit)
					</th>
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
		<form class="flex -translate-y-15 placeholder-black" onsubmit={checkPassword}>
			<input
				class="mr-2 w-80 border border-black p-4"
				type="password"
				bind:value={passwordInput}
				placeholder={placeHolder} />
			<button class="border border-black p-4" type="submit">login</button>
		</form>
	</div>
{/if}
