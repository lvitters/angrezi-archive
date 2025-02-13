import { fail } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { editEntryById, getAllEntries } from "../../../db/entries.js";

// load entries from db, this is called a load function
export const load = async ({ cookies }) => {
	try {
		// fetch files for the specified year
		const audioFiles = await getAllEntries();

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

		// Define absolute path
		const uploadDir = path.join(process.cwd(), "db/audio");

		// Ensure the directory exists
		if (!existsSync(uploadDir)) {
			mkdirSync(uploadDir, { recursive: true });
		}

		// Write the file to the correct location
		const filePath = path.join(uploadDir, fileToUpload.name);
		writeFileSync(filePath, Buffer.from(await fileToUpload.arrayBuffer()));

		return {
			success: true,
			message: "File uploaded successfully!",
			filePath,
		};
	},
};

// turn prerendering off because page will be dynamic
export const prerender = false;
