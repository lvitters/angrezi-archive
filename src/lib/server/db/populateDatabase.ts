import { createNewFile } from './files.ts' // from db utility file 'files.ts'
import fs from 'fs';
import path from 'path';

const folderPath = '../../static/audio'; // Replace with your folder path

//get audio files from folder into array
async function populateDatabase() {
	const audioFiles = fs.readdirSync(folderPath).filter(file => {
		const ext = path.extname(file).toLowerCase();
		return ['.mp3', '.wav', '.ogg'].includes(ext);
	});

//fet file paths from them
  for (const file of audioFiles) {
    	const filePath = path.join(folderPath, file);

		//try inserting into database
		try {
			await createNewFile(file, filePath);
			console.log(`Inserted: ${file}`);
		} catch (err) {
			console.error(`Error inserting ${file}:`, err);
		}
  }
}

//log when successful
populateDatabase().then(() => {
  console.log('Database population complete.');
});