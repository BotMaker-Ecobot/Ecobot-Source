/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import fs from 'fs';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clui from 'clui';
import dotenv from 'dotenv';
import path from 'path';
import { packageJSON, removeWhiteSpace, checkForExistingFile, copyTemplate } from './util.js';

dotenv.config();
const Spinner = clui.Spinner;
const templateSource = 'packages/ecobot-cli/src/Templates/Discord-Bot/Full';


class Generator {
	constructor(dirName, userAnswers, templateType, botName) {
		this.dirName = dirName;
		this.userAnswers = userAnswers;
		this.templateType = templateType;
		this.botName = botName;
	}

	generateRootDir() {
		let cwd = process.cwd();
		let tempDirPath = path.join(cwd, this.dirName);
		let fsPromise = fs.promises;

		fsPromise.mkdir(tempDirPath).then(() => {
			console.log(chalk.green.bold('File Written Successfully!'));
			copyTemplate(tempDirPath, this.templateType);
		});
	}

	generateDotEnv() {
		let cwd = process.cwd();
		let tempDirPath = path.join(cwd, this.dirName);

		if (checkForExistingFile(`${tempDirPath}/.env`)) return;

		let data = removeWhiteSpace(this.userAnswers);

		data = data.toString();

		fs.writeFileSync(`${tempDirPath}/.env`, data, (err) => {
			if (err) return;

			console.log(chalk.green.bold('File written Successfully'));
		});
	}

	generatePackageJSON() {
		let content = packageJSON(this.botName);
		let cwd = process.cwd();
		let tempDirPath = path.join(cwd, this.dirName);

		if (checkForExistingFile(`${tempDirPath}/package.json`, 'package.json')) return;

		fs.writeFileSync(`${tempDirPath}/package.json`, content, (err) => {
			if (err) return;

			console.log(chalk.green.bold('File written Successfully'));
		});
	}
}


function generatePackagejson(path, name) {
	// Template for the json code
	let data = packageJSON(name);

	// formatted JSON
	data = JSON.stringify(data, null, 3);

	const tempFile = (process.cwd(), path);
	const existingFile = fs.existsSync(tempFile);

	const wrFile = () => {
		fs.writeFile(`${path}/package.json`, data, (err) => {
			if (err) return;

			console.log(chalk.green('File Written Successfully'));
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
		]).then((answer) => {
			if (answer == 'n') return; 

			wrFile(); 
		});
	}
}

function generateDotEnv(path, data) {

	const tempFile = (process.cwd(), path);
	const existingFile = fs.existsSync(tempFile);

	const wrFile = () => {

		fs.writeFile(`${path}/.env`, data, (err) => {
			if (err) return;
			
			console.log(chalk.green('File Written Successfully'));
		});
	};
	// Check if the file exists then make the file.
	if (existingFile) {
		inquirer.prompt([
			{
				name: 'existingFile',
				type: 'confirm',
				message: '⚠️ .env exists. Would you like to override it. ⚠️',
			}
		]).then((answer) => {
			if (answer == 'n') return;

			wrFile();
		});
	}
}

function generateRootDir(path) {
	const spinner = new Spinner('Copying root files 👍 ');
	const fsPromise = fs.promises;

	// using fsPromise because it return a promise
	// using clui for the spinner prompt
	fsPromise.mkdir(path).then(() => {
		spinner.start();
		fse.copy(templateSource, path);
		// Wait for the time the files take to copy
		setTimeout(() => {
			spinner.stop();
			console.log(chalk.green(`Successfully copied files to ${path}`));
		}, 6000);
	});
}

export { generateDotEnv, generateRootDir, generatePackagejson, Generator };
