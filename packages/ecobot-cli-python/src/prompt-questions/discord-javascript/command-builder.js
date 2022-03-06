/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
require('dotenv').config();

const commands = [];
const commadnFiles = fs
	.readFileSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commadnFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
	{ body: commands }
)
	.then(() => console.log('Successfully registred application command'))
	.catch((err) => console.error(err));