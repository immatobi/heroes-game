// contexts
export interface IGameContext{
    seed: ISeedData,
    bench: Array<IHeroe>
    gameState: string,
    duration: number,
    timer: number,
    loading: boolean,
    setSeed(data: ISeedData): void,
    setGameState(v: string): void,
    setDuration(v: number): void,
    setTimer(v: number): void
    setBench(d: Array<IHeroe>): void
}

export interface IErrorUIProps{
    error: any
    reset: any
}

export interface ISeedData {
    comics: Array<IComic>
    heroes: Array<IHeroe>
}

export interface IComic {
    id: string,
    name: string,
    heroes: Array<IHeroe>
}

export interface IHeroe {
    id: string,
    name: string,
    comics: string
}

export interface IGroup {
    dc: Array<IHeroe>, 
    marvel: Array<IHeroe>
}

export interface IGameHelper {
    shuffle(data: Array<any>): Array<any>,
    GAME_STATE: {
        READY: string,
        PLAYING: string,
        DONE: string,
        DURATION: number
    },
    COMICS: {
        DC: string,
        MARVEL: string
    },
    getTimeLeft(d: number): number,
    getSeconds(v: number): number,
    getGroup(data: Array<IComic>): IGroup
    calculateScore(data: Array<IHeroe>, groups: IGroup): number,
    sortHeroes(data: Array<IHeroe>): Array<IHeroe>
    totalScore(data: Array<IHeroe>, groups: IGroup, time: number): number
}
