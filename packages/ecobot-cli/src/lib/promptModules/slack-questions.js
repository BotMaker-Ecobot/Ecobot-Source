import inquirer from 'inquirer';
import { Generator } from '../Generator.js';
import { processAnswers } from '../util.js';

async function slackQuestions() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const answers = await inquirer
		.prompt([
			// general information
			{
				type: 'text',
				name: 'name',
				message: 'What is the name of the Bot?',
				default: 'bot'
			},
			{
				type: 'list',
				name: 'programmingLanguage',
				message: 'What is your preferred programming language?',
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
				message: 'What is the name of the directory?',
				default: 'temp'
			},
			{
				type: 'confirm',
				name: 'startEnv',
				message: 'Would you like to continue to Env config?',
				default: true,
			},	
		]).then((answers) => {
			console.log(answers.startEnv);
            
			if (answers.startEnv === true) {
				
				let values = processAnswers(answers);
				// console.log(values);

				let gen = new Generator(values[2], null, values[1], values[0], values[0], 'slack');
				gen.generateRootDir();

				// make it wait 2 seconds befire running script 
				setTimeout(() => {
					envSetup();
				}, 2000);
			} 
		});
}

async function envSetup() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const answers = await inquirer
		.prompt([
			// Build .env	
			{
				type: 'text',
				name: 'token',
				message: 'What is the bot token?',
				default: 'token'
			},
			{
				type: 'text',
				name: 'signingSecret',
				message: 'What is the signing secret?',
				default: 'signingSecret'
			},
			{
				type: 'text',
				name: 'appToken',
				message: 'What is the app token?',
				default: 'appToken'
			},
			{
				type: 'text',
				name: 'userId',
				message: 'What is the user id?',
				default: 'userId'
			},
		]).then((answers) => {
			let values = processAnswers(answers);
			// console.log(values);

			let data = `
				TOKEN=${values[0]}
				SIGNING_SECRET=${values[1]}
				APP_TOKEN=${values[2]}
				USER_ID=${values[3]}
			`;

			let gen = new Generator('temp', data, null, null, null, null);
			gen.generateDotEnv();
		});
}

export default slackQuestions;