import { getAllEntries } from '../../db/entries.js';
//import type { PageServerLoad } from './$types'; //why don't I need this?

//load from db with year provided, this is called a load function
export const load = async ( {url} ) => {
	try {
		// fetch files for the specified year
		const audioFiles = await getAllEntries();

		return { audioFiles }; // return data to the page
	
	} catch (error) {
		console.error('Database error:', error);
		throw error;
	}
}