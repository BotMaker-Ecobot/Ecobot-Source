/* eslint-disable no-undef */
import figlet from 'figlet';
import chalk from 'chalk';

const ecobotAscii = () => {
	console.clear();
	console.log(
		chalk.yellowBright.bold(
			figlet.textSync('Ecobot', {
				horizontalLayout: 'full',
				verticalLayout: 'full',
				width: 180,
				whitespaceBreak: true
			})
		)
	);
};

const thankyouAscii = () => {
	console.log(
		chalk.yellowBright.bold(
			figlet.textSync('Thanks! Enjoy!', {
				horizontalLayout: 'full',
				verticalLayout: 'full',
				width: 180,
				whitespaceBreak: true
			})
		)
	);
};

export { ecobotAscii, thankyouAscii };