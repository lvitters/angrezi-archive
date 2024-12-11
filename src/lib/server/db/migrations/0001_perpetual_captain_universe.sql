ALTER TABLE `audioFiles` RENAME TO `files`;--> statement-breakpoint
ALTER TABLE `files` RENAME COLUMN "filepath" TO "filePath";--> statement-breakpoint
ALTER TABLE `files` DROP COLUMN `artist`;--> statement-breakpoint
ALTER TABLE `files` DROP COLUMN `show`;--> statement-breakpoint
ALTER TABLE `files` DROP COLUMN `date`;