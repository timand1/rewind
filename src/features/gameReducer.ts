import { createAction, createReducer } from '@reduxjs/toolkit';
import { Games } from '../models/data';
import jsonData from '../data/data.json';

const initialState : Games[] = jsonData.games;

// const initialState : User = {name: '', win: 0, lost: 0, userId: ''};

const addGame = createAction<Games>('Add game');
const allGames = createAction('All games');
const getGames = createAction<string>('Get games')


const actions = { addGame, allGames, getGames };

const reducer = createReducer(initialState, {
    [addGame.toString()]: ( state, action) => {
        const arrCopy = [...state]
        arrCopy.push(action.payload)

        return arrCopy;
    },
    [allGames.toString()]: ( state, action) => {
        const arrCopy = [...initialState]
        
        return arrCopy;
    },
    [getGames.toString()]: ( state, action) => {
        const arrCopy = [...initialState];
        const newGamesArray:Array<Games> = []
        arrCopy.forEach(game => {
            if(game.team1.includes(action.payload) || game.team2.includes(action.payload)) {
                newGamesArray.push(game)
            }
        });
        
        return newGamesArray;
    }
});

export { reducer, actions };