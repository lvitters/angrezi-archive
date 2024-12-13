import { getAllEntries } from '../lib/server/db/entries';
import type { PageServerLoad } from './$types';

//load from db with year provided, this is called a load function
export const load: PageServerLoad = async ( {url} ) => {
	try {
		// fetch files for the specified year
		const audioFiles = await getAllEntries();

		return { audioFiles }; // return data to the page
	
	} catch (error) {
		console.error('Database error:', error);
		throw error;
	}
}