/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(
			`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
		);
	}
};
