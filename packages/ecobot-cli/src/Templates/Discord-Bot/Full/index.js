
require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents, Permissions, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// !Event Files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// !Command Files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in a Collection
  // With the key as command name and the value as exported module
  client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (e) {
        console.log(e);
        await interaction.reply({ content: 'There was an error while executing this command!', ephe})
    }

    // TODO: I want to make the bot log to an excel sheet.
});

// Welcome Command
// TODO: Add this to the /events folder
client.on('guildMemberAdd', async interaction => {
    const welcomeEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Welcome ${interaction.member}`)
          .setDescription(`Have a great time in the server`)
          .setFooter(`Have a great time in the server`);

    await interaction.reply({ embeds: [welcomeEmbed] });
});

client.login(process.env.token);
