//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { db } from "./client";
import { audioFiles } from "./schema";
import { eq } from 'drizzle-orm';

//write title and file path into database
const createNewEntry = (year: string, date: string, show: string, artist: string, title: string, filePath: string ) => {
	return db
		.insert(audioFiles)
		.values({ year, date, show, artist, title, filePath })
		.returning()
		.get();
};

//delete entry by id
const deleteEntryById = (id: string) => {
    return db
        .delete(audioFiles)
        .where(eq(audioFiles.id, id))
        .run();
}

//get all entries from certain year
const getEntriesByYear = (year: string) => {
	
	console.log('Year parameter:', year); // Debug the input

	const results = db
		.select()
		.from(audioFiles)
		.where(eq(audioFiles.year, year))
		.all()

	console.log('Results:', results); // Debug the query results
	
	return results;
}

//get all entries
const getAllEntries = () => {
	const results = db
		.select()
		.from(audioFiles)
		.all();
	return results;
}

export {
	createNewEntry,
	deleteEntryById,
	getEntriesByYear,
	getAllEntries,
};