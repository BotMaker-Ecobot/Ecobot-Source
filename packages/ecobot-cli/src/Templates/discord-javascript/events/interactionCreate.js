<<<<<<< HEAD

module.exports = {
	name: 'interactionCreate',
	execute (interaction) {
		console.log(`${interaction.user.tag in #${interaction.channel.name} triggerd an interaction`);
	}
=======
module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggerd interaction.`
    );
  }
>>>>>>> e15c98f (Working on things)
};
