import React, { useEffect, useContext, useState } from 'react'
import seedData from '../helpers/seedData'
import { ISeedData, IGameContext, IComic, IHeroe } from '../helpers/types'
import '@atlaskit/css-reset';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { DroppableStrict } from './DropableStrict';

import GameContext from '../../context/game/gameContext';
import game from '../helpers/game';
import Hero from './Hero';

const Column = ({ data, display, isDrop }: { data: IComic, display: string, isDrop: boolean }) => {

    const gameContext = useContext<IGameContext>(GameContext)
    
    useEffect(() => {



    }, [])

    // reorder our columns here
    const handleDrag = async (result: any) => {


    }

    return (
        <>
            <div className='column'>

                <h1 className='font-frei onmineshaft fs-14 ui-upcase mrgb2'>{ data.name }</h1>

                <DroppableStrict droppableId={display.toLowerCase()}>

                    {(provided, snapshot) => (
                        <>

                            <div 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`column-inner ${snapshot.isDraggingOver ? 'active' : ''}`}>

                                {
                                    data.heroes.map((hero, index) => 
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

export default Column