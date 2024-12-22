const fs = require('fs');

const emojiList = './submodules/emojis/gistfile1.md';

fs.readFile(emojiList, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  // Print the contents of the file
  console.log(data);
});
