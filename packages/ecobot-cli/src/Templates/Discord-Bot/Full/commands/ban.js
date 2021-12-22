const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('Ban a user based on input')
      .addUserOption(option => option.setName('target').setDescription('Select a User!')),

  async execute(interaction) {
    // Get Info from the command
    if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      const user = interaction.options.getUser('target');

      if (user !== null) {
        console.log(user);
        interaction.reply(`You banned ${user.username}`);
      } else {
        await interaction.reply(`You must supply arguments`);
        return;
      }
    } else {
      console.log(`You do not have permissions for this command`);
    }

  }
}
