ALTER TABLE `audioFiles` RENAME COLUMN "date" TO "sortDate";--> statement-breakpoint
ALTER TABLE `audioFiles` ADD `displayDate` text NOT NULL;