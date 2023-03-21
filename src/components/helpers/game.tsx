import seed from "./seedData";
import { IComic, IGameHelper, IGroup, IHeroe } from "./types";

let timerId: number = 0;

// Knuth shuffle algorithm
/*
    In the shuffle algorithm, we start from the end of the array and 
    replace it with a random indexed item on the array, and we keep doing 
    this until we reach the first element of the array.
*/
const shuffle = (data: Array<any>): Array<any> => {

    let currList = data;
    let currIndex: number = data.length;
    let tempVal: any = {};
    let randIndex: number = 0;

     // While there remain elements to shuffle...
     while(0 !== currIndex){

        // Pick an element...
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1; // decrease current index;

        // ...and swap it with the current element
        tempVal = currList[currIndex];
        currList[currIndex] = currList[randIndex];
        currList[randIndex] = tempVal;

     }

     return currList;

}

const getTimeLeft = (d: number): number => {
    let r: number = d - Date.now();
    return r;
}

const getSeconds = (v: number): number => {
    let r: number = v / 1000;
    return r;
}

const getGroup = (data: Array<IComic>): IGroup => {

    let result: IGroup = { dc: [], marvel: [] }

    const dcComic = data.find((x) => x.id === COMICS.DC.toLowerCase());
    const mvComic = data.find((x) => x.id === COMICS.MARVEL.toLowerCase());

    if(dcComic){
        result.dc = dcComic.heroes;
    }

    if(mvComic){
        result.marvel = mvComic.heroes;
    }

    return result;

}

const sortHeroes = (data: Array<IHeroe>): Array<IHeroe> =>{

    let order = data.sort((a,b) => {
        if(a.name < b.name) { return -1 }
        else if(a.name > b.name) { return 1 }
        else { return 0 }
    })

    return order;

}

const calculateScore = (data: Array<IHeroe>, groups: IGroup): number => {

    const MAX_POINT = data.length;
    let dcSum: number = 0;
    let mvSum: number = 0;

    // get the original lists
    let dcList = data.filter((x) => x.comics === COMICS.DC.toLowerCase());
    let mvList = data.filter((x) => x.comics === COMICS.MARVEL.toLowerCase());

    groups.dc.map((hero, index) => {
        
        const exist = dcList.find((x) => (x.id === hero.id && x.comics === hero.comics));

        if(exist){

            const hIndex = sortHeroes(data).findIndex((x) => x.id === hero.id);
            const penalty = hIndex === index ? MAX_POINT : (MAX_POINT - Math.abs(index - hIndex));
            dcSum = dcSum + penalty;

        }else{
            dcSum = dcSum + 0;
        }

    })

    groups.marvel.map((hero, index) => {
        
        const exist = mvList.find((x) => (x.id === hero.id && x.comics === hero.comics));

        if(exist){

            const hIndex = sortHeroes(data).findIndex((x) => x.id === hero.id);
            const penalty = hIndex === index ? MAX_POINT : (MAX_POINT - Math.abs(index - hIndex));
            mvSum = mvSum + penalty;

        }else{
            mvSum = mvSum + 0;
        }

    })

    return (dcSum + mvSum)

}

const totalScore = (data: Array<IHeroe>, groups: IGroup, time: number): number => {

    const score = calculateScore(data, groups);
    return score ? (score + time) : 0;

}

// Game states
const GAME_STATE = {
    READY: 'ready',
    PLAYING: 'playing',
    DONE: 'done',
    DURATION: 30 /// 30 seconds
}

const COMICS = {
    DC: 'DC',
    MARVEL: 'MARVEL',
}

const game: IGameHelper = {
    shuffle: shuffle,
    GAME_STATE: GAME_STATE,
    COMICS: COMICS,
    getTimeLeft: getTimeLeft,
    getSeconds: getSeconds,
    getGroup: getGroup,
    calculateScore: calculateScore,
    sortHeroes: sortHeroes,
    totalScore: totalScore
}

export default game;