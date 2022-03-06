/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a user of thier behavior')
		.addStringOption((option) =>
			option
				.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)
		)
		.addUserOption((option) =>
			option.setName('user').setDescription('Pick a User')
		),
	async execute(interaction) {
		if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			const user = interaction.options.getUser('user');
			const warnAbout = interaction.options.getString('input');

			if (user !== null) {
				const userM = userMention(user.id);
				await interaction.reply(`${userM}, ${warnAbout}`);
			}
		} else {
			console.log(
				'You do not have the correct permissions to run this command'
			);
		}
	}
};
