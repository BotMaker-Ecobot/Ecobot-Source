/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import fs from 'fs';
import chalk from 'chalk';
import clui from 'clui';
import dotenv from 'dotenv';
import path from 'path';
import { packageJSON, removeWhiteSpace, checkForExistingFile, copyTemplate, copyPackage } from './util.js';

dotenv.config();
const Spinner = clui.Spinner;


/**
 * @description - This function is used to generate the all of the types of bots and their respective files.
 * @param {string} botType - The type of bot to be generated.
 * @param {string} botName - The name of the bot to be generated.
 * @param {string} dirName - The name of the directory to be created.
 * @param {string} userAnswers - The answers from the user.
 * @param {string} packageName - The name of the package.
 * @param {string} templateType - The programming language of the template.
 */
class Generator {
	constructor(dirName, userAnswers, templateType, botName, packageName, botType) {
		this.botType = botType;
		this.dirName = dirName;
		this.userAnswers = userAnswers;
		this.templateType = templateType;
		this.botName = botName;
		this.packageName = packageName;
	}

	generateRootDir() {
		let cwd = process.cwd();
		let tempDirPath = path.join(cwd, this.dirName);
		let fsPromise = fs.promises;
		let spinner = new Spinner('generating root dir');

		fsPromise.mkdir(tempDirPath).then(() => {
			spinner.start();
			setTimeout(() => {
				spinner.stop();
				console.log(chalk.green.bold('File Written Successfully!'));
			}, 200);
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

	addPackage() {
		let cwd = process.cwd();
		let tempDirPath = path.join(cwd, this.dirName);

		copyPackage(tempDirPath, this.templateType, this.packageName); 
	}
}

export { Generator };
