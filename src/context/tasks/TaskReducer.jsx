import { SET_TASKS, SELECT_TASK, UPDATE_TASK, DELETE_TASK } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, ...action.data };
        case SELECT_TASK:
            return { ...state, taskSelected: action.data };
        case UPDATE_TASK:
            return { ...state, taskSelected: action.taskSelected, tasks: action.tasks };
        case DELETE_TASK:
            return { ...state, tasks: action.data, taskSelected: null };
        default:
            return state;
    }
}