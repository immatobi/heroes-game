import { ISeedData } from "./types";

const comics = [
    {
        id: 'marvel',
        name: 'Marvel',
        heroes: []
    },
    {
        id: 'dc',
        name: 'DC',
        heroes: []
    },
]

const heroes = [
    {
        id: 'hero-1',
        name: 'Superman',
        comics: 'dc',
    },
    {
        id: 'hero-2',
        name: 'Batman',
        comics: 'dc',
    },
    {
        id: 'hero-3',
        name: 'Flash',
        comics: 'dc',
    },
    {
        id: 'hero-4',
        name: 'Aquaman',
        comics: 'dc',
    },
    {
        id: 'hero-5',
        name: 'Wonder Woman',
        comics: 'dc',
    },
    {
        id: 'hero-6',
        name: 'Green Lantern',
        comics: 'dc',
    },
    {
        id: 'hero-7',
        name: 'Iron Man',
        comics: 'marvel',
    },
    {
        id: 'hero-8',
        name: 'Spiderman',
        comics: 'marvel',
    },
    {
        id: 'hero-9',
        name: 'Captain America',
        comics: 'marvel',
    },
    {
        id: 'hero-10',
        name: 'Thor',
        comics: 'marvel',
    },
    {
        id: 'hero-11',
        name: 'Hulk',
        comics: 'marvel',
    },
    {
        id: 'hero-12',
        name: 'Black Widow',
        comics: 'marvel',
    }
]

const seed: ISeedData = {
    comics: comics,
    heroes: heroes
}

export default seed;