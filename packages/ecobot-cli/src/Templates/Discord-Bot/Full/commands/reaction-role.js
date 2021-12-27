const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('reaction-role')
      .setDescription('Create a message for people to react to')
      .addStringOption(option =>
      		option.setName('input1')
      			.setDescription('The input to echo back')
      			.setRequired(true))
      .addStringOption(option =>
          option.setName('input2')
            .setDescription('The input to echo back')
            .setRequired(true)),
  async execute(interaction) {
      if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
          const ReactTitle = interaction.options.getString('input1');
          const ReactDescription = interaction.options.getString('input2');

          if (ReactTitle !== null && ReactDescription !== null) {
              const ReactMessage = new MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`${ReactTitle}`)
                    .setDescription(`${ReactDescription}`);

              await interaction.reply(`React to this Message!`);
              await interaction.channel.send({embeds: [ReactMessage]}).then(messageSent => {
                // Set the Reaction Emojis
                messageSent.react('👍');

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '👍' && user.id == messageSent.author.id;
                };

                const collector = interaction.createReactionCollector({ filter });
                // Wait for a user to react to a message
                collector.on('collect', async(reaction, user) => {
                    const role = await interaction.guild.roles.fetch("848341272900534342");

                    console.log('World');
                    interaction.guild.members.fetch(user.id).then(member => {
                      member.roles.add(role);
                    });

                    // TODO: Make reaction roles possible
                });
              });
          } else {
            await interaction.reply(`You must supply arguments!`);
            return;
          }
      } else {
        await interaction.reply(`You do not have the permissions to run this command`);
      }
  }
}
