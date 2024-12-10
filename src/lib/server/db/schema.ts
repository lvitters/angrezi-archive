//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';

//create database schema
const files = sqliteTable('files', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => randomUUID()),
	title: text('title').notNull(),
	filePath: text('filePath').notNull()
});

type insertAudioFilesParams = typeof files.$inferInsert;

export { files, type insertAudioFilesParams };