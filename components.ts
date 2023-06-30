import fs from "fs";
import path from "path";

function countAngularComponents(directoryPath: string): number {
  let componentCount = 0;

  // Read the files in the directory
  const files = fs.readdirSync(directoryPath);

  // Iterate through each file
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const fileStats = fs.statSync(filePath);

    // Check if the file is a directory
    if (fileStats.isDirectory() && file !== "node_modules") {
      // Recursively count Angular components within the nested directory
      componentCount += countAngularComponents(filePath);
    } else {
      const fileExtension = path.extname(filePath);

      // Check if the file is a TypeScript file, not a spec file, and not inside the node_modules directory
      if (
        fileExtension === ".ts" &&
        !filePath.endsWith(".spec.ts") &&
        !filePath.includes("node_modules")
      ) {
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // Check if the file contains Angular component declaration
        if (isAngularComponent(fileContent)) {
          componentCount++;
        }
      }
    }
  });

  return componentCount;
}

function isAngularComponent(fileContent: string): boolean {
  // Modify this function to determine if the file content represents an Angular component
  // You can use regular expressions, parsing, or any other technique to identify Angular components

  // For example, let's assume an Angular component contains the "@Component" decorator
  const componentPattern = /@Component/;
  return componentPattern.test(fileContent);
}

// Usage
if (process.argv.length < 3) {
  console.error("Please provide the directory path as an argument.");
} else {
  const directoryPath = process.argv[2];
  const componentCount = countAngularComponents(directoryPath);
  console.log(`Total number of Angular components: ${componentCount}`);
}
