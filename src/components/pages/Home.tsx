import React, { useEffect, useContext, useState } from 'react'
import seedData from '../helpers/seedData'
import { ISeedData, IGameContext, IComic, IHeroe } from '../helpers/types'
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import GameContext from '../../context/game/gameContext';
import game from '../helpers/game';
import Column from './Column';
import Bench from './Bench';
import { setInterval } from 'timers/promises';
import { Link } from 'react-router-dom';

const Home = (props: any) => {

    // https://jamesinkala.com/blog/make-animated-content-placeholders-with-html-and-css/
    // https://kovart.github.io/dashed-border-generator/
    // https://egghead.io/lessons/react-course-introduction-beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd
    // https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4

    const [seed, setSeed] = useState<ISeedData>(seedData);
    const gameContext = useContext<IGameContext>(GameContext)
    const isDrop = gameContext.gameState === game.GAME_STATE.DONE;
    const [deadline, setDeadline] = useState(0);
    const [gameScore, setGameScore] = useState(0)
    
    useEffect(() => {

        gameContext.setGameState(game.GAME_STATE.READY);

        return () => {
            clearInterval(gameContext.timer);
            clearTimeout(gameContext.timer)
        }

    }, [])

    // reorder our columns here
    const handleDrag = async (result: any) => {

        const { destination, source, draggableId } = result;

        // no destination
        if(!destination){
            return;
        }
        // check if destination is the same
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }

        // console.log(source.droppableId)
        // console.log(destination.droppableId)

        const currList: ISeedData = gameContext.seed;

        // source (starting comic)
        let start: Array<IHeroe> = gameContext.bench;

        // destination (ending comic)
        const end = currList.comics.find((x) => x.id === destination.droppableId);
        const eIndex = currList.comics.findIndex((x) => x.id === destination.droppableId);

        // task (what is being dragged)
        const hero = currList.heroes.find((x) => x.id === draggableId);
        const hIndex = currList.heroes.findIndex((x) => x.id === draggableId);

        if(end && eIndex >= 0 && hero && hIndex >= 0){

            if(source.droppableId === destination.droppableId){

                // make sure same place re-order only works for comic columns not bench
                if(source.droppableId === game.COMICS.DC.toLowerCase() || source.droppableId === game.COMICS.MARVEL.toLowerCase()){

                    let temp = end.heroes;
                    temp.splice(source.index, 1);
                    let hold = [...temp];

                    hold.splice(destination.index, 0, hero);
                    end.heroes = hold;

                    // replace new end current in list
                    currList.comics.splice(eIndex, 1, end);

                    // set state
                    gameContext.setSeed(currList)

                }

            }

            if(source.droppableId !== destination.droppableId){

                const item = end.heroes.find((x) => x.id === hero.id);

                if(!item){

                    let startList = start;
                    let endList = end.heroes;

                    // remove hero from start (source)
                    /*
                        use filter specifically here to avoid 
                        state management ambiguities
                    */ 
                    start = start.filter((x) => x.id !== hero.id);

                    // add hero to destination;
                    endList.push(hero);
                    end.heroes = endList;

                    // replace new end current in list
                    currList.comics.splice(eIndex, 1, end);

                    // set state
                    await gameContext.setBench(start)
                    await gameContext.setSeed(currList);

                }

            }

        }

    }

    const handleUpdate = () => {

    }

    const handleStart = () => {
        
    }

    const getComic = (t: string) => {

        let result: IComic = { id: '', name: '', heroes: [] };

        if(t === game.COMICS.MARVEL.toLowerCase()){
            result = gameContext.seed.comics.filter((x) => x.id === game.COMICS.MARVEL.toLowerCase())[0]
        }

        if(t === game.COMICS.DC.toLowerCase()){
            result = gameContext.seed.comics.filter((x) => x.id === game.COMICS.DC.toLowerCase())[0]
        }

        return result;

    }

    const startGame = () => {

        gameContext.setGameState(game.GAME_STATE.PLAYING);
        gameContext.setBench(game.shuffle(seedData.heroes))
        gameContext.setDuration(30)
        

        // trigger loop
        gameLoop(game.GAME_STATE.DURATION)

    }

    const gameLoop = (dur: number) => {

        let timer = window.setInterval(() => {

            if(dur == -1){
                clearTimeout(timer);
                clearInterval(timer);

                // trigger function
                endGame(timer)

            }else{
                gameContext.setDuration(dur);
                gameContext.setTimer(timer)
                dur--;
            }

        }, 1000);

    }

    const endGame = (t: any) => {

        // clear interval/countdown
        clearInterval(t);
        clearTimeout(t);

        // set game stage
        gameContext.setGameState(game.GAME_STATE.DONE);

        // calculate score
        const score = game.totalScore(gameContext.seed.heroes, game.getGroup(gameContext.seed.comics), gameContext.duration);
        setGameScore(score)
    }

    const resetGame = () => {

        // reset seed Data
        let currList = gameContext.seed;
        let cList = currList.comics;

        cList = cList.map((x) => {
            return { id: x.id, name: x.name, heroes: [] }
        });

        currList.comics = cList

        // set state
        gameContext.setSeed(currList);
        gameContext.setBench([]);
        gameContext.setTimer(0);
        gameContext.setDuration(0);
        gameContext.setGameState(game.GAME_STATE.READY);
        
        
    }

    const fireStart = (e: any) => {

        if(e) { e.preventDefault() }

        if(gameContext.gameState === game.GAME_STATE.READY){
            startGame()
        }else if(gameContext.gameState === game.GAME_STATE.DONE){
            resetGame()
        }else if(gameContext.gameState === game.GAME_STATE.PLAYING){
            endGame(gameContext.timer)
        }

    }

    return (
        <>
            {/* NB: only onDragEnd is the required callback here */}
            
            <section className='section'>

                <div className='container'>

                    <div className='inner-box info'>
                        <div className='wrap-box'>

                            <div className='mrgb2'>
                                <h1 className='font-freibold onmineshaft fs-16 ui-upcase mrgb2'>{ gameContext.gameState === game.GAME_STATE.PLAYING ? 'Now Playing...' : 'Line Up The Heroes' }</h1>
                                
                                {
                                    gameContext.gameState === game.GAME_STATE.READY &&
                                    <>
                                        <p className='font-frei onblack fs-15 ui-line-height-large'>
                                            Welcome to the "Line Up The Heroes" Game. <br />    
                                            Drag and Drop the heroes in the correct comics list, sort them alphabetically and quickly for better score...
                                        </p>
                                    </>
                                }

                                {
                                    gameContext.gameState !== game.GAME_STATE.READY &&
                                    <>
                                        <div className='font-frei fs-15 ui-text-center'>
                                            <p className='fs-60 mrgb0 onblack' style={{lineHeight: '60px'}}>{ gameContext.duration }</p>
                                            <span className='fs-13 text-muted'>Time left</span>
                                        </div>
                                    </>
                                }

                            </div>

                            <div className='ui-line bg-silverlight'></div>
                            <div className='mrgb3'></div>

                            {
                                gameContext.gameState === game.GAME_STATE.DONE &&
                                <>
                                    <div className='font-freimedium fs-15 ui-text-center mrgb3'>
                                        <span className='fs-13 text-muted'>Your total score</span>
                                        <p className='fs-60 onblack mrgb0' style={{lineHeight: '60px'}}>{ gameScore }</p>
                                    </div>
                                </>
                            }

                            <div className='d-flex center-y center-x'>

                                <div className='ui-group-button'>
                                    <Link onClick={(e) => fireStart(e)} to="" className='btn md font-freibold fs-15 bg-purple onwhite'>
                                        { gameContext.gameState === game.GAME_STATE.DONE ? 'Reset Game' : gameContext.gameState === game.GAME_STATE.PLAYING ? 'End Game' : 'Start Game'  }
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className={`inner-box game ${ (gameContext.gameState === game.GAME_STATE.PLAYING) ? '' : 'disabled' }`}>

                        <DragDropContext
                        onDragStart={handleStart}
                        onDragUpdate={handleUpdate}
                        onDragEnd={handleDrag}
                        >
                            <>

                                {
                                    gameContext.seed.comics.map((comic, index) =>
                                    <>
                                        <Column 
                                            data={ comic } 
                                            display={index === 0 ? game.COMICS.MARVEL : game.COMICS.DC} 
                                            isDrop={isDrop}
                                        />

                                        {
                                            (index === 0) && 

                                            <Bench 
                                                heroes={gameContext.bench}
                                                isDrop={isDrop}
                                            />
                                        }
                                    </>
                                    )
                                }
                            
                            </>
                            
                        </DragDropContext>

                    </div>

                </div>

            </section>
        </>
    )
}

export default Home