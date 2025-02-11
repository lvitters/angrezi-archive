import { fail } from "@sveltejs/kit";
import { editEntryById, getAllEntries } from "../../../db/entries.js";

// load entries from db, this is called a load function
export const load = async ({}) => {
	try {
		// fetch files for the specified year
		const audioFiles = await getAllEntries();

		return { audioFiles }; // return data to the page
	} catch (error) {
		console.error("Database error:", error);
		throw error;
	}
};

// form action
export const actions = {
	async editEntry({ request }) {
		const entry = Object.fromEntries(await request.formData()) as {
			id: string;
			title: string;
		};

		// get data from entry
		const id = entry.id;
		const newTitle = entry.title;

		//console.log(id + " " + newTitle);

		try {
			await editEntryById(id, newTitle);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: "Something went wrong while updating the file. Please try again with fewer/no special characters",
			});
		}
	},
};

// turn prerendering off because page will be dynamic
export const prerender = false;
