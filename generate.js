const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Paths
const inputDir = './src';   // Source directory containing Markdown files
const outputDir = './public'; // Output directory for HTML files

// Function to convert Markdown to HTML
const convertMarkdownToHtml = (filePath, outputFilePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the Markdown file (${filePath}):`, err);
      return;
    }

    // Convert Markdown content to HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.basename(filePath, '.md')}</title>
</head>
<body>
  ${marked(data)}
</body>
</html>
`;

    // Write HTML content to the output file
    fs.writeFile(outputFilePath, htmlContent, (err) => {
      if (err) {
        console.error(`Error writing HTML file (${outputFilePath}):`, err);
        return;
      }
      console.log(`HTML file generated: ${outputFilePath}`);
    });
  });
};

// Ensure the public directory exists
fs.mkdir(outputDir, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating public directory:', err);
    return;
  }

  // Read the files in the input directory
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error('Error reading the source directory:', err);
      return;
    }

    // Process each Markdown file in the source directory
    files.forEach((file) => {
      if (path.extname(file) === '.md') {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, `${path.basename(file, '.md')}.html`);

        // Convert the Markdown file to HTML
        convertMarkdownToHtml(inputFilePath, outputFilePath);
      }
    });
  });
});
