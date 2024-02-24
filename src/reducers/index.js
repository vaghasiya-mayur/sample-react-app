import { combineReducers } from 'redux';
import AuthReducers from "./AuthReducers";
import HomeReducers from "./HomeReducers";

const rootReducer = combineReducers({
    AuthReducer: AuthReducers,
    HomeReducer: HomeReducers
});

export default rootReducer;