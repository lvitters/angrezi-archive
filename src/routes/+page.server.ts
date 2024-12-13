import { getAllEntries } from '../lib/server/db/entries';

//load from db with year provided, this is called a load function
export async function load( {url} ) {
	try {
		// fetch files for the specified year
		const audioFiles = await getAllEntries();

		return { audioFiles }; // return data to the page
	
	} catch (error) {
		console.error('Database error:', error);
		throw error;
	}
}