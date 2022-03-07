/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

import { generateDotEnv, Generator, generatePackagejson } from '../Generator.js';
import { processAnswers } from '../util.js';


// TODO: Make thankyouAscii show up at the end;
const thankyouAscii = () => {
	console.log(
		chalk.green(
			figlet.textSync('Thanks! Enjoy!', {
				horizontalLayout: 'full',
				verticalLayout: 'default',
				width: 80,
				whitespaceBreak: true
			})
		)
	);
};

async function discordQuestions() {
	const answers = await inquirer
		.prompt([
			// package.json
			{
				type: 'text',
				name: 'name',
				message: 'What is the name of the Bot?',
				default: 'bot'
			},
			// Build .env
			{
				name: 'buildEnv',
				type: 'confirm',
				message: 'Would you like to continue to Env config?',
			},
			{
				type: 'text',
				name: 'token',
				message: 'What is the bot token?',
				default: 'token'
			},
			{
				type: 'text',
				name: 'clientId',
				message: 'What is your bot`s clientId?',
				default: 'clientId'
			},
			{
				type: 'text',
				name: 'guildId',
				message: 'What is your guildId?',
				default: 'guildId',
			},
			{
				type: 'text',
				name: 'adminRole',
				message: 'What is the id of your Admin Role?',
				default: 'adminId',
			},
			{
				type: 'text',
				name: 'voiceChannelId',
				message: 'What is your preferred voiceChannelId?',
				default: 'voiceChannelId',
			},
			// Bot Usage
			{
				type: 'list',
				name: 'languageChoice',
				choices: [
					'javascript',
					'python', 
					'rust',
					'golang'
				],
				default: 'javascript',
			},
			{
				type: 'text',
				name: 'export',
				message: 'What folder would you like you project in?',
				default: 'temp',
			},
		]).then((answer) => {
			let values = processAnswers(answer);
			console.log(values);
					
			let path = answer.export;
					
			const data = `
					token=${values[2]}
					clientId=${values[3]}
					guildId=${values[4]}
					adminRole=${values[5]}
					voiceChannelId=${values[6]}
				`;
						
			let gen = new Generator(path, data, values[7]);
			gen.generateRootDir();

			setTimeout(() => {
				gen.generatePackageJSON();
				gen.generateDotEnv();
			}, 1000);
		});
}

export  default discordQuestions;
