import { GetApiRequest, PostApiRequest, PostApiRequestFileUpload } from "../utils/services";
import {
    SIGN_IN,
    SIGN_UP,
    RESET_PASSWORD,
    CHANGE_PASSWORD,
    GET_USER_DATA,
    UPDATE_USER_PROFILE
} from "./Types";

export const handleSingUpAction = (url, body) => {
    return async dispatch => {
        PostApiRequest({
            url: url,
            body: body,
            dispatch: dispatch,
            success: SIGN_UP
        })
    };
};


export const handleLoginAction = (url, body) => {
    return async dispatch => {
        PostApiRequest({
            url: url,
            body: body,
            dispatch: dispatch,
            success: SIGN_IN
        })
    };
};


export const handleResetAction = (url, body) => {
    return async dispatch => {
        PostApiRequest({
            url: url,
            body: body,
            dispatch: dispatch,
            success: RESET_PASSWORD
        })
    };
}

export const changePasswordAction = (url, body) => {
    return async dispatch => {
        PostApiRequest({
            url: url,
            body: body,
            dispatch: dispatch,
            success: CHANGE_PASSWORD
        })
    };
}

export const getUserDataAction = (url) => {
    return async dispatch => {
        GetApiRequest({
            url: url,
            dispatch: dispatch,
            success: GET_USER_DATA
        })
    };
}


export const updateUserProfile = (url, body) => {
    return async dispatch => {
        PostApiRequestFileUpload({
            url: url,
            body: body,
            dispatch: dispatch,
            success: UPDATE_USER_PROFILE
        })
    };
}