import inquirer from 'inquirer';

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
				type: 'confirm',
				name: 'startEnv',
				message: 'Would you like to continue to Env config?',
				default: true,
			},	
		]).then((answers) => {
			console.log(answers.startEnv);
            
			if (answers.startEnv === true) {
				envSetup();
			} else {
				return;
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
		]);
}

export default slackQuestions;