# Sihteeri

Tsugoi sihteeri-chan

## Sovelluksen käyttäminen

### npm run dev

Käynnistä dev serveri, älä käytä tuotannossa!

### npm start

Käynnistää serverin build version tuotantoa varten.
MUISTA:

### npm run build

Jotta tuotanto versio generoidaan omalle koneellesi!

## Uusien komentojen lisääminen

Hakemistoon commands, tiedoston nimi muodossa: nimi.ts
Tiedoston sisään: 

import  Discord from "discord.js";

module.exports = {
	name: 'nimi',
	description: 'hieno kuvaus komennosta',
	execute(message: Discord.Message, _args: string[]) {
		//komennon toiminta
	},
};