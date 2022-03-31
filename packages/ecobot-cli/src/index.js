#! /usr/bin/env node

/* eslint-disable no-undef */
import inquirer from 'inquirer';

import discordQuestions from './lib/promptModules/discord-questions.js';
import { Generator } from './lib/Generator.js';
import { ecobotAscii } from './lib/ascii.js';
import slackQuestions from './lib/promptModules/slack-questions.js';

function processArgs(args) {
	switch (args) {
	case 'init': 
		// Start the process of creating basic template
		firstQuestion();
		break;
	case 'add': 
		// Start the process of adding a module to the template
		// eslint-disable-next-line no-case-declarations
		let gen = new Generator('temp', '', 'javascript', '', process.argv[3]);
		gen.addPackage();
		break;
	}
}

async function firstQuestion () {
	// eslint-disable-next-line no-unused-vars
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const answers = await inquirer
		.prompt([
			{
				type: 'list',
				name: 'botType',
				message: 'What kind of bot would you like to create?',
				choices: [
					'discord',
					'slack',
				],
				default: 'discord',
			},
		]).then(answer => {
			switch (answer.botType) {
			case 'discord':
				discordQuestions();
				break;
			case 'slack':
				slackQuestions();	
				break;
			case 'github':
				break;
			}
		});
}
ecobotAscii();

setTimeout(() => {
	processArgs(process.argv[2]);
}, 100);