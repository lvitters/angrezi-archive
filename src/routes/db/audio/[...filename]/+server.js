import fs from "fs";
import path from "path";

// let the server serve files dynamically in production
export async function GET({ params }) {
	// console.log("Requested file:", params.filename); // Debugging

	// params.filename is now an array, join it into a full path
	const fullFilePath = path.resolve("db/audio", ...params.filename.split("/"));
	// console.log("Resolved file path:", fullFilePath); // Debugging

	if (!fs.existsSync(fullFilePath)) {
		console.log("File not found:", fullFilePath);
		return new Response("File not found", { status: 404 });
	}

	const fileStream = fs.createReadStream(fullFilePath);
	return new Response(fileStream, {
		headers: {
			"Content-Type": "audio/mpeg",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
