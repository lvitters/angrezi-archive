//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { eq } from "drizzle-orm";
import { db } from "./client";
import { files } from "./schema";

const getFileById = (id: string) => {
	return db.select().from(files).where(eq(files.id, id)).get();
};

const getFileTitleById = (id: string) => {
	return db
	  .select({
		title: files.title,
	  })
	  .from(files)
	  .where(eq(files.id, id))
	  .get();
};

const createNewFile = (data: typeof files.$inferInsert) => {
	return db.insert(files).values(data).returning().get();
};

export {
	getFileById,
	getFileTitleById,
	createNewFile,
};