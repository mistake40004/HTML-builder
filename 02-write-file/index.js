const fs = require('fs');
const path = require("path");
const newPath = path.join(__dirname, "out.txt");
const readline = require('readline');

fs.writeFile(newPath, "", (err) => {
    if (err) throw err;
});

const message = `Enter a message to write to a text file: `;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });



function askQuestion() {
    rl.question(message, ans => {
      if (ans.toLowerCase() === 'exit') {
        rl.close();
      }
      else {
        fs.appendFile(newPath, ans + '\n', function(error){
            if(error) return console.log(error); // если возникла ошибка
        });
        askQuestion();
      }
    });
  };
askQuestion();