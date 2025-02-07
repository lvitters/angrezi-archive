// https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { db } from './client';
import { audioFiles } from './schema';
import { eq } from 'drizzle-orm';

// write title and file path into database
const createNewEntry = (
	year: string,
	sortDate: string,
	displayDate: string,
	title: string,
	filePath: string
) => {
	return db
		.insert(audioFiles)
		.values({ year, sortDate, displayDate, title, filePath })
		.returning()
		.get();
};

// delete entry by id
const deleteEntryById = (id: string) => {
	return db.delete(audioFiles).where(eq(audioFiles.id, id)).run();
};

// get all entries from certain year
const getEntriesByYear = (year: string) => {
	console.log('Year parameter:', year); // debug the input

	const results = db
		.select()
		.from(audioFiles)
		.where(eq(audioFiles.year, year))
		.all();

	console.log('Results:', results); // debug the query results

	return results;
};

// get all entries
const getAllEntries = () => {
	const results = db.select().from(audioFiles).orderBy(audioFiles.sortDate);
	return results;
};

// sort entries by date
const sortEntriesByDate = async () => {
	return await db.select().from(audioFiles).orderBy(audioFiles.sortDate);
};

export {
	createNewEntry,
	deleteEntryById,
	getEntriesByYear,
	getAllEntries,
	sortEntriesByDate,
};
