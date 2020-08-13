import { INI_PROJECTS_STATE, SET_PROJECTS, SELECT_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case INI_PROJECTS_STATE:
            return { ...action.data };
        case SET_PROJECTS:
            return { ...state, ...action.data };
        case SELECT_PROJECT:
            return { ...state, projectSelected: action.data };
        case UPDATE_PROJECT:
            return { ...state, projectSelected: action.projectSelected, projects: action.projects };
        case DELETE_PROJECT:
            return { ...state, projects: action.data, projectSelected: null };
        default:
            return state;
    }
}