/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel
} = require('@discordjs/voice');

require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play-music')
		.setDescription('Play music based off a youtube link')
		.addStringOption((option) =>
			option.setName('input2').setDescription('youtube-link').setRequired(true)
		),
	async execute(interaction) {
		const connection = joinVoiceChannel({
			channelId: process.env.voiceChannelId,
			guildId: process.env.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator
		});

		const ytLink = interaction.options.getString('input1');
		const stream = ytdl(`${ytLink}`, { filter: 'audioonly' });
		const resource = createAudioResource(stream, {
			inputType: StreamType.Arbitrary
		});
		const player = createAudioPlayer();

		player.play(resource);
		connection.subscribe(player);

		player.on(AudioPlayerStatus.Idle, () => connection.destroy());
		// TODO: Make the Link actually link
	}
};
