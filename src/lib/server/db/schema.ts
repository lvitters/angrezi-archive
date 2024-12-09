//https://omrecipes.dev/blog/sveltekit-crud-sqlite	https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateRandomId } from '../../../../node_modules/utils';

const audioFiles = sqliteTable('audioFiles', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateRandomId()),
	title: text('title').notNull(),
	artist: text('artist').notNull(),
	show: text('show').notNull(),
	date: text('date').notNull(),
	filepath: text('filepath').notNull()
});

type inserAudioFilesParams = typeof audioFiles.$inferInsert;

export { audioFiles, type inserAudioFilesParams };