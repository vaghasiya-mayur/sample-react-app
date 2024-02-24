import { SIGN_IN, SIGN_UP, RESET_PASSWORD, CHANGE_PASSWORD, GET_USER_DATA, UPDATE_USER_PROFILE } from "../actions/Types";

const initialState = {
    userData: null,
    resetUserData: null,
    changePassword: null
};


const AuthReducers = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            if (action.payload?.data) {
                localStorage.setItem("token", action.payload?.data?.authToken);
            }
            return {
                ...state,
                userData: action.payload,
            };
        case SIGN_IN:
            if (action.payload?.data) {
                localStorage.setItem("token", action.payload?.data?.authToken);
            }
            return {
                ...state,
                userData: action.payload,
            };
        case RESET_PASSWORD:
            return {
                ...state,
                resetUserData: action.payload,
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                changePassword: action.payload,
            };
        case GET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;
    }
};

export default AuthReducers;