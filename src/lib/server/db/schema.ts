//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateRandomId } from '../../../../node_modules/utils';

const files = sqliteTable('audioFiles', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateRandomId()),
	title: text('title').notNull(),
	artist: text('artist').notNull(),
	date: text('date').notNull(),
	filepath: text('filepath').notNull()
});

type inserAudioFilesParams = typeof files.$inferInsert;

export { files, type inserAudioFilesParams };