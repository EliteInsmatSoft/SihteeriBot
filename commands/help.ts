import  Discord from "discord.js";

module.exports = {
	name: 'help',
	description: 'Show all commands for bot!',
	execute(message: Discord.Message, _args: string[]) {
        void message.channel.send(`
        Commands:
        -!kick @someone: vote kick! 
        -!nakki online/@someone
        -!vote tyyppi; aiheet; jaettuna; puolipisteillä;
        `);
	},
};