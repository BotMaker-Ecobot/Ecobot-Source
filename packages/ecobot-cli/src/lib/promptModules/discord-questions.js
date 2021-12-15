import inquirer from 'inquirer';
import chalk from 'chalk';

async function discordQuestions() {
	let config = {
		disocrd: '0.0.1',
	};

	const answers = await inquirer 
		.prompt([
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
	case 'export':
		console.log(chalk.blueBright('Hello World'));
	}
}

export  default discordQuestions;