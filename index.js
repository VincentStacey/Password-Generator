#!/usr/bin/env node

//password-generator to run the script from anywhere in the terminal

const args = process.argv.slice(2);

//Some default values for the password
let length = 8;
let useNumbers = false;
let useCapitals = false;
let useSymbols = false;

// This function does the password generation
function generatePassword(length, useNumbers, useCapitals, useSymbols) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!@#$%^&*()_+{}:\"<>?|[];',./";

  // Start with lowercase letters, variation can be added options chosen
  let characters = letters;
  if (useNumbers) characters += numbers;
  if (useCapitals) characters += capitals;
  if (useSymbols) characters += symbols;

  // Build the password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// A help dialogue for anyone running this program
function displayHelp() {
  console.log(`
Usage: password-generator [options]

Options:
  -help,          Display this help message
  -length,       Set the desired password length (default: 8)
  -numbers,      Add numbers to the generated password
  -capitals,       Include uppercase letters in the password
  -symbols,        Add special characters to the password

Example(s):
  password-generator-length 10 -capitals -symbols
  password-generator-numbers -capitals
`);
  process.exit(0);
}

// Go through each argument and set the options
let i = 0;
while (i < args.length) {
  const arg = args[i];
  switch (arg) {
    case "-help":
      displayHelp();
      break;
    case "-length":
      if (i + 1 >= args.length) {
        console.error(
          "Error: -length option requires a numeric argument."
        );
        process.exit(1);
      }
      length = parseInt(args[++i], 10);
      // Check if the length is valid
      if (isNaN(length) || length <= 0) {
        console.error("Error: Length must be a positive number.");
        process.exit(1);
      }
      break;
    case "-numbers":
      useNumbers = true;
      break;
    case "-capitals":
      useCapitals = true;
      break;
    case "-symbols":
      useSymbols = true;
      break;
    default:
      // Show an Error message if necessary and show the default help message
      console.error(`Error: Unknown option '${arg}'`);
      displayHelp();
  }
  i++;
}

const password = generatePassword(length, useNumbers, useCapitals, useSymbols);
console.log(`Generated password: ${password}`);