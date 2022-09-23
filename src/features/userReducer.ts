import { createAction, createReducer } from '@reduxjs/toolkit';
import { User, Games } from '../models/data';

const initialState : User[] = JSON.parse(localStorage.getItem('users') || '');


const sortByWinRate = createAction('Sort winrate');
const allUsers = createAction('All user');
const sortByName = createAction('Sort name');
const sortByWin = createAction('Sort win');
const sortByLoss = createAction('Sort loss');
const searchUser = createAction<string>('Search user');
const getUser = createAction<string>('Get user');

const actions = { sortByWinRate, sortByName, sortByWin, sortByLoss, searchUser, allUsers };

const reducer = createReducer(initialState, {
    [sortByWinRate.toString()]: ( state, action) => {
        const arrCopy = [...state]
        arrCopy.sort((a, b) => (a.winRate < b.winRate) ? 1 : ((b.winRate < a.winRate) ? -1 : 0))

        return arrCopy;

    },
    [sortByName.toString()]: ( state, action) => {
        const arrCopy = [...state]
        arrCopy.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        return arrCopy;
    },
    [sortByWin.toString()]: ( state, action) => {
        const arrCopy = [...state]        
        arrCopy.sort((a, b) => (a.win < b.win) ? 1 : ((b.win < a.win) ? -1 : 0))

        return arrCopy;
    },
    [sortByLoss.toString()]: ( state, action) => {
        const arrCopy = [...state]
        arrCopy.sort((a, b) => (a.lost < b.lost) ? 1 : ((b.lost < a.lost) ? -1 : 0))

        return arrCopy;
    },
    [searchUser.toString()]: ( state, action) => {
        const arrCopy = [...state]
        const searchedUsers = arrCopy.filter(user => user.name.toLowerCase() == action.payload)
        
        return searchedUsers;
    },
    [allUsers.toString()]: ( state, action) => {
        const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
        const userList: Array<any> = []
        
        for (const game of allGames) {
            game.team1.forEach(player => {
                userList.push(Object.values(player)[0]);
            })
            game.team2.forEach(player => {
                userList.push(Object.values(player)[0]);
              })
        }
        const uniqueUsers = userList.filter((user, index) => userList.indexOf(user) === index)
        
        const gamesList:Games[] = JSON.parse(localStorage.getItem('games') || '');
        const userGameList:Array<User> = [];
        
        uniqueUsers.forEach(user => {
            const newGamesArray:Array<Games> = [];
            for (const game of gamesList) {
                game.team1.forEach(player => {
                if(Object.values(player).indexOf(user) > -1) {
                    newGamesArray.push(game)
                }
                })
                game.team2.forEach(player => {
                    if(Object.values(player).indexOf(user) > -1) {
                    newGamesArray.push(game)
                    
                    }
                })                 
            }            
            const amountOfGames = newGamesArray.length;
            let win: number = 0;
            
            for (const game of newGamesArray) {
                game.team1.forEach(player => {
                  if(Object.values(player).indexOf(user) > -1 && game.win == 'team1') {
                    win = win + 1;
                  }
                })
                game.team2.forEach(player => {
                    if(Object.values(player).indexOf(user) > -1 && game.win == 'team2') {
                        win = win + 1;
                    }
                  })
            }   
            const winRate = (win / amountOfGames ) * 100;

            const userObj = {
                name: user,
                win: win,
                lost: amountOfGames - win,
                amountOfGames: amountOfGames,
                winRate : parseInt(winRate.toFixed(1))
            }
            userGameList.push(userObj)
        })

        localStorage.setItem('users', JSON.stringify(userGameList));

    
        return userGameList;
        
    }
});

export { reducer, actions };