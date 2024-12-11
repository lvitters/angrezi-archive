//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { db } from "./client";
import { files } from "./schema";

//write title and file path into database
const createNewFile = (year: string, title: string, filePath: string ) => {
	return db
			.insert(files)
			.values({ year, title, filePath })
			.returning()
			.get();
};

export {
	createNewFile,
};