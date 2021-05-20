/* eslint-disable @typescript-eslint/no-unsafe-call */
import { TextChannel } from 'discord.js';
import schedule from 'node-schedule';

import { Client } from '../index';

module.exports = {
	name: 'ready',
	once: true,
	execute(client: Client) {
		console.log("Loaded commands:");
        client.commands.forEach((cmd) => console.log(`\t${cmd.name} - ${cmd.description}`));
        console.log('Ready!');

        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = 4;
        rule.hour = 10; //parseInt(process.env.HOUR || "13")
        rule.minute = 40;

        schedule.scheduleJob(rule, function(){
          const channel = client.channels.cache.get('821108614554189849') as TextChannel;
          if(channel) channel?.send('@everyone Heipä hei mussukat! Muistakaahan, että meillä on kokus tänään kello 18 (ellei toisin olla sovittu)!');
        });

	},
};