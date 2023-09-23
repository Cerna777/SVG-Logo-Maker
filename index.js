const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo text:',
      validate: (input) => input.length <= 3 ? true : "Please enter up to three characters."
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (color keyword or hexadecimal number):'
    },
    {
      type: 'list',
      name: 'shapeType',
      message: 'Select a shape:',
      choices: ['Triangle', 'Circle', 'Square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (color keyword or hexadecimal number):'
    }
  ]);

  return userInput;
}

function generateSVG(shape, text, textColor) {
  shape.setColor(textColor);
  const svgString = `
    <svg width="300" height="200">
      ${shape.render()}
      <text x="10" y="30" font-family="Arial" font-size="20" fill="${textColor}">${text}</text>
    </svg>
  `;
  return svgString;
}

function saveSVGToFile(svgString) {
  fs.writeFileSync('logo.svg', svgString);
}

async function main() {
  try {
    const userInput = await getUserInput();

    let shape;
    switch (userInput.shapeType) {
      case 'Triangle':
        shape = new Triangle();
        break;
      case 'Circle':
        shape = new Circle();
        break;
      case 'Square':
        shape = new Square();
        break;
      default:
        console.error('Invalid shape type');
        return;
    }

    const svgString = generateSVG(shape, userInput.text, userInput.textColor);
    saveSVGToFile(svgString);

    console.log('Generated logo.svg');
  } catch (error) {
    console.error(error);
  }
}

main();
