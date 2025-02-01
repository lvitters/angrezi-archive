// for some reason, whenever the file path contains an umlaut, SvelteKit / node.js will not serve it correctly, so here they are "manually served" by ChatGPT (this is a workaround, not a fix)

import fs from 'fs';
import path from 'path';

export async function handle({ event, resolve }) {
  const decodedPath = decodeURIComponent(event.url.pathname);
  const filePath = path.join(process.cwd(), 'build/client', decodedPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    console.log('Serving file manually:', filePath);

    const stats = fs.statSync(filePath);  // Get file stats
    const contentLength = stats.size;     // Content length in bytes
    const range = event.request.headers.get('Range');  // Get the range from the request

    if (range) {
      // If range is requested, parse the range and serve the appropriate bytes
      const [ , start, end ] = range.match(/bytes=(\d+)-(\d+)?/) || [];
      const startByte = parseInt(start, 10);
      const endByte = end ? parseInt(end, 10) : contentLength - 1;

      const fileStream = fs.createReadStream(filePath, { start: startByte, end: endByte });

      // Ensure the response has the right status code and headers for partial content
      return new Response(fileStream, {
        status: 206,  // Partial Content
        headers: {
          'Content-Type': getMimeType(filePath),
          'Content-Length': endByte - startByte + 1,  // Adjust content-length
          'Content-Range': `bytes ${startByte}-${endByte}/${contentLength}`, // Indicate byte range
          'Accept-Ranges': 'bytes',  // Tell the client we're accepting range requests
        }
      });
    }

    // No range requested, stream the entire file
    const fileStream = fs.createReadStream(filePath);
    return new Response(fileStream, {
      status: 200,  // Full content
      headers: {
        'Content-Type': getMimeType(filePath),
        'Content-Length': contentLength,  // Provide content length for entire file
        'Cache-Control': 'public, max-age=31536000',  // Optionally cache
      }
    });
  }

  return resolve(event);
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac',
    '.flac': 'audio/flac',
    '.webm': 'audio/webm',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}
