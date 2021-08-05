import * as Discord from "discord.js";

const responses = [
  'You filthy animal...',
  'Onkos tämä nyt ihan sopivaa?',
  'Sure, bondataan vaan 😏',
  'En muista, että tuommoinen olisi kuulunut työnkuvaani 🙄',
  'Anna kun arvaan, Nevil?',
  'Yare yare daze...'
]

module.exports = {
	name: 'bondage',
	description: 'Bond with sihteeri ;)',
	execute(message: Discord.Message, _args: string[]) {
    const selection = Math.floor(Math.random()*responses.length);
    const msg = responses[selection];
    void message.channel.send(msg);
	},
};