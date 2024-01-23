const fs = require('fs').promises;
const path = require('path');

const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const distPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');

fs.mkdir(distPath, { recursive: true })
 .then(() => {
    return fs.readFile(templatePath, 'utf8');
 })
 .then(template => {
    const tags = template.match(/{{.*?}}/g);
    if (!tags) return template;

    const readPromises = tags.map(tag => {
      const componentName = tag.slice(2, -2);
      const componentPath = path.join(componentsPath, `${componentName}.html`);
      return fs.readFile(componentPath, 'utf8');
    });

    return Promise.all(readPromises)
     .then(components => {
       let resultTemplate = template;
       tags.forEach((tag, index) => {
         resultTemplate = resultTemplate.replace(tag, components[index]);
       });
       return resultTemplate;
     });
 })
 .then(resultTemplate => {
    return fs.writeFile(path.join(distPath, 'index.html'), resultTemplate);
 })
 .then(() => {
    return fs.readdir(stylesPath, { withFileTypes: true });
 })
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
    return fs.writeFile(path.join(distPath, 'style.css'), styles.join('\n'));
 })
 .then(() => {
    return fs.mkdir(path.join(distPath, 'assets'), { recursive: true });
 })
 .then(() => {
    return fs.readdir(assetsPath, { withFileTypes: true });
 })
 .then(files => {
    const copyPromises = files.map(file => {
      const oldPath = path.join(assetsPath, file.name);
      const newPath = path.join(distPath, 'assets', file.name);
      return fs.copyFile(oldPath, newPath);
    });

    return Promise.all(copyPromises);
 })
 .catch(err => console.error('Ошибка:', err));
