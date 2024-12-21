const fs = require('fs');
const { marked } = require('marked');

// Paths
const inputPath = './src/input.md';
const outputPath = './public/index.html';

// Read Markdown
fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the Markdown file:', err);
    process.exit(1);
  }

  // Convert Markdown to HTML
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown to HTML</title>
</head>
<body>
  ${marked(data)}
</body>
</html>
`;

  // Write HTML to file
  fs.mkdir('./public', { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating public directory:', err);
      process.exit(1);
    }

    fs.writeFile(outputPath, htmlContent, (err) => {
      if (err) {
        console.error('Error writing HTML file:', err);
        process.exit(1);
      }

      console.log('HTML file generated successfully!');
    });
  });
});

