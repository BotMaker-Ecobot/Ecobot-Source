import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clui from 'clui';

const Spinner = clui.Spinner;
const templateSourceMac = `/Users/deondreenglish/Projects/Ecobot-Source/packages/ecobot-cli/src/Templates/Discord-Bot/Full`;
const templateSourceLinux = `/home/deondre/Projects/Ecobot-Source/packages/ecobot-cli/src/Templates/Discord-Bot/Full`;

function generatePackagejson(path, name) {
  // TODO: Generate Package Json
  const data = fs.readFileSync('package.json');
  data.name = { "name": `${name}`};
}

function generateDotEnv(path, data) {

  const tempFile = (process.cwd(), path);
  const existingFile = fs.existsSync(tempFile);

  const wrFile = () => {
    fs.writeFile(`${path}/.env`, data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(chalk.green(`File Written Successfully`));
      }
    });
  }
  // Check if the file exists then make the file.
  if (existingFile) {
    inquirer.prompt([
        {
          name: 'existingFile',
          type: 'confirm',
          message: '⚠️ .env exists. Would you like to override it. ⚠️',
        }
    ]).then(() => {
      wrFile();
    });
  }
}

function generateRootDir(path, botType) {
  const spinner = new Spinner(`Coppying root files 👍 `);
  const tempFile = (process.cwd(), path);
  const existingConfig = fs.existsSync(tempFile);
  const fsPromise = fs.promises;

  // using fsPromise because it return a promise
  // using clui for the spinner prompt
  fsPromise.mkdir(path).then(() => {
      spinner.start();
      fse.copy(templateSourceLinux, path);

      setTimeout(() => {
          spinner.stop();
          console.log(chalk.green(`Successfully coppied files to ${path}`));
      }, 6000);

  });
}

export {generateDotEnv, generateRootDir};
