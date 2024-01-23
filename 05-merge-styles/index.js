const fs = require('fs').promises;
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');
fs.readdir(stylesPath, { withFileTypes: true })
.then(files => {
    const readPromises = files
      .filter(file => file.isFile() && path.extname(file.name) === '.css')
      .map(file => {
        const filePath = path.join(stylesPath, file.name);
        return fs.readFile(filePath, 'utf8');
      });

    return Promise.all(readPromises);
 })
 .then(styles => {
    return fs.writeFile(outputPath, styles.join('\n'));
 });
