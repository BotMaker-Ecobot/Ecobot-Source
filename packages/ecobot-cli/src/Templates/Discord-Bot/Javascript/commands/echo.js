const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('echo')
      .setDescription('Replies with your input'),
  async execute(interaction) {
    await interaction.reply(`This will return args`);
  }
}
