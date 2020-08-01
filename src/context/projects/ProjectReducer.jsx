import { SET_PROJECTS, SELECT_PROJECT, UPDATE_PROJECT,
    DELETE_PROJECT, SELECT_TASK, SET_PROJECT_TASKS } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SET_PROJECTS:
            return {...state, projectsList: action.data};
        case SELECT_PROJECT:
            return { ...state, projectSelected: action.data };
        case UPDATE_PROJECT:
            return { ...state, projectSelected: action.project, projectsList: action.projectsList };
        case DELETE_PROJECT:
            return { ...state, projectsList: action.data, projectSelected: null, taskSelected: null };
        case SELECT_TASK:
            return { ...state, taskSelected: action.data };
        case SET_PROJECT_TASKS:
            return { ...state, projectsList: action.projectsList, projectSelected: action.projectSelected };
        default:
            return state;
    }
}