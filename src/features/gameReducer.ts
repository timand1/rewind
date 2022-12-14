import { createAction, createReducer } from '@reduxjs/toolkit';
import { Games } from '../models/data';

const initialState : Games[] = []

const setAllGames = createAction<Games[]>('Set all games');
const getUserGames = createAction<object>('Get user games');
const getAllGames = createAction('Get all games');
const filterUserGames = createAction<object>('Filter games');
const filterGames = createAction<object>('Get no win or ten last user games');
const filteredGames = createAction<string>('Get matches filtered by game');
const sortByDate = createAction<object>('Sort games by date');
const sortByDuration = createAction<object>('Sort games by duration');
const sortByTimeUser = createAction<object>('Sort user games by date or duration');

const actions = { setAllGames, getUserGames, getAllGames, filterUserGames, filterGames, filteredGames, sortByDate, sortByDuration, sortByTimeUser };

const reducer = createReducer(initialState, {
    [setAllGames.toString()]: ( state, action) => {
      const gamesArr: Games[] = [...action.payload]
        gamesArr.sort(function(a,b) {
          return b.date.localeCompare(a.date);
        });

        localStorage.setItem('games', JSON.stringify(action.payload));
        state = [...gamesArr];
        
        return state;
    },
    [getUserGames.toString()]: ( state, action ) => {
      const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      let newGamesArray: Games[] = [];

      allGames.sort(function(a,b) {
        return b.date.localeCompare(a.date);
      });

      for (const game of allGames) {
        game.team1.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
        game.team2.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
      };    
      
      if(action.payload.game != 'all') {
        newGamesArray = newGamesArray.filter(game => game.game == action.payload.game);
      };
      
      return newGamesArray;
    },
    [getAllGames.toString()]: ( state, action) => {
      const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      
      allGames.sort(function(a,b){
        return b.date.localeCompare(a.date);
      });
      
      return allGames;
    },
    [filterUserGames.toString()]: ( state, action) => {
      let allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      let newGamesArray: Games[] = [];
      
      allGames.sort(function(a,b) {
        return b.date.localeCompare(a.date);
      });
      
      const arrCopy: Games[] = [...allGames];
      if(action.payload.setting == 'no-win') {
        allGames = arrCopy.filter(game => game.win == '');        
      };

      for (const game of allGames) {
        game.team1.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
        game.team2.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
      };
      
      let filteredGames: Games[] = newGamesArray.filter(game => game.game == action.payload.game);
      
      if(action.payload.setting == 'last-ten') {    
        filteredGames.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        filteredGames = filteredGames.slice(0,10);
      };

      if(action.payload.game == 'all') {         
        if(action.payload.setting == 'last-ten') {
          newGamesArray.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
          newGamesArray = newGamesArray.slice(0,10);
        };
        return newGamesArray;
      }
      
      return filteredGames;
    },
    [filterGames.toString()]: ( state, action ) => {
      let allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      let newGamesArray: Games[] = [];

      allGames.sort(function(a,b) {
        return b.date.localeCompare(a.date);
      });
      const arrCopy: Games[] = [...allGames];

      if(action.payload.game != 'all') {
        allGames = arrCopy.filter(game => game.game == action.payload.game);
      };

      for (const game of allGames) {
        game.team1.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
        game.team2.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
      };
      if(action.payload.setting == 'no-win') {
        newGamesArray = newGamesArray.filter(game => game.win == '')
      } else if(action.payload.setting == 'last-ten') {
        newGamesArray.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        newGamesArray = newGamesArray.slice(0, 10);
      }    
      return newGamesArray;
    },
    [filteredGames.toString()]: ( state, action) => {
      const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      const newGamesArray: Games[] = [...allGames];

      newGamesArray.sort(function(a,b) {
        return b.date.localeCompare(a.date);
      });
      
      const filteredGames: Games[] = newGamesArray.filter(game => game.game == action.payload);
      
      return filteredGames;
    }, 
    [sortByDate.toString()]: ( state, action) => {
      const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      let arrCopy: Games[] = [...allGames];

      if(action.payload.game != 'all') {
        arrCopy = arrCopy.filter(game => game.game == action.payload);
      };

      if(action.payload.sortBy) {
        arrCopy.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
      } else {
        arrCopy.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
      }

      return arrCopy;
    }, 
    [sortByDuration.toString()]: ( state, action) => {
      const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      let arrCopy: Games[] = [...allGames];

      if(action.payload.game != 'all') {
        arrCopy = arrCopy.filter(game => game.game == action.payload);
      };

      if(action.payload.sortBy) {
        arrCopy.sort((a, b) => (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0));
      } else {
        arrCopy.sort((a, b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0));
      }

      return arrCopy;
    },
    [sortByTimeUser.toString()]: ( state, action) => {
      const allGames:Games[] = [...state];
      let newGamesArray: Games[] = [];

      for (const game of allGames) {
        game.team1.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
        game.team2.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game);
          };
        });
      };

      if(action.payload.game != 'all') {
        newGamesArray = newGamesArray.filter(game => game.game == action.payload.game);
      };

      if(action.payload.sortBy == 'date') {
        if(action.payload.sort) {
          newGamesArray = newGamesArray.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
        } else {
          newGamesArray = newGamesArray.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        };
      } else if(action.payload.sortBy == 'duration') {
          if(action.payload.sort) {
            newGamesArray = newGamesArray.sort((a, b) => (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0));
          } else {
            newGamesArray = newGamesArray.sort((a, b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0));
          };
      };

      if(action.payload.setting == 'last-ten') {
        newGamesArray = newGamesArray.slice(0, 10);
      } else if(action.payload.setting == 'no-win') {
        newGamesArray = newGamesArray.filter(game => game.win == '');
      };
      
      return newGamesArray;
    }
});

export { reducer, actions };