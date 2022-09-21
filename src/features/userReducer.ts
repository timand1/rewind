import { createAction, createReducer } from '@reduxjs/toolkit';
import { User } from '../models/data';
import jsonData from '../data/data.json';

const initialState : User[] = jsonData.users;

// const initialState : User = {name: '', win: 0, lost: 0, userId: ''};

const addUser = createAction<User>('Add user');
const allUsers = createAction('All user');
const sortByName = createAction('Sort name');
const sortByWin = createAction('Sort win');
const sortByLoss = createAction('Sort loss');
const searchUser = createAction<string>('Search user');

const actions = { addUser, sortByName, sortByWin, sortByLoss, searchUser, allUsers };

const reducer = createReducer(initialState, {
    [addUser.toString()]: ( state, action) => {
        const arrCopy = [...state]
        arrCopy.push(action.payload)

        return arrCopy;
    },
    [sortByName.toString()]: ( state, action) => {
        const arrCopy = [...initialState]
        arrCopy.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        return arrCopy;
    },
    [sortByWin.toString()]: ( state, action) => {
        const arrCopy = [...initialState]
        arrCopy.sort((a, b) => (a.win < b.win) ? 1 : ((b.win < a.win) ? -1 : 0))

        return arrCopy;
    },
    [sortByLoss.toString()]: ( state, action) => {
        const arrCopy = [...initialState]
        arrCopy.sort((a, b) => (a.lost < b.lost) ? 1 : ((b.lost < a.lost) ? -1 : 0))

        return arrCopy;
    },
    [searchUser.toString()]: ( state, action) => {
        const arrCopy = [...initialState]
        const searchedUsers = arrCopy.filter(user => user.name.toLowerCase() == action.payload)
        
        return searchedUsers;
    },
    [allUsers.toString()]: ( state, action) => {
        const arrCopy = [...initialState]
        
        return arrCopy;
    }
});

export { reducer, actions };