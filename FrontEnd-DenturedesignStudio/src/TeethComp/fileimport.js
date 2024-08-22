import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Use fileURLToPath to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, "./plates/outside"); // Update with your path

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Unable to scan directory:", err);
    return;
  }
  files.forEach((file) => {
    const importName = path.basename(file, path.extname(file));
    console.log(
      `import ${importName}_outside from './plates/outside/${file}';`
    );
  });
});
