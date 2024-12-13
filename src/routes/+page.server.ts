import { getEntriesByYear } from '../lib/server/db/entries';

//load from db with year provided, this is called a load function
export async function load( {url} ) {
	try {
		// retrieve the 'year' query parameter
		const year = url.searchParams.get('year');
		
		// default if no year is provided
		if (!year) {
			console.error('Year query parameter is missing!');
			throw new Error('Year is required');
			return { audioFiles: [], year: null }; 
		}

		// fetch files for the specified year
		const audioFiles = await getEntriesByYear(year);

		return { audioFiles, year }; // return data to the page
	} catch (error) {
		console.error('Database error:', error);
		throw error;
	}

}