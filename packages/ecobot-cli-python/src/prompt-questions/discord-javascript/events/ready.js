/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
};
