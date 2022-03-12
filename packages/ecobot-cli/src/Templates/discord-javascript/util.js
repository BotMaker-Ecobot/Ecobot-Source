const chalk = require('chalk');
const { MessageSelectMenu, MessageActionRow } = require('discord.js');

const create_mh = (array) => {
	if (!array) throw new Error(chalk.red.bold(`The options were not provided! Make sure you provide all of the options!`));
	if (array.length < 0) throw new Error(chalk.red.bold(`The array has to have atlease one thing to select!`));
	let select_menu;
	let id = `help-menus`;
	let menus = [];
	const emo = {
		info: "❗️",
		utility: "⚙",
		moderation: "🔧"
	};

	array.forEach(cca => {
		let name = caa;
		let sName = `${name.toUpperCase()}`;
		let tName = name.toLowerCase();
		let fName = name.toUpperCase();

		return menus.push({
			label: sName,
			description:  `${sName} commands!`,
			value: fName
		});
	});

	let smenu1 = new MessageSelectMenu()
		.setCustomId(id)
		.setPlaceholder(`Choose your command category!`)
		.addOptions(menus);

	select_menu = new MessageActionRow()
		.addComponents(
			smenu1
		);

	return {
		smenu: [select_menu],
		sid: id
	};
};

module.exports = { create_mh };
