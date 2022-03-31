const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// TODO: add the ability to create a template based on component architechture

// Handle events
for (const file of eventFiles) {
	const event =  require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.comamnds = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

// Add commands to a collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while excuting this command!',
      ephemeral: true
    });
  }
});

client.login(process.env.Token);
