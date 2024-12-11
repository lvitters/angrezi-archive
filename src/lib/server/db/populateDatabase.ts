import { createNewFile } from './files.ts' // from db utility file 'files.ts'
import fs from 'fs';
import path from 'path';

// const folderPath = path.resolve(process.cwd(), 'static/audio'); // Replace with your folder path
const folderPath = 'static/audio';

// get audiofiles, even from subdirectories
function getAudioFiles(dir: string): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let files: string[] = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			// get files from subdirectories (is this recursion?)
			files = files.concat(getAudioFiles(fullPath));
		} else if (entry.isFile()) {
			// check if file has an audio extension
			const ext = path.extname(entry.name).toLowerCase();
			if (['.mp3', '.wav'].includes(ext)) {
				files.push(fullPath);
			}
		}
	}

	return files;
}

// get audio files from folder into array
async function populateDatabase() {
	try {
		const audioFiles = getAudioFiles(folderPath);

		// fetch file paths from them
		for (const file of audioFiles) {
				const filePath = path.join(folderPath, file);

			// try inserting into database
			try {
				await createNewFile(file, filePath);
				console.log(`Inserted: ${file}`);
			} catch (err) {
				console.error(`Error inserting ${file}:`, err);
			}
		}
	} catch (err) {
		console.error('Error reading directory.', err);
	}
}

// log when successful
populateDatabase().then(() => {
  	console.log('Database population complete.');
});