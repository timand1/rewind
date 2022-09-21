import { createAction, createReducer } from '@reduxjs/toolkit';
import { User } from '../models/data';
import jsonData from '../data/data.json';

const initialState : User[] = jsonData.users;

// const initialState : User = {name: '', win: 0, lost: 0, userId: ''};

const addUser = createAction<User>('Add user');

const actions = { addUser };

const reducer = createReducer(initialState, {
    [addUser.toString()]: ( state, action) => {
        const arrCopy = [...state]
        arrCopy.push(action.payload)

        return arrCopy;
    }
});

export { reducer, actions };