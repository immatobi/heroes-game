import {
    SET_BENCH,
    SET_DURATION,
    SET_GAME_STATE,
    SET_LOADING,
    SET_SEED,
    SET_TIMER
} from '../types';


const reducer = (state: any, action: any) => {

    switch(action.type){
        case SET_SEED: 
            return {
                ...state,
                seed: action.payload,
                loading: false
            }

        case SET_BENCH: 
            return {
                ...state,
                bench: action.payload,
                loading: false
            }
        case SET_GAME_STATE: 
            return {
                ...state,
                gameState: action.payload,
                loading: false
            }
        case SET_DURATION: 
            return {
                ...state,
                duration: action.payload,
                loading: false
            }
        case SET_TIMER: 
            return {
                ...state,
                timer: action.payload,
                loading: false
            }
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
            
        default: 
            return state;
    }

}

export default reducer;