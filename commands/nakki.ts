import * as Discord from "discord.js";

module.exports = {
	name: 'nakki',
	description: 'Nakki napsahti...',
	execute(message: Discord.Message, args: string[]) {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.random();

		if (!args.length || !taggedUser) {
            //console.log(message.guild);
            if(!message.guild) return;
            console.log("Here");
            void message.guild.members.fetch().then(fetchedMembers =>  {
                console.log(fetchedMembers);
                //filter out bots
                const user = fetchedMembers.filter(m => !m.user.bot).random().user;
                void message.channel.send(`Nakki napsahti ${user}!`);
            });
        }
        else {
            void message.channel.send(`Nakki napsahti ${taggedUser.username}!`);
        }
	},
};

/*
//console.log("Vittu");
                //const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
                // We now have a collection with all online member objects in the totalOnline variable
                //console.log(`There are currently ${totalOnline.size} members online in this guild!`);
                //void message.channel.send(`There are currently ${totalOnline.size} members online in this guild!`);
                //return fetchedMembers;
                if(!users) throw new Error("No users in server?");
            console.log("klklkalsd");
            void users.fetch().then(_members => console.log("!Nakki"));
            console.log(users.resolve.toString());*/
*/