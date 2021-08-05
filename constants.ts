import data from './who.json';

export const kMembers = [
    "Ville",
    "Juhana",
    "Teemu",
    "Tuomas",
    "Tomas",
    "Nevil",
    "Matias",
    "Kari",
    "Patrik",
];

export let who = data.who;

export const setWho = (value: number) => who = value;