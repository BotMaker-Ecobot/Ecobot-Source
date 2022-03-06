/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unban a banned user!')
		.addUserOption((option) =>
			option.setName('target').setDescription('Pick a user to unban')
		),
	async execute(interaction) {
		if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			// Get the user to unban
			const user = interaction.options.getUser('target');

			if (user !== null) {
				console.log(`You unbanned ${user.username}`);
				interaction.guild.members.unban(user.id);
				await interaction.reply(`You unbanned ${user.username}`);
			} else {
				await interaction.reply('You must supply arguments');
				return;
			}
		} else {
			await interaction.reply('You do not have persmmisions for this command.');
		}
	}
};
