import path from 'path';
import inquirer from 'inquirer';

const baseConfig = {
	builds:  [
		{
			src: 'src/index.js',
		},
	],
	routes: [
		{ src: '/.*', dest: 'src/index.js'}
	]
};

async function Discord (config) {
	let mainFile = 'src/index.js';
	try {
		// eslint-disable-next-line
        const packageJSON = require(path.join(process.cwd(), 'package.json'));
		mainFile = packageJSON.main;
		// eslint-disable-next-line
    } catch (error) {}

	const answers = await inquirer.prompt([
		{
			type: 'text',
			name: 'entry-point',
			message: 'What is your main file?: ',
			deafult: mainFile,
		},
	]);
	baseConfig.builds[0].src = answers.main;
	baseConfig.routes[0].dist = answers.main;
	return {
		...config,
		...baseConfig,
	};
}

export default Discord;