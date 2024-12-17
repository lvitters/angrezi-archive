import { createNewEntry } from './entries.ts' // from db utility file 'files.ts'
import fs from 'fs';
import path from 'path';

const folderPath = 'static/audio';

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
			if (['.mp3', '.wav'].includes(ext)) {
				//and push to files array
				files.push({ filePath: fullPath.replace('static/', ''), year: currentYear ?? 'Unknown' });
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
		
			// get their names from the file path
			for (const { filePath, year } of audioFiles) {
				// get info from file path
				const fileName = path.parse(filePath).name;
				// split into three and only assign to values if the file path is of that structure
				const data = fileName.split('-');
				if (data.length === 4) {
					const [date, artist, title, show] = data;
					// try inserting into the database
					try {
						createNewEntry(year, date, show, artist, title, filePath);
						console.log(`Inserted: ${fileName} (Year: ${year})`);
					} catch (err) {
						console.error(`Error inserting ${fileName}:`, err);
					}
				} else {
					console.error('Unexpected file name format');
				}
			}
		} catch (err) {
			console.error('Error reading directory:', err);
		}
  }

// log when successful
populateDatabase().then(() => {
  	console.log('Database population complete.');
});