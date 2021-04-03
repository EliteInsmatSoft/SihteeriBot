# Sihteeri 📜

Tsugoi sihteeri-chan!

## Sovelluksen käyttäminen

### npm run dev

Käynnistä dev serveri, älä käytä tuotannossa!

### npm start

Käynnistää serverin build version tuotantoa varten.

MUISTA:

### npm i

Jotta lataat riippuvuudet, kun olet kloonannut repositorion

JA

### npm run tsc

Jotta tuotanto versio generoidaan omalle koneellesi!

JA

### .env
-tiedosto juureen jonne:
* TOKEN=botintoken
* PREFIX="!"

## Uusien komentojen lisääminen

Hakemistoon commands, tiedoston nimi muodossa: nimi.ts

Tiedoston sisään jotain tämän tapaista: 

```
import Discord from "discord.js";

module.exports = {
	name: 'nimi',
	description: 'hieno kuvaus komennosta',
	execute(message: Discord.Message, _args: string[]) {
		//komennon toiminta
	},
};
```

## TODO

* Testit jest/mocha/chai
* Uusia komentoja?
* Tyypitykset omaan tiedostoon
* Joitain noita funktioit tuolta index.ts vois myös laittaa omiin tiedostoihinsa
* Kun komentoja tulee lisää, voidaan niitä jakaa omiin alihakemistoihinsa
* Kannattaa asentaa pm2 sit ku halutaa laittaa pyörii johonki raspillee jne.