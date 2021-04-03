import Discord from "discord.js";


const MIKA_STONKS = ":822028894432657408:";
const MIKA_NOT_STONKS = ":821308808206876752:";

const letterReaction = (i: number) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return `:regional_indicator_${letters[i]}:`;
}

module.exports = {
  name: "vote",
  description: "Äänestys aiheesta",
  async execute(message: Discord.Message, _args: string[]) {
    const args = _args.join(" ").split(";");
    
    const voteType = args?.[0].trim();
    switch (voteType) {
      default: {
        message.channel.send("Ensimmäisen argumentin täytyy olla joko `yes/no` tai `multiple`");
        break;
      }

      // everyone votes either yes or no
      case "yes/no": {
        const subject = args?.[1].trim(); 

        const reply = `Äänestys aiheesta:\n\n**${subject}**\n\n` +
          `Kyllä: ${MIKA_STONKS}\n` +
          `Ei: ${MIKA_NOT_STONKS}\n`;

        await message.channel.send(reply);
        break;
      }
      
      // everyone can choose multiple choices
      case "multiple": {
        const choices = args?.slice(1);

        const formattedChoices = choices.map((choice, i) =>
          `${letterReaction(i)}: **${choice.trim()}**`).join("\n");

        const reply = `Äänestys aiheista:\n\n` + formattedChoices;
        await message.channel.send(reply);
        break;
      }
    }
  }, 
};
