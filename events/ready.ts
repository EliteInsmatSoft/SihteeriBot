/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'fs';
import { TextChannel } from 'discord.js';
import schedule from 'node-schedule';

import { Client } from '../index';
import { kMembers } from '../constants';

import { who, setWho } from '../constants';

module.exports = {
	name: 'ready',
	once: true,
	execute(client: Client) {
		console.log("Loaded commands:");
        client.commands.forEach((cmd) => console.log(`\t!${cmd.name} - ${cmd.description}`));
        console.log('Ready!');

        const channel = client.channels.cache.get('821108614554189849') as TextChannel;

        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = 4;
        rule.hour = 12;
        rule.minute = 0;
        rule.tz = 'Europe/Helsinki';

        schedule.scheduleJob(rule, function(){
          if(channel) channel?.send('@everyone Heipä hei mussukat! Muistakaahan, että meillä on kokous tänään kello 18 (ellei toisin olla sovittu)!');
        });

        const rule2 = new schedule.RecurrenceRule();
        rule2.dayOfWeek = 4;
        rule2.hour = 22;
        rule2.minute = 0;
        rule2.tz = 'Europe/Helsinki';

        schedule.scheduleJob(rule2, () => {
          if(who + 1 < kMembers.length) {
            fs.writeFileSync('who.json', JSON.stringify({ who:  who + 1 }));
            setWho(who+1);
          }
          else {
            fs.writeFileSync('who.json', JSON.stringify({ who:  0 }));
            setWho(0);
          }
        });
	},
};