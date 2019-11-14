const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHTML = require("./generateHTML.js");
const axios = require("axios");
const pdf = require('html-pdf');
// var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Legal', orientation: 'portrait'};
let starNums = "";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer
    .prompt([
      {
        type: "checkbox",
        message: "What's your favorite color?",
        name: "stack",
        choices: ["red", "yellow", "orange", "blue", "green", "purple", "pink"]
      },
      {
        type: "input",
        name: "github",
        message: "What is your Github username?"
      }
    ])
    .then(answers => {
      console.log("Success!");
      return answers;
    });
}

async function init() {
  try {
    const answers = await promptUser();
    const response = await axios.get(
      `https://api.github.com/users/${answers.github}`
    );
    const responseRepos = await axios.get(
      `https://api.github.com/users/${answers.github}/repos`
    );
    for (let i = 0; i < responseRepos.data.length; i++) {
      if (responseRepos.data[i].stargazers_count !== 0) {
        starNums += responseRepos.data[i].stargazers_count;
      }
    }
    await readFileAsync("generateHTML.js", "utf8");
    // console.log(generateHTML.generateHTML(response));
    const html = await generateHTML.generateHTML(response, answers, starNums);
    // await writeFileAsync("index.html", html);
    // let indexFile = await readFileAsync("index.html", "utf8");
    await pdf.create(html, options).toFile(`${answers.github}.pdf`, function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    
    // console.log(starNums)
  } catch (error) {
    console.error(error);
  }
}

init();
