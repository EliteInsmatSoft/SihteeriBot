import dotenv from 'dotenv';
dotenv.config();
import * as Discord from "discord.js";
import fs from 'fs';
import path from 'path';

//vitun scuffed ratkasu
export interface Client extends Discord.Client {
    commands: Discord.Collection<string, Command>;
}

interface Command {
    name: string;
	description: string;
	execute: (message: Discord.Message, args: string[]) => void;
}

interface Event {
    name: string;
	once: boolean;
	execute: (client: Client) => void;
}

const client = new Discord.Client() as Client;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts') || file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.ts') || file.endsWith('.js'));

async function importCommand(file: string) {
    const fullPath = path.parse(`${__dirname}/commands/${file}`);
    const filePath = fullPath.dir + "/" + fullPath.name;

    const command = await import(filePath) as Command;
    client.commands.set(command.name, command);
}

async function importEvent(file: string) {
    const fullPath = path.parse(`${__dirname}/events/${file}`);
    const filePath = fullPath.dir + "/" + fullPath.name;

    const event = await import(filePath) as Event;

    if (event.once) {
		client.once(event.name, () => event.execute(client));
	} else {
		client.on(event.name, () => event.execute(client));
	}
}

for (const file of commandFiles) {
    void importCommand(file);
}

for(const file of eventFiles) {
    void importEvent(file);
}

const prefix = process.env.PREFIX as string;

client.on('message', message => {
    if (!message.guild || !message.content.startsWith(prefix) || message.author.bot) return;

    //extracting args and command, regex handles multiple spaces
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if(!args) return;
    const command = args.shift()?.toLocaleLowerCase();
    if(!command || !client) return;

	try {
        const cmnds = client.commands.get(command);
        if(!cmnds) throw new Error("No command specified!");
        cmnds.execute(message, args);
    } catch (error) {
        const err = (error as Error).message;
        console.error(err);
        void message.reply('There was an error trying to execute that command!');
    }
});

void client.login(process.env.TOKEN);