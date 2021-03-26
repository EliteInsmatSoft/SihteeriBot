import  Discord from "discord.js";

module.exports = {
	name: 'oniii-chan',
	description: 'Oniii-chan YAMETE!',
	execute(message: Discord.Message, _args: string[]) {
		void message.channel.send('YAMETE!');
	},
};