import fs from "fs";
import path from "path";

export const readImageAsBlob = (filePath: string): Blob => {
  const buffer = fs.readFileSync(path.join(process.cwd(), filePath));
  const mimeType = "image/" + path.extname(filePath).slice(1); // naive MIME

  return new Blob([buffer.slice()], { type: mimeType });
};
