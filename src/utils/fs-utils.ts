import fs from "node:fs";
import path from "node:path";

export const readImageAsBlob = (filePath: string): Blob => {
  const buffer = fs.readFileSync(path.join(process.cwd(), filePath));
  const mimeType = `image/${path.extname(filePath).slice(1)}`; // naive MIME

  return new Blob([buffer.slice()], { type: mimeType });
};
