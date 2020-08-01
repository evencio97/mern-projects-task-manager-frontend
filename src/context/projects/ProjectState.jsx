import React, { useReducer } from 'react';
import projectContext from './ProjectContext';
import projectReducer from './ProjectReducer';
import { SET_PROJECTS, SELECT_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, 
    SELECT_TASK, SET_PROJECT_TASKS } from '../../types';

const ProjectState = props => {
    const initialState = {
        projectsList: [],
        projectSelected: null,
        taskSelected: null
    }
    // Dispatch for exec actions
    const [state, dispatch] = useReducer(projectReducer, initialState);
    // Project
    const setProjectList = (data) => { dispatch({ type: SET_PROJECTS, data: data }); }
    const addProject = (data) => {
        let aux = [ ...state.projectsList, data ]
        dispatch({ type: SET_PROJECTS, data: aux });
    }
    const selectProject = (data) => { window.scrollTo(0, 0); dispatch({ type: SELECT_PROJECT, data: data }); }
    const updateProject = (data) => {
        if (!state.projectSelected) return;
        let aux = [ ...state.projectsList.filter(element => element._id !== state.projectSelected._id), data ]
        dispatch({ type: UPDATE_PROJECT, project: data, projectsList: aux });
    }
    const deleteProject = () => {
        if (!state.projectSelected) return;
        let aux = state.projectsList.filter(element => element._id !== state.projectSelected._id)
        dispatch({ type: DELETE_PROJECT, data: aux });
    }
    // Task
    const selectTask = (data) => { window.scrollTo(0, 0); dispatch({ type: SELECT_TASK, data: data }) }
    const setProjectTasks = (data) => {
        if (!state.projectSelected) return;
        let projectTemp = { ...state.projectSelected, tasks: data};
        dispatch({ 
            type: SET_PROJECT_TASKS, 
            projectsList: [ 
                ...state.projectsList.filter(element => element._id !== state.projectSelected._id), projectTemp
            ],
            projectSelected: projectTemp 
        });
    }
    const setTask = (data) => {
        if (!state.projectSelected || !state.projectSelected.tasks.length) return;
        let projectTemp = state.projectSelected;
        projectTemp.tasks.forEach(task => {
            if (task._id === data._id) task = data;
        });
        dispatch({ 
            type: SET_PROJECT_TASKS, 
            projectsList: [ 
                ...state.projectsList.filter(element => element._id !== state.projectSelected._id), projectTemp
            ],
            projectSelected: projectTemp
        });
    }

    return (
        <projectContext.Provider value={{
            projectsList: state.projectsList,
            projectSelected: state.projectSelected,
            taskSelected: state.taskSelected,
            setProjectList,
            addProject,
            selectProject,
            updateProject,
            deleteProject,
            selectTask,
            setProjectTasks,
            setTask
        }}>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;