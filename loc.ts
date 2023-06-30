import fs from "fs";
import path from "path";

function countLinesInTSFiles(directoryPath: string): number {
  let totalLines = 0;

  // Read the files in the directory
  const files = fs.readdirSync(directoryPath);

  // Iterate through each file
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const fileStats = fs.statSync(filePath);

    // Check if the file is a directory
    if (fileStats.isDirectory() && file !== "node_modules") {
      // Recursively count lines in files within the nested directory
      totalLines += countLinesInTSFiles(filePath);
    } else {
      const fileExtension = path.extname(filePath);

      // Check if the file is a TypeScript file
      if (fileExtension === ".ts") {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent.split("\n");
        totalLines += lines.length;
      }
    }
  });

  return totalLines;
}

// Usage example
const directoryPath = "/Users/byron.stange/dev/leanix-pathfinder-web";
const lineCount = countLinesInTSFiles(directoryPath);
console.log(`Total number of lines in .ts files: ${lineCount}`);
