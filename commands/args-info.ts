import  Discord from "discord.js";

module.exports = {
	name: 'args-info',
	description: 'Infoa argumenteista...',
	execute(message: Discord.Message, args: string[]) {
		if (!args.length) {
            void message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        void message.channel.send(`Command name: ${args[0]}\nArguments: ${args}`);
	},
};