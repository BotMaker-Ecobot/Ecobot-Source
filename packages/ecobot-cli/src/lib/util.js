/* eslint-disable no-undef */
import fs from 'fs';
import inquirer from 'inquirer';
import fse from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

let cwd = process.cwd();

function packageJSON (name) {
	let data = {
		'name':  `${name}`,
		'main':   'index.js',
		'scripts' : {
			'dev': 'nodemon index.js'
		},
		'license': 'MIT',
		'devDependencies': {
			'dotenv': '^10.0.0',
			'eslint': '^8.5.0',
			'nodemon': '^2.0.15'
		},
		'dependencies': {
			'@discordjs/builders': '^0.9.0',
			'@discordjs/opus': '^0.7.0',
			'@discordjs/rest': '^0.1.0-canary.0',
			'@discordjs/voice': '^0.7.5',
			'chalk': '^5.0.0',
			'discord-api-types': '^0.25.2',
			'discord.js': '^13.3.1',
			'ffmpeg-static': '^4.4.0',
			'fs': '^0.0.1-security',
			'ytdl-core': '^4.9.2'
		}
	}; 

	return JSON.stringify(data, null, 3);
}
/**
 * 
 * @param {name of the file to check for} existingFile 
 * @param {name of the file} filename 
 */
function checkForExistingFile(existingFile, filename) {
	let file = fs.existsSync(existingFile);

	if (file) {
		inquirer.prompt({
			name: 'existing-file',
			type: 'confirm',
			message: `${filename} already exists. Would you like to create a new one? `
		}).then((answer) => {
			return answer['existing-file'];
		});
	}

	return false;
}

function processAnswers(answers) {
	let values = [];

	for (const key in answers) {
		values.push(answers[key]);
	}

	return values;
}

function removeWhiteSpace(toRemove) {
	var content = toRemove.toString().replace(/\t/g, '').split('\r\n');
	return content;
}

function copyTemplate(sourcePath, templateType) {

	// eslint-disable-next-line quotes
	let templatePath = path.join(`${cwd}/src/Templates`, `discord-${templateType}`);


	fse.copy(templatePath, sourcePath, err => {
		if (err) return console.error(err);

		console.log(templatePath);

		console.log(chalk.green.bold('Successfully copied files over to your directory! 😎'));
	});
}

function copyPackage(sourcePath, language, packageName) {
	let packagePath = path.join(`${cwd}/src/Addons`, `discord-${language}-${packageName}`);
	
	fse.copy(packagePath, sourcePath, err => {
		if (err) return console.error(err);

		console.log(packagePath);

		console.log(chalk.green.bold('Successfully copied files over to your directory! 😎'));
	});
}

export {
	packageJSON, 
	checkForExistingFile,
	processAnswers,
	removeWhiteSpace,
	copyTemplate,
	copyPackage
};