import { INI_TASKS_STATE, SET_TASKS, SELECT_TASK, UPDATE_TASK, CHANGE_TASK_STATUS, DELETE_TASK } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case INI_TASKS_STATE:
            return { ...action.data };
        case SET_TASKS:
            return { ...state, ...action.data };
        case SELECT_TASK:
            return { ...state, taskSelected: action.data };
        case UPDATE_TASK:
            return { ...state, taskSelected: null, tasks: action.tasks };
        case CHANGE_TASK_STATUS:
            return { ...state, tasks: action.tasks };
        case DELETE_TASK:
            return { ...state, tasks: action.data, taskSelected: null };
        default:
            return state;
    }
}