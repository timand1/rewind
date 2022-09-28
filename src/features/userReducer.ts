import { createAction, createReducer } from '@reduxjs/toolkit';
import { User, Games } from '../models/data';
const initialState : User[] = [];


const sortByWinRate = createAction<boolean>('Sort winrate');
const allUsers = createAction<string>('All user');
const sortByName = createAction<boolean>('Sort name');
const sortByWin = createAction<boolean>('Sort win');
const sortByLoss = createAction<boolean>('Sort loss');
const searchUser = createAction<string>('Search user');

const actions = { sortByWinRate, sortByName, sortByWin, sortByLoss, searchUser, allUsers };

const reducer = createReducer(initialState, {
    [sortByWinRate.toString()]: ( state, action) => {
        const arrCopy: User[] = [...state];
        if(action.payload) {
            arrCopy.sort((a, b) => (a.winRate > b.winRate) ? 1 : ((b.winRate > a.winRate) ? -1 : 0));
        } else {
            arrCopy.sort((a, b) => (a.winRate < b.winRate) ? 1 : ((b.winRate < a.winRate) ? -1 : 0));
        };

        return arrCopy;

    },
    [sortByName.toString()]: ( state, action) => {
        const arrCopy: User[] = [...state];
        if(action.payload) {
            arrCopy.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
        } else {
            arrCopy.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        };

        return arrCopy;
    },
    [sortByWin.toString()]: ( state, action) => {
        const arrCopy: User[] = [...state];
        if(action.payload) {
            arrCopy.sort((a, b) => (a.win > b.win) ? 1 : ((b.win > a.win) ? -1 : 0));
        } else {
            arrCopy.sort((a, b) => (a.win < b.win) ? 1 : ((b.win < a.win) ? -1 : 0));
        };

        return arrCopy;
    },
    [sortByLoss.toString()]: ( state, action) => {
        const arrCopy: User[] = [...state];
        if(action.payload) {
            arrCopy.sort((a, b) => (a.lost > b.lost) ? 1 : ((b.lost > a.lost) ? -1 : 0));
        } else {
            arrCopy.sort((a, b) => (a.lost < b.lost) ? 1 : ((b.lost < a.lost) ? -1 : 0));
        };

        return arrCopy;
    },
    [searchUser.toString()]: ( state, action) => {
        const arrCopy: User[] = [...state];
        
        const searchedUsers = arrCopy.filter(user => user.name.toLowerCase() == action.payload)
        
        return searchedUsers;
    },
    [allUsers.toString()]: ( state, action) => {
        const allGames:Games[] = JSON.parse(localStorage.getItem('games') || '');
        let arrCopy:Games[] = [...allGames];
        if(action.payload != 'all') {
            arrCopy = arrCopy.filter(game => game.game == action.payload);
        };
        
        const userList: Array<any> = [];
        
        for (const game of arrCopy) {         
            game.team1.forEach(player => {
                userList.push(Object.values(player)[0]);
            });
            game.team2.forEach(player => {
                userList.push(Object.values(player)[0]);
              });
        };
        const uniqueUsers = userList.filter((user, index) => userList.indexOf(user) === index);
        const userGameList: User[] = [];
        
        uniqueUsers.forEach(user => {
            const newGamesArray: Games[] = [];

            for (const game of arrCopy) {
                game.team1.forEach(player => {
                    if(Object.values(player).indexOf(user) > -1) {
                        newGamesArray.push(game);
                    };
                });
                game.team2.forEach(player => {
                    if(Object.values(player).indexOf(user) > -1) {
                        newGamesArray.push(game);                    
                    };
                });
            };
            const amountOfGames: number = newGamesArray.length;
            let win: number = 0;
            
            for (const game of newGamesArray) {
                game.team1.forEach(player => {
                  if(Object.values(player).indexOf(user) > -1 && game.win == 'team1') {
                    win = win + 1;
                  };
                })
                game.team2.forEach(player => {
                    if(Object.values(player).indexOf(user) > -1 && game.win == 'team2') {
                        win = win + 1;
                    };
                  });
            }  ; 
            const winRate: number = (win / amountOfGames ) * 100;

            const userObj: User = {
                name: user,
                win: win,
                lost: amountOfGames - win,
                amountOfGames: amountOfGames,
                winRate : parseInt(winRate.toFixed(1))
            };
            userGameList.push(userObj);
        });

        localStorage.setItem('users', JSON.stringify(userGameList));

        userGameList.sort((a, b) => (a.win < b.win) ? 1 : ((b.win < a.win) ? -1 : 0))
    
        return userGameList;        
    }
});

export { reducer, actions };