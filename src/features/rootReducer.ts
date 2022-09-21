import { combineReducers } from "redux";
import { reducer as userReducer } from './userReducer';
import { reducer as gameReducer } from './gameReducer';

const rootReducer = combineReducers({
    games: gameReducer,
    users: userReducer,
});

export { rootReducer };