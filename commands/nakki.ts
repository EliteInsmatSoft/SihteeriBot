import * as Discord from "discord.js";

async function fetcheServerMembers(message: Discord.Message) {
    if(!message.guild) return;
    const members = await message.guild.members.fetch();
    return members;
}

module.exports = {
	name: 'nakki',
	description: 'Nakki napsahti...',
	execute(message: Discord.Message, args: string[]) {
        // grab random mentioned user from mentions
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.random();

		if (!args.length || !taggedUser) {
            if(!message.guild) return;
            void fetcheServerMembers(message).then(fetchedMembers =>  {
                if(!fetchedMembers) return;
                //filter out bots
                const user = fetchedMembers.filter(m => !m.user.bot).random().user;
                void message.channel.send(`Nakki napsahti ${user}!`);
            });
        }
        else if(args[1] === "online"){
            void fetcheServerMembers(message).then(fetchedMembers => {
                if(!fetchedMembers) return;
                const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
                //We now have a collection with all online member objects in the totalOnline variable
                const user = totalOnline.filter(m => !m.user.bot).random().user;
                void message.channel.send(`Nakki napsahti ${user}!`);
            });
        }
        else {
            void message.channel.send(`Nakki napsahti ${taggedUser}!`);
        }
	},
};