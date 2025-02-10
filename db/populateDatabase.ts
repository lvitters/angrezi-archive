import fs from "fs";
import path from "path";
import { createNewEntry, deleteEntryById, getAllEntries } from "./entries.ts"; // from db utility file 'files.ts'

const folderPath = "./db/audio";

// get audiofiles from current or subdirectories, named after years
function getAudioFiles(dir: string, currentYear?: string): { filePath: string; year: string }[] {
	// get all the entries in the current directory
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let files: { filePath: string; year: string }[] = [];

	// for each of the entries
	for (const entry of entries) {
		let fullPath = path.join(dir, entry.name);

		// if it is a subdirectory
		if (entry.isDirectory()) {
			// check if directory name is of year format (via regex) and write to year
			const year = /^[0-9]{4}$/.test(entry.name) ? entry.name : currentYear;
			// do it again for the subdirectory (recursion!)
			files = files.concat(getAudioFiles(fullPath, year));
			// if it is a file
		} else if (entry.isFile()) {
			// check if the file has an audio extension
			const ext = path.extname(entry.name).toLowerCase();
			if ([".mp3"].includes(ext)) {
				//and push to files array
				files.push({
					filePath: fullPath.replace("./db/audio", "../../db/audio"),
					year: currentYear ?? "Unknown",
				});
			}
		}
	}

	// return files array
	return files;
}

// populate the database with the files from getAudioFiles()
async function populateDatabase() {
	try {
		// get all audio files
		const audioFiles = getAudioFiles(folderPath);

		// fetch existing entries from the database
		const existingEntries = await getAllEntries();
		const existingFilePaths = new Set(existingEntries.map((entry) => entry.filePath));

		// track processed files
		const processedFiles = new Set<string>();

		// get their names from the file path
		for (let { filePath, year } of audioFiles) {
			filePath = filePath;

			processedFiles.add(filePath);

			// check if file is already in the database
			if (existingFilePaths.has(filePath)) {
				console.log("already in database");
				continue; // skip if already in the database
			}

			// get info from file path
			const fileName = path.parse(filePath).name;
			// split into two and only assign to values if the file path is of that structure
			const data = fileName.split(" --- ");
			if (data.length === 2) {
				const [date, title] = data;
				// change numbering scheme to date format with named months for displaying
				const displayDate = getDisplayDate(data[0]);
				// get ISO 8601 date for sorting database
				const sortDate = getSortDate(year, data[0]);

				try {
					createNewEntry(year, sortDate, displayDate, title, filePath);
					console.log(`Inserted: ${fileName} (Year: ${year})`);
				} catch (err) {
					console.error(`Error inserting ${fileName}:`, err);
				}
			} else {
				console.error("Unexpected file name format");
			}
		}

		// delete entries from database that are not in the folder
		for (const entry of existingEntries) {
			if (!processedFiles.has(entry.filePath)) {
				try {
					//delete entry
					await deleteEntryById(entry.id);
					console.log(`Deleted: ${entry.filePath}`);
				} catch (err) {
					console.error(`Error deleting ${entry.filePath}:`, err);
				}
			}
		}
	} catch (err) {
		console.error("Error reading directory:", err);
	}
}

// format date format from files into strings with month names
function getDisplayDate(date: string): string {
	const paddedDate = date.padStart(4, "0"); // ensure string is four characters long
	const monthNum = parseInt(paddedDate.substring(0, 2), 10); // first two digits are the month
	const dayNum = paddedDate.substring(2, 4); // last two digits are the day

	const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const monthName = months[monthNum - 1]; // Get month name (index starts at 0)

	return `${monthName} ${dayNum}`;
}

// return ISO 8601 date for sorting database
function getSortDate(year: string, date: string): string {
	const paddedDate = date.padStart(4, "0"); // ensure string is four characters long
	const monthNum = parseInt(paddedDate.substring(0, 2), 10); // first two digits are the month
	const dayNum = paddedDate.substring(2, 4); // last two digits are the day

	return `${year}-${String(monthNum).padStart(2, "0")}-${dayNum}`;
}

// log when successful
populateDatabase().then(() => {
	console.log("Database population complete");
});
