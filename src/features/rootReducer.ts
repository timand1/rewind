import { combineReducers } from "redux";
// import { reducer as animalsReducer } from './animalReducer';
// import { reducer as adoptedListReducer } from './adoptedReducer';
import { reducer as userReducer } from './userReducer';
// import { reducer as chosenReducer } from './chosenReducer';

const rootReducer = combineReducers({
    // animals: animalsReducer,
    // adoptedList: adoptedListReducer,
    users: userReducer,
    // chosen: chosenReducer
});

export { rootReducer };