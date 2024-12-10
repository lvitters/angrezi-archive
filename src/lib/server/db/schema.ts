//https://fullstacksveltekit.com/blog/sveltekit-sqlite-drizzle

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateRandomId } from '../../../../node_modules/utils';

const files = sqliteTable('files', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateRandomId()),
	title: text('title').notNull(),
	filePath: text('filePath').notNull()
});

type inserAudioFilesParams = typeof files.$inferInsert;

export { files, type inserAudioFilesParams };