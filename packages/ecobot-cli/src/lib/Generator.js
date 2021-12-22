import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';

import dotenv from 'dotenv';
dotenv.config();

function generatePackagejson(path, name) {
  // TODO: Finish this function
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
  const tempFile = (process.cwd(), path);
  const existingConfig = fs.existsSync(tempFile);
  const fsPromise = fs.promises;

  // TODO: Make the switch work

  console.log(botType);

  switch (botType) {
    case 'For Fun':
      fsPromise.mkdir(path).then(() => {
          // Copy the /core path into /temp
          fse.copy(process.env.coreTemplateSource, path);
      });
      break;

    case 'For Moderation':
      fsPromise.mkdir(path).then(() => {
          fse.copy(process.templateSource, path);
      });
      break;

  }
}

export {generateDotEnv, generateRootDir};
