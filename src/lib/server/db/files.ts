//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { eq } from "drizzle-orm";
import { db } from "./client";
import { files } from "./schema";

//write title and file path into database
const createNewFile = (title: string, filePath: string ) => {
	return db
			.insert(files)
			.values({ title, filePath })
			.returning()
			.get();
};

export {
	createNewFile,
};