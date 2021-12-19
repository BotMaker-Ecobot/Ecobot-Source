import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import generate from './lib/Generator.js';

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
			{
				type: 'text',
				name: 'path',
				message: 'Where would you like to put it?',
				default: 'temp'
			}
		]).then(answer => {
			console.log(answer.path);

			switch (answer.botType) {
				case 'discord':
						generate(answer.path);
			}
		});
}

firstQuestion();
