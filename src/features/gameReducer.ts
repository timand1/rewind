import { createAction, createReducer } from '@reduxjs/toolkit';
import { Games } from '../models/data';

const initialState : Games[] = [] 


const addGame = createAction<Games>('Add game');
const setAllGames = createAction<Games[]>('Set all games');
const getUserGames = createAction<string>('Get user games');
const getAllGames = createAction('Get all games');


const actions = { addGame, setAllGames, getUserGames, getAllGames };

const reducer = createReducer(initialState, {
    [addGame.toString()]: ( state, action) => {
        const arrCopy = [...state]
        arrCopy.push(action.payload)
        
        return arrCopy;
    },
    [setAllGames.toString()]: ( state, action) => {
      const gamesArr = [...action.payload]
        gamesArr.sort(function(a,b) {
          return b.date.localeCompare(a.date);
        });

        localStorage.setItem('games', JSON.stringify(action.payload));
        state = [...action.payload]
        
        return state;
    },
    [getUserGames.toString()]: ( state, action ) => {
        const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
        const newGamesArray:Array<Games> = [];

        for (const game of allGames) {
            game.team1.forEach(player => {
              if(Object.values(player).indexOf(action.payload) > -1) {
                newGamesArray.push(game)
              }
            })
            game.team2.forEach(player => {
                if(Object.values(player).indexOf(action.payload) > -1) {
                  newGamesArray.push(game)
                }
              })
        }       
        
        return newGamesArray
    },
    [getAllGames.toString()]: ( state, action) => {
      const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');

      allGames.sort(function(a,b){
        return b.date.localeCompare(a.date);
      })
      
      return allGames;
    },

});

export { reducer, actions };