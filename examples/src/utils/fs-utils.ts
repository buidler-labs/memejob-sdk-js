import fs from "node:fs";
import path from "node:path";

/**
 * Reads an image file from the filesystem and returns it as a Blob.
 * @param filePath - Relative path to the image file
 * @returns Blob representing the image data with MIME type inferred from file extension
 */
export const readImageAsBlob = (filePath: string): Blob => {
  const buffer = fs.readFileSync(path.join(process.cwd(), filePath));
  const mimeType = `image/${path.extname(filePath).slice(1)}`; // naive MIME

  return new Blob([buffer.slice()], { type: mimeType });
};
