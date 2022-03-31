// eslint-disable-next-line @typescript-eslint/no-var-requires
const { App } = require('@slack/bolt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	socketMode: true,
	appToken: process.env.SLACK_APP_TOKEN,
});

// handle messages
app.message(async ({ message, context }) => {
	if (message.text === 'hello') {
		await app.client.chat.postMessage({
			token: context.botToken,
			channel: message.channel,
			text: 'Hello there!',
		});
	}
});

(async () => {
	await app.start(process.env.PORT || 3000);
	console.log('⚡️ Bolt app is running!');
})();