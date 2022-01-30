import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clui from 'clui';
import Data from './util';

const Spinner = clui.Spinner;
const templateSource = `/Users/deondreenglish/Projects/Ecobot-Source/packages/ecobot-cli/src/Templates/Discord-Bot/Full`;

function generatePackagejson(path, name) {
  // Template for the json code
  // 
  Data(name);

  // formatted JSON
  data = JSON.stringify(data, null, 3);

  const tempFile = (process.cwd(), path);
  const existingFile = fs.existsSync(tempFile);

  const wrFile = () => {
    fs.writeFile(`${path}/package.json`, data, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(chalk.green(`File Written Successfully`));
        }
    });
  };

  // ! Check if file already exists
  if (existingFile) {
    inquirer.prompt([
      {
        name: 'existingFile',
        type: 'confirm',
        message: '⚠️ package.json exists. Would you like to create a new one?',
      },
    ]).then(() => {
      wrFile(); 
    });
  }
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
      fse.copy(templateSource, path);

      setTimeout(() => {
          spinner.stop();
          console.log(chalk.green(`Successfully coppied files to ${path}`));
      }, 6000);
  });
}

export { generateDotEnv, generateRootDir, generatePackagejson };
