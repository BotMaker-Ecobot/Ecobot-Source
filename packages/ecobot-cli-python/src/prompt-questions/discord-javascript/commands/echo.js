/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input')
		.addStringOption((option) =>
			option
				.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)
		),
	async execute(interaction) {
		const args = interaction.options.getString('input');
		await interaction.reply(`${args}`);
	}
};
