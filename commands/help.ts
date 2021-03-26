import  Discord from "discord.js";

module.exports = {
	name: 'help',
	description: 'Show all commands for bot!',
	execute(message: Discord.Message, _args: string[]) {
		// grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
        if(!taggedUser) {
            void message.channel.send(`You need to tag a user in order to kick them ${message.author}!`);
            return;
        }
        void message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};