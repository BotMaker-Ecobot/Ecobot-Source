#! /usr/bin/env node

/* eslint-disable no-undef */
import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';

import discordQuestions from './lib/promptModules/discord-questions.js';

const ecobotAscii = () => {
	console.clear();
	console.log(
		chalk.green(
			figlet.textSync('Ecobot', {
				horizontalLayout: 'full',
				verticalLayout: 'default',
				width: 80,
				whitespaceBreak: true
			})
		)
	);
};

async function firstQuestion () {
	// eslint-disable-next-line no-unused-vars
	const answers = await inquirer
		.prompt([
			{
				type: 'list',
				name: 'botType',
				message: 'What kind of bot would you like to create?',
				choices: [
					'discord',
				],
				default: 'discord',
			},
		]).then(answer => {
			switch (answer.botType) {
			case 'discord':
				discordQuestions();
				break;
			case 'slack':
				break;
			case 'github':
				break;
			}
		});
}

ecobotAscii();

setTimeout(() => {
	firstQuestion();
}, 1000);
