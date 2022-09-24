import { createAction, createReducer } from '@reduxjs/toolkit';
import { Games } from '../models/data';

// const initialState : Games[] = JSON.parse(localStorage.getItem('games') || '');
const initialState : Games[] = []

const addGame = createAction<Games>('Add game');
const setAllGames = createAction<Games[]>('Set all games');
const getUserGames = createAction<object>('Get user games');
const getAllGames = createAction('Get all games');
const filterUserGames = createAction<object>('Filter games');
const lastTen = createAction<object>('Get last 10 games');
const noWin = createAction<object>('Get no win user games');
const filteredGames = createAction<string>('Get matches filtered by game');
const sortByDate = createAction<string>('Sort games by date');
const sortByDuration = createAction<string>('Sort games by duration');
const sortByDurationUser = createAction<object>('Sort user games by duration');
const sortByDateUser = createAction<object>('Sort user games by date');

const actions = { addGame, setAllGames, getUserGames, getAllGames, filterUserGames, noWin, lastTen, filteredGames, sortByDate, sortByDuration, sortByDateUser, sortByDurationUser };

const reducer = createReducer(initialState, {
    [addGame.toString()]: ( state, action) => {
        const arrCopy: Games[] = [...state]
        arrCopy.push(action.payload)
        
        return arrCopy;
    },
    [setAllGames.toString()]: ( state, action) => {
      const gamesArr: Games[] = [...action.payload]
        gamesArr.sort(function(a,b) {
          return b.date.localeCompare(a.date);
        });

        localStorage.setItem('games', JSON.stringify(action.payload));
        state = [...action.payload]
        
        return state;
    },
    [getUserGames.toString()]: ( state, action ) => {
        const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
        let newGamesArray: Games[] = [];

        for (const game of allGames) {
          game.team1.forEach(player => {
            if(Object.values(player).indexOf(action.payload.username) > -1) {
              newGamesArray.push(game)
            }
          })
          game.team2.forEach(player => {
            if(Object.values(player).indexOf(action.payload.username) > -1) {
              newGamesArray.push(game)
            }
          })
        }    
        
        if(action.payload.game != 'all') {
          newGamesArray = newGamesArray.filter(game => game.game == action.payload.game)
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
    [filterUserGames.toString()]: ( state, action) => {
      let allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      const arrCopy: Games[] = [...allGames]
      let newGamesArray: Games[] = [];

      if(action.payload.setting == 'no-win') {
        allGames = arrCopy.filter(game => game.win == '')
        console.log(allGames);
        
      }

      for (const game of allGames) {
        game.team1.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game)
          }
        })
        game.team2.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game)
          }
        })
      } 
      
      let filteredGames: Games[] = newGamesArray.filter(game => game.game == action.payload.filter)
      
      if(action.payload.setting == 'last-ten') {        
        filteredGames = filteredGames.slice(0,10)
      }

      if(action.payload.filter == 'all') { 
        if(action.payload.setting == 'last-ten') {
          newGamesArray = newGamesArray.slice(0,10)
        }       
        return newGamesArray
      }
      
      return filteredGames;
    },
    [lastTen.toString()]: ( state, action ) => {
      let allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
      const arrCopy: Games[] = [...allGames]
      const newGamesArray: Games[] = [];

      if(action.payload.game != 'all') {
        allGames = arrCopy.filter(game => game.game == action.payload.game)        
      }

      for (const game of allGames) {
        game.team1.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game)
          }
        })
        game.team2.forEach(player => {
          if(Object.values(player).indexOf(action.payload.username) > -1) {
            newGamesArray.push(game)
          }
        })
      }       
      newGamesArray.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
      const slicedArr = newGamesArray.slice(0, 10);

      return slicedArr
  },
  [noWin.toString()]: ( state, action ) => {
    let allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
    const arrCopy: Games[] = [...allGames]
    const newGamesArray: Games[] = [];

    if(action.payload.game != 'all') {
      allGames = arrCopy.filter(game => game.game == action.payload.game)        
    }

    for (const game of allGames) {
      game.team1.forEach(player => {
        if(Object.values(player).indexOf(action.payload.username) > -1) {
          newGamesArray.push(game)
        }
      })
      game.team2.forEach(player => {
        if(Object.values(player).indexOf(action.payload.username) > -1) {
          newGamesArray.push(game)
        }
      })
    }     
    
    const noWinArr = newGamesArray.filter(game => game.win == '')
    
    return noWinArr
},
[filteredGames.toString()]: ( state, action) => {
  const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
  const newGamesArray: Games[] = [...allGames];

  const filteredGames: Games[] = newGamesArray.filter(game => game.game == action.payload)
  
  return filteredGames;
}, 
[sortByDate.toString()]: ( state, action) => {
  const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
  let arrCopy: Games[] = [...allGames];

  if(action.payload != 'all') {
    arrCopy = arrCopy.filter(game => game.game == action.payload)
  }
  
  arrCopy.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))

  return arrCopy;
}, 
[sortByDuration.toString()]: ( state, action) => {
  const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
  let arrCopy: Games[] = [...allGames];

  if(action.payload != 'all') {
    arrCopy = arrCopy.filter(game => game.game == action.payload)
  }
  
  arrCopy.sort((a, b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0))
  
  
  return arrCopy;
},
[sortByDateUser.toString()]: ( state, action) => {
  const allGames:Games[] = [...state]  
  let newGamesArray: Games[] = [];

  for (const game of allGames) {
    game.team1.forEach(player => {
      if(Object.values(player).indexOf(action.payload.username) > -1) {
        newGamesArray.push(game)
      }
    })
    game.team2.forEach(player => {
      if(Object.values(player).indexOf(action.payload.username) > -1) {
        newGamesArray.push(game)
      }
    })
  } 

  if(action.payload.game != 'all') {
    newGamesArray = newGamesArray.filter(game => game.game == action.payload.game)
  }

  let filteredGames: Games[] = newGamesArray.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))

  if(action.payload.setting == 'last-ten') {
    filteredGames = filteredGames.slice(0, 10)
  } else if(action.payload.setting == 'no-win') {
    filteredGames = filteredGames.filter(game => game.win == '')
  }
  
  return filteredGames;
},
[sortByDurationUser.toString()]: ( state, action) => {
  const allGames:Games[] = [...state]  
  let newGamesArray: Games[] = [];
  
  for (const game of allGames) {
    game.team1.forEach(player => {
      if(Object.values(player).indexOf(action.payload.username) > -1) {
        newGamesArray.push(game)
      }
    })
    game.team2.forEach(player => {
      if(Object.values(player).indexOf(action.payload.username) > -1) {
        newGamesArray.push(game)
      }
    })
  } 

  
  if(action.payload.game != 'all') {    
    newGamesArray = newGamesArray.filter(game => game.game == action.payload.game)
  }
  
  
  let filteredGames: Games[] = newGamesArray.sort((a, b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0))

  if(action.payload.setting == 'last-ten') {
    filteredGames = filteredGames.slice(0, 10)
  } else if(action.payload.setting == 'no-win') {
    filteredGames = filteredGames.filter(game => game.win == '')
  }
  
  return filteredGames;
}

});

export { reducer, actions };