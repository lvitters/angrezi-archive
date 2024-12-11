//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';

//create database schema
const files = sqliteTable('files', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => randomUUID()),
	year: text('year').notNull(),
	show: text('show').notNull(),
	artist: text('artist').notNull(),
	title: text('title').notNull(),
	filePath: text('filePath').notNull()
});

export { files };