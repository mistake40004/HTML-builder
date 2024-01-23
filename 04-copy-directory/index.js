const path = require('path');
const fs = require('fs').promises;

const folderPath = path.join(__dirname, "files");
const newFolderPath = path.join(__dirname, "files-copy");

fs.mkdir(newFolderPath, { recursive: true })
 .then(() => {
    return fs.readdir(newFolderPath, { withFileTypes: true });
 })
 .then(files => {
    const unlinkPromises = files.map(file => {
      return fs.unlink(path.join(newFolderPath, file.name));
    });
    return Promise.all(unlinkPromises);
 })
 .then(() => {
    return fs.readdir(folderPath, { withFileTypes: true });
 })
 .then(files => {
    const copyFilePromises = files.map(file => {
      return fs.copyFile(path.join(folderPath, file.name), path.join(newFolderPath, file.name));
    });
    return Promise.all(copyFilePromises);
 })
 .catch(err => console.error('Ошибка:', err));
