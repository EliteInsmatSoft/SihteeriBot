import Discord from "discord.js";

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message: Discord.Message, _args: string[]) {
		void message.channel.send('Pong.');
	},
};