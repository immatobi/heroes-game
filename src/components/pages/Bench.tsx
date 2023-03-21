import React, { useEffect, useContext, useState } from 'react'
import seedData from '../helpers/seedData'
import { ISeedData, IGameContext, IHeroe } from '../helpers/types'
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import GameContext from '../../context/game/gameContext';
import game from '../helpers/game';
import { DroppableStrict } from './DropableStrict';
import { Draggable } from 'react-beautiful-dnd';
import Hero from './Hero';

const Bench = ({ heroes, isDrop }: { heroes: Array<IHeroe>, isDrop: boolean }) => {

    const gameContext = useContext<IGameContext>(GameContext)
    
    useEffect(() => {



    }, [])

    // reorder our columns here
    const handleDrag = async (result: any) => {


    }

    return (
        <>
            <div className='column'>
                <h1 className='font-frei onmineshaft fs-14 ui-upcase mrgb2'>BENCH</h1>

                <DroppableStrict droppableId={'bench'}>

                    {(provided, snapshot) => (
                        <>

                            <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`column-inner bench ${snapshot.isDraggingOver ? 'active' : ''}`}>

                                {
                                    heroes.map((hero, index) => 
                                    <>
                                        <Hero hero={hero} index={index} />
                                    </>
                                    )
                                }
                                
                            {provided.placeholder }
                            </div>

                        </>
                    )}

                </DroppableStrict>

                
            </div>
        </>
    )
}

export default Bench