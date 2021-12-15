import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
//import handleAnswers from './ssr/handleAnswers';

const j = path.join(process.cwd(), 'package.json');
const existingConfig = fs.existsSync(j);

async function firstQuestion () {
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
		]);
	//handleAnswers(answers);
}

if (existingConfig) {
	inquirer.prompt([
		{
			type: 'confirm',
			name: 'overwrite',
			message: '⚠️Package.json exisits already would you like to overwrite it?⚠️',
			default: false,
		}
	]).then((answers) => {
		if (answers.overwrite) {
			firstQuestion();
		} else {
			console.log('Goodbye');
		} 
	});
} else {
	firstQuestion();
}