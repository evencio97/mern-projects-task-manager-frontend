import React, { useReducer } from 'react';
import projectContext from './ProjectContext';
import projectReducer from './ProjectReducer';
import { INI_PROJECTS_STATE, SET_PROJECTS, SELECT_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from '../../types';

const ProjectState = props => {
    const initialState = {
        projects: [], 
        page: 1, 
        lastPage: 1, 
        total: 0,
        projectSelected: null
    }
    // Dispatch for exec actions
    const [state, dispatch] = useReducer(projectReducer, initialState);
    // Project
    const iniProjectState = () => { 
        dispatch({ type: INI_PROJECTS_STATE, data: initialState });
        return true;
    }
    const setProjectList = (data, concat=false) => { 
        if (!(data && 'results' in data && 'page' in data && 'lastPage' in data && 'total' in data)) return false;
        dispatch({ 
            type: SET_PROJECTS, 
            data: { projects: concat? state.projects.concat(data.results):data.results, 
                page: data.page, lastPage: data.lastPage, total: data.total }
        });
        return true;
    }
    const addProject = (data) => {
        let aux= { projects: [ data, ...state.projects ], total: state.total+1 };
        dispatch({ type: SET_PROJECTS, data: aux });
    }
    const selectProject = (data) => { window.scrollTo(0, 0); dispatch({ type: SELECT_PROJECT, data: data }); }
    const updateProject = (data) => {
        if (!(state.projectSelected && state.projectSelected._id === data._id )) return false;
        let aux= [ ...state.projects ];
        for (let element of aux) {
            if (element._id === state.projectSelected._id){ element= data; break; }
        }
        dispatch({ type: UPDATE_PROJECT, projectSelected: data, projects: aux });
        return true;
    }
    const deleteProject = () => {
        if (!state.projectSelected) return false;
        let data= state.projects.filter(element => element._id !== state.projectSelected._id);
        dispatch({ type: DELETE_PROJECT, data });
        return true;
    }

    return (
        <projectContext.Provider value={{
            projects: state.projects, page: state.page, 
            lastPage: state.lastPage, total: state.total,
            projectSelected: state.projectSelected,
            iniProjectState,
            setProjectList,
            addProject,
            selectProject,
            updateProject,
            deleteProject,
        }}>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;