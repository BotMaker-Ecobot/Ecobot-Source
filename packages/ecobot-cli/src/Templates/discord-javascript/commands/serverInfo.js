import SlashCommandBuilder from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('server command'),
	async execute(interaction) {
		await interaction.reply(`Server name: ${interaction.guild.name}\n Total members: ${interaction.guild.memberCount}`);
	}
};
