import inquirer from 'inquirer';
import chalk from 'chalk';

import {generateDotEnv, generateRootDir } from '../Generator.js';

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
					message: 'What is you guildId?',
					deafult: 'guildId',
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
				name: 'botUsage',
				choices: [
					'Default',
					'For Fun',
					'For Moderation',
					'For Fun & Moderation',
				],
				default: 'Deafault',
			},
			{
				type: 'text',
				name: 'export',
				message: 'What folder would you like you project in?',
				default: 'temp',
			},
		]).then((answer) => {
			 switch (answer.botUsage) {
				case 'For Fun':
						break;
				case 'For Moderation':
						break;
				case 'For Fun and Moderation':
						break;
				case 'Default':

						const path = answer.export;
						const token = answer.token;
						const clientId = answer.clientId;
						const guildId = answer.guildId;
						const adminId = answer.adminRole;
						const voiceChannelId = answer.voiceChannelId;
						const botUsage = answer.botUsage;

						const data = `
							token=${token}
							clientId=${clientId}
							guildId=${guildId}
							adminRole=${adminId}
							voiceChannelId=${voiceChannelId}
						`;
						  generateDotEnv(path, data);
							generateRootDir(path, data);
						break;
				default:
						break;
			}
		});
}

export  default discordQuestions;
