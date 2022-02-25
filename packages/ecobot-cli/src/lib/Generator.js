/* eslint-disable no-undef */
import fs from 'fs';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clui from 'clui';
import dotenv from 'dotenv';

dotenv.config();
const Spinner = clui.Spinner;
const templateSource = '/Users/deondreenglish/Projects/Ecobot-Source/packages/ecobot-cli/src/Templates/Discord-Bot/Full';

function Data (name) {
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

	return data;
}

function generatePackagejson(path, name) {
	// Template for the json code
	let data = Data(name);

	// formatted JSON
	data = JSON.stringify(data, null, 3);

	const tempFile = (process.cwd(), path);
	const existingFile = fs.existsSync(tempFile);

	const wrFile = () => {
		fs.writeFile(`${path}/package.json`, data, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(chalk.green('File Written Successfully'));
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
		// Remove white space from new line
		var file = data.toString().split('\n').map((line) => {
			return line.trim();
		}).filter(Boolean);

		JSON.stringify(file);
		console.log(file);

		fs.writeFile(`${path}/.env`, data, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(chalk.green('File Written Successfully'));
			}
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
		]).then(() => {
			wrFile();
		});
	}
}

// eslint-disable-next-line no-unused-vars
function generateRootDir(path, _botType) {
	const spinner = new Spinner('Copying root files 👍 ');
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
