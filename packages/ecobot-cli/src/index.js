import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';

import discordQuestions from './lib/promptModules/discord-questions.js';

const ecobotAscii = () => {
	console.log(
		chalk.green(
			figlet.textSync(`Ecobot`, {
					horizontalLayout: 'full',
					verticalLayout: 'default',
					width: 80,
					whitespaceBreak: true
			})
		)
	);
}

async function firstQuestion () {
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
