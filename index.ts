import dotenv from 'dotenv';
dotenv.config();
import * as Discord from "discord.js";

const client = new Discord.Client();

const prefix = process.env.PREFIX as string;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if(!message.guild) return;

	if (message.content === prefix + 'ping') {
		void message.channel.send('Pong.');
	} else if (message.content === prefix + 'beep') {
		void message.channel.send('Boop.');
	} else if (message.content === prefix + 'server') {
		void message.channel.send('Guild name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
	} else if (message.content === prefix + 'user-info') {
		void message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
	} else if (message.content === prefix + 'oniii-chan') {
		void message.channel.send('YAMETE');
	} else if (message.content === prefix + 'ara ara') {
		void message.channel.send('ara ara');
	} else if (message.content === prefix + 'help') {
		void message.channel.send('vitun homo, opettele käyttää :)');
	}
});

void client.login(process.env.TOKEN);