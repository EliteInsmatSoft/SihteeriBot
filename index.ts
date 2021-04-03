import dotenv from 'dotenv';
dotenv.config();
import * as Discord from "discord.js";
import fs from 'fs';
import path from 'path';

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
    const fullPath = path.parse(`${__dirname}/commands/${file}`);
    const filePath = fullPath.dir + "/" + fullPath.name;

    const command = await import(filePath) as Command;
    client.commands.set(command.name, command);
}

for (const file of commandFiles) {
    void importFile(file);
}

const prefix = process.env.PREFIX as string;

client.once('ready', () => {
    console.log("Loaded commands:");
    client.commands.forEach((cmd) => console.log(`\t${cmd.name} - ${cmd.description}`));
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.guild || !message.content.startsWith(prefix) || message.author.bot) return;

    //extracting args and command, regex handles multiple spaces
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if(!args) return;
    const command = args.shift()?.toLocaleLowerCase();
    if(!command || !client) return;

	try {
        const cmnds = client.commands.get(command);
        if(!cmnds) throw new Error("No command specifyed!");
        cmnds.execute(message, args);
    } catch (error) {
        const err = (error as Error).message;
        console.error(err);
        void message.reply('There was an error trying to execute that command!');
    }
});

void client.login(process.env.TOKEN);