const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
		.addStringOption(option => 
			option.setName('input')
				  .setDescription('The Input to echo back!')
				  .setRequired(true)),
	async execute(interaction) {
		let args = await interaction.options.getString('input');
		await interaction.reply(`${args}`);
	}
};
