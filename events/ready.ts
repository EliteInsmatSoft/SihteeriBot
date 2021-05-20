/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'fs';
import { TextChannel } from 'discord.js';
import schedule from 'node-schedule';

import { Client } from '../index';
import { kMembers } from '../constants';

import data from '../who.json';

module.exports = {
	name: 'ready',
	once: true,
	execute(client: Client) {
		console.log("Loaded commands:");
        client.commands.forEach((cmd) => console.log(`\t${cmd.name} - ${cmd.description}`));
        console.log('Ready!');

        const channel = client.channels.cache.get('821108614554189849') as TextChannel;

        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = 4;
        rule.hour = 10;
        rule.minute = 0;

        schedule.scheduleJob(rule, function(){
          if(channel) channel?.send('@everyone Heipä hei mussukat! Muistakaahan, että meillä on kokous tänään kello 18 (ellei toisin olla sovittu)!');
        });

        const rule2 = new schedule.RecurrenceRule();
        rule.dayOfWeek = 4;
        rule.hour = 22;
        rule.minute = 0;

        schedule.scheduleJob(rule2, () => {
          const who = data.who;
          who + 1 < kMembers.length ? 
          fs.writeFileSync('who.json', JSON.stringify({ who:  who + 1 })) : 
          fs.writeFileSync('who.json', JSON.stringify({ who:  0 }));
        });
	},
};

export const shedule = (day: number, hour: number, minute: number, client: Client) => {
  const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = day;
        rule.hour = hour; //parseInt(process.env.HOUR || "13")
        rule.minute = minute;

        schedule.scheduleJob(rule, function(){
          const channel = client.channels.cache.get('821108614554189849') as TextChannel;
          if(channel) channel?.send('@everyone Heipä hei mussukat! Muistakaahan, että meillä on kokus tänään kello 18 (ellei toisin olla sovittu)!');
        });
};