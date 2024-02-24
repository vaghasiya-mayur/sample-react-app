import {
    GET_TASK_LIST,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from "../actions/Types";

const initialState = {
    taskList: null,
    addedTask: null,
    deleteTask: null
};


const HomeReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_LIST:
            return {
                ...state,
                taskList: action.payload,
            };
        case ADD_TASK:
            return {
                ...state,
                addedTask: action.payload,
            };
        case DELETE_TASK:
            return {
                ...state,
                deleteTask: action.payload,
            };
        default:
            return state;
    }
};

export default HomeReducers;