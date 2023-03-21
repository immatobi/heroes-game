import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

import Axios from 'axios';

import GameContext from './gameContext';
import GameReducer from './gameReducer';

import { IHeroe, ISeedData } from '../../components/helpers/types';
import seedData from '../../components/helpers/seedData';
import game from '../../components/helpers/game';
import { SET_BENCH, SET_DURATION, SET_GAME_STATE, SET_SEED, SET_TIMER } from '../types';

const GameState = (props: any) => {

    const cookie = new Cookies();

    const exp = new Date(
        Date.now() + 70 * 24 * 60 * 60 * 1000
    )

    const navigate = useNavigate()
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        seed: seedData,
        bench: [],
        gameState: game.GAME_STATE.READY,
        timer: 0,
        duration: 0,
        loading: false,
    }

    const [state, dispatch] = useReducer(GameReducer, initialState);

    const setSeed = (data: ISeedData) => {
        dispatch({
            type: SET_SEED,
            payload: data
        })
    }

    const setBench = (data: Array<IHeroe>) => {
        dispatch({
            type: SET_BENCH,
            payload: data
        })
    }

    const setGameState = (v: string) => {
        dispatch({
            type: SET_GAME_STATE,
            payload: v
        })
    }

    const setDuration = (v: number) => {
        dispatch({
            type: SET_DURATION,
            payload: v
        })
    }

    const setTimer = (v: number) => {
        dispatch({
            type: SET_TIMER,
            payload: v
        })
    }

    return <GameContext.Provider
        value={{
            seed: state.seed,
            bench: state.bench,
            gameState: state.gameState,
            duration: state.duration,
            timer: state.timer,
            loading: state.loading,
            setTimer,
            setSeed,
            setBench,
            setGameState,
            setDuration
        }}
    >
        {props.children}

    </GameContext.Provider>
  
}

export default GameState