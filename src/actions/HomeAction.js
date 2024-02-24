import { GetApiRequest, PostApiRequest, DeleteApiRequest } from "../utils/services";
import {
    GET_TASK_LIST,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from "./Types";

export const getTaskListAction = (url) => {
    return async dispatch => {
        GetApiRequest({
            url: url,
            dispatch: dispatch,
            success: GET_TASK_LIST
        })
    };
};

export const addTaskAction = (url, body) => {
    return async dispatch => {
        PostApiRequest({
            url: url,
            body: body,
            dispatch: dispatch,
            success: ADD_TASK
        })
    };
};

export const deleteTaskAction = (url, body) => {
    return async dispatch => {
        DeleteApiRequest({
            url: url,
            body: body,
            dispatch: dispatch,
            success: DELETE_TASK
        })
    };
}