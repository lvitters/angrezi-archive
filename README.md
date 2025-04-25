# SvelteKit

The Radio Angrezi Archive is developed with [SvelteKit](https://svelte.dev/docs/kit/introduction).

## Developing

Once you've cloned the project you can install dependencies with `npm install` (or `pnpm install` or `yarn`) and then start a development server with

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create the production version of the app use

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

The Radio Angrezi Archive can be deployed to a server running Node.js via SvelteKit's [node adapter](https://svelte.dev/docs/kit/adapter-node).

## Filling the database before the build step

The archive serves files from a folder 'db/audio'. If new files are added before the build step, they can be added to the database via "npm populate-database".
If there is no database for whatever reason, it can be created via "npm run generate-migrations:db" then "npm run push:db" then "npm run populate-database".
If the database schema changes, it can be applied by running "npm run generate-migrations:db" then "npm run migrate:db" "npm run push:db" then "npm run populate-database".

The "populate-database" script will fill and sort files into the database according to the file names present in the folder db/audio. The scheme is "YYMMDD --- name of the file.mp3". To ensure proper file path handling, the file name should have NO special characters. These can be added later through the admin interface.

## Adding, editing and deleting files from the database through the admin interface (after building and deploying)

The admin interface can be reached by http://37.221.194.86:3000/admin.
With the correct password, the login should be valid for an hour.
A new file can be added with the 'submit new file' button. Make sure the file name adheres to the schema mentioned above "YYMMDD --- name of the file.mp3", contains no special characters and is an MP3.
A file can be deleted via the delete button.
A file's display name (separate from the file name given to the file BEFORE uploading) can be changed by clicking into the file name field, typing the new name, and hitting enter. Here, special characters can be used.
