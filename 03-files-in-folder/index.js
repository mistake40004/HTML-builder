const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
 if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
 }

 files.forEach(file => {
    let filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Ошибка при получении информации о файле:', err);
        return;
      }

      if (stats.isFile()) {
        let fileExtension = path.extname(file).replace('.', '');
        let fileSize = stats.size;
        let fileNameWithoutDot = path.basename(file, fileExtension).replace('.', '');
        console.log(`${fileNameWithoutDot} - ${fileExtension} - ${fileSize}b`);
      }
    });
 });
});
