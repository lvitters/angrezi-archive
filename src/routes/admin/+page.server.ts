import { fail } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { createNewEntry, deleteEntryById, editEntryById, getAllEntriesDescending } from "../../../db/entries.js";

// load entries from db, this is called a load function
export const load = async ({ cookies }) => {
	try {
		// fetch files for the specified year
		const audioFiles = await getAllEntriesDescending();

		// Check if the 'isAuthenticated' cookie is set
		const isAuthenticated = cookies.get("isAuthenticated");

		return { audioFiles, isAuthenticated: isAuthenticated === "true" }; // return data to the page
	} catch (error) {
		console.error("Database error:", error);
		throw error;
	}
};

// server actions
export const actions = {
	// edit an entry
	async editEntry({ request }) {
		const formData = Object.fromEntries(await request.formData()) as {
			id: string;
			title: string;
		};

		// get data from entry
		const id = formData.id;
		const newTitle = formData.title;

		try {
			await editEntryById(id, newTitle);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: "Something went wrong while updating the file. Please try again with fewer/no special characters",
			});
		}
	}, // edit an entry
	async deleteEntry({ request }) {
		const formData = Object.fromEntries(await request.formData()) as {
			id: string;
			title: string;
		};

		// get data from entry
		const id = formData.id;

		try {
			await deleteEntryById(id);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: "Something went wrong while updating the file. Please try again with fewer/no special characters",
			});
		}
	},
	// create an authentication cookie to have persistent login
	async setAuthCookie({ request, cookies }) {
		// Get form data and ensure passwordInput is a string
		const formData = Object.fromEntries(await request.formData()) as { passwordInput: string };
		let passwordInput = formData.passwordInput;
		const ADMIN_HASH = "$2a$12$R6L7AlJypsz2/QSQDGPlD.pmgtHL5//3vCILWsiTkVCbcUvafo/C.";

		try {
			const result = await bcrypt.compare(passwordInput, ADMIN_HASH);

			if (result) {
				// create the cookie
				cookies.set("isAuthenticated", "true", {
					httpOnly: true,
					maxAge: 60 * 60, // 1 hour
					path: "/",
				});
			} else {
				return {
					status: 400,
					body: { message: "Invalid password" },
				};
			}
		} catch (error) {
			console.error("Error comparing password:", error);
			return {
				status: 500,
				body: { message: "Server error" },
			};
		}
	},
	// upload file to server
	async uploadFile({ request }) {
		const formData = Object.fromEntries(await request.formData());

		if (!(formData.fileToUpload as File).name || (formData.fileToUpload as File).name === "undefined") {
			return fail(400, {
				error: true,
				message: "You must provide a file to upload",
			});
		}

		const { fileToUpload } = formData as { fileToUpload: File };

		// define absolute path
		const uploadDir = path.join(process.cwd(), "db/audio");

		// ensure the directory exists
		if (!existsSync(uploadDir)) {
			mkdirSync(uploadDir, { recursive: true });
		}

		// write the file to the correct location
		const filePath = path.join(uploadDir, fileToUpload.name);
		writeFileSync(filePath, Buffer.from(await fileToUpload.arrayBuffer()));

		// get file info (from populateDatabase.ts)
		const fileName = path.parse(filePath).name;
		const data = fileName.split(" --- ");
		const year = "20" + fileName.substring(0, 2); // Convert YY to 20YY
		if (data.length === 2) {
			const [rawDate, title] = data;
			const displayDate = getDisplayDate(rawDate);
			const sortDate = getSortDate(rawDate);

			try {
				// add the file to the database
				await createNewEntry(year, sortDate, displayDate, title, filePath);

				return { success: true };
			} catch (err) {
				console.error(`Error inserting ${fileName}:`, err);
			}
		}

		return {
			success: true,
			message: "File uploaded successfully!",
			filePath,
		};
	},
};

// format date for display
function getDisplayDate(date: string): string {
	const monthNum = parseInt(date.substring(2, 4), 10);
	const dayNum = date.substring(4, 6);

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const monthName = months[monthNum - 1];

	return `${monthName} ${dayNum}`;
}

// return ISO 8601 date
function getSortDate(date: string): string {
	const year = "20" + date.substring(0, 2);
	const monthNum = date.substring(2, 4);
	const dayNum = date.substring(4, 6);

	return `${year}-${monthNum}-${dayNum}`;
}

// turn prerendering off because page will be dynamic
export const prerender = false;
