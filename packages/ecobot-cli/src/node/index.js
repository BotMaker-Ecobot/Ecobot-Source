import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

import discord from './ssr/discord.js';

const j = path.join(process.cwd(), 'package.json');
const existingConfig = fs.existsSync(j);

async function buildDiscordBot(){
	let config = {
		version: 2,
	};

	const answers = await inquirer 
		.prompt([
			{
				type: 'list',
				name: 'bot-type',
				message: 'What kind of bot would you like to create?',
				choices: [
					'discord',
				],
				default: 'discord',
			},
			{
				type: 'text',
				name: 'name',
				message: 'What is the name of the Bot? ',
				default: 'bot'
			},
			{
				type: 'text',
				name: 'bot-token',
				message: 'What is the bot token?'
			},
			{
				type: 'text',
				name: 'export',
				message: 'What folder would you like you project in?',
				default: '/root/documents/bot'
			},
		]);
	
	config.name = answers.name;

	switch (answers.type) {
	case 'discord':
		config = await discord(config);
	}
}

if (existingConfig) {
	inquirer.prompt([
		{
			type: 'confirm',
			name: 'overwrite',
			message: 'Package.json exisits already would you like to overwrite it?',
			default: false,
		}
	]).then((answers) => {
		if (answers.overwrite) {
			buildDiscordBot();
		} else {
			console.log('Goodbye');
		} 
	});
} else {
	buildDiscordBot();
}