import dotenv from 'dotenv';
dotenv.config();
import * as Discord from "discord.js";
//import { Client as _Clt, _Intents } from "discord.js";
import fs from 'fs';

//let intents = new Intents(Intents.NON_PRIVILEGED);
//intents.add('GUILD_MEMBERS');

//vitun scuffed ratkasu
interface Client extends Discord.Client {
    commands: Discord.Collection<string, Command>;
}

interface Command {
    name: string;
	description: string;
	execute: (message: Discord.Message, _args: string[]) => void;
}

const client = new Discord.Client() as Client;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts') || file.endsWith('.js'));

async function importFile(file: string) {
    const command = await import(`./commands/${file}`) as Command;
    client.commands.set(command.name, command);
    console.log(client.commands);
}

for (const file of commandFiles) {
    void importFile(file);
}

const prefix = process.env.PREFIX as string;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.guild || !message.content.startsWith(prefix) || message.author.bot) return;

    //extracting args and command, regex handles multiple spaces
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if(!args) return;
    const command = args.shift()?.toLocaleLowerCase();
    if(!command) return;

    if(!client) return;

	try {
        const c = client.commands.get(command);
        if(!c) throw new Error("No command specifyed!");
        c.execute(message, args);
    } catch (error) {
        const err = (error as Error).message;
        console.error(err);
        void message.reply('There was an error trying to execute that command!');
    }
});

void client.login(process.env.TOKEN);

/*
 //if no server or no message content or message was send by bot, exit
    if (!message.guild || !message.content.startsWith(prefix) || message.author.bot) return;

    //extracting args and command, regex handles multiple spaces
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if(!args) return;
    const command = args.shift()?.toLocaleLowerCase();

    if (command === 'args-info') {
        if (!args.length) {
            void message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        void message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    } else if (command === 'kick') {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
        if(!taggedUser) {
            void message.channel.send(`You need to tag a user in order to kick them ${message.author}!`);
            return;
        }
        void message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
*/