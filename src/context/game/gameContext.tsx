import { createContext } from 'react'
import { IGameContext } from '../../components/helpers/types';

const GameContext = createContext<any>({});

export default GameContext;