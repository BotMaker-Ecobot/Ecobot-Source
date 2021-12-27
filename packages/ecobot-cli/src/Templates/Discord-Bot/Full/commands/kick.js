const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a User')
        .addUserOption(option => option.setName('target').setDescription('The User you would like to kick')),
  async execute(interaction) {
      if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
          const target = interaction.options.getUser('target');

          if (target !== null) {
            console.log(`You kicked ${target.username}`);
            interaction.guild.members.kick(target.id);
            await interaction.reply(`You kicked ${target.username}`);
          } else {
            await interaction.reply(`You must supply arguments!`);
          }
      } else {
        await interaction.reply(`You cannot run this command!`);
      }
  }
}
