const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHTML = require("./generateHTML.js");
const axios = require("axios");
const pdf = require('html-pdf');

let options = { format: 'Legal', orientation: 'portrait'};
let starNums = "";
let location = "";

const readFileAsync = util.promisify(fs.readFile);

// INQUIRER PROMPT FUNCTION
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

// ASYNC INIT FUNCTION
async function init() {
  try {
    // CALLING INQUIRER PROMPTUSER AND WAITING TO DECLARE CONST ANSWERS
    const answers = await promptUser();
    // MAKING AXIOS GET REQUEST AND WAITING TO DECLARE  CONST RESPONSE
    const response = await axios.get(
      `https://api.github.com/users/${answers.github}`
    );
    // REASSIHNING LOCATION AFTER STRIPPING < AND SPACES, REPLACING WITH +
    location += (response.data.location).replace(", ", "+").replace(" ", "+");
    
    // MAKING AXIOS GET REQUEST AND WAITING TO DECLARE  CONST RESPONSEREPOS
    const responseRepos = await axios.get(
      `https://api.github.com/users/${answers.github}/repos`
    );
    // LOOPING THROUGH REPOS AND CHECKING IF THEY HAVE STARS
    for (let i = 0; i < responseRepos.data.length; i++) {
      if (responseRepos.data[i].stargazers_count !== 0) {
        // IF THEY DO, ADD THEM TO STARNUMS COUNT VARIABLE
        starNums += responseRepos.data[i].stargazers_count;
      }
    }
    // READING GENERATEHTML.JS 
    await readFileAsync("generateHTML.js", "utf8");
    // ASSIGNING HTML CONST WITH GEN HTML MODULE AND PASSING THOUGH RESPONSES AND VARIABLES
    const html = await generateHTML.generateHTML(response, answers, starNums, location);
    // CREATING PDF FILE FROM GEN HTML FILE
    await pdf.create(html, options).toFile(`${answers.github}.pdf`, function(err, res) {
      if (err) return console.log(err);
      console.log(res); 
    });
  } catch (error) {
    console.error(error);
  }
}

init();
