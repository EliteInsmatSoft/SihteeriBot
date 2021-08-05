import * as Discord from "discord.js";

import { kMembers } from '../constants';

import { who } from '../constants';

module.exports = {
	name: 'sihteeri',
	description: 'Kuka on sihteeri?',
	execute(message: Discord.Message, _args: string[]) {
        void message.channel.send(`Seuraava sihterimme on ${kMembers[who]}`);
	},
};