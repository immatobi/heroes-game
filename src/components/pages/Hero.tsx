import React, { useEffect, useContext, useState } from 'react'
import seedData from '../helpers/seedData'
import { ISeedData, IGameContext, IHeroe } from '../helpers/types'
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import GameContext from '../../context/game/gameContext';
import game from '../helpers/game';
import { DroppableStrict } from './DropableStrict';
import { Draggable } from 'react-beautiful-dnd';

const Hero = ({ hero, index }: { hero: IHeroe, index: number }) => {

    const gameContext = useContext<IGameContext>(GameContext)
    
    useEffect(() => {



    }, [])

    return (
        <>
            <Draggable key={hero.id} draggableId={hero.id} index={index}>

                {(dragger, snapshot) => (
                    <div 
                    { ...dragger.draggableProps } 
                    { ...dragger.dragHandleProps } 
                    ref={dragger.innerRef}
                    className='col-item'>
                        <img 
                        style={{ minWidth: '10px', width: '25px' }}
                        src={`../../../images/assets/${hero.name.toLowerCase().replace(' ', '-')}.svg`} alt={hero.name} />
                        <span className='pdl1 font-freimedium fs-12 onblack'>{ hero.name }</span>
                    </div>
                )}

            </Draggable>
        </>
    )
}

export default Hero