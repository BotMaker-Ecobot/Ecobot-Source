import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

import discordQuestions from './lib/promptModules/discord-questions.js';

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

firstQuestion();
