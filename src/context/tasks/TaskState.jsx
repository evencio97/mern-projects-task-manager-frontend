import React, { useReducer } from 'react';
import taskContext from './TaskContext';
import taskReducer from './TaskReducer';
import { SET_TASKS, SELECT_TASK, UPDATE_TASK, DELETE_TASK } from '../../types';

const TaskState = props => {
    const initialState = {
        tasks: [], 
        page: 1, 
        lastPage: 1, 
        total: 0,
        taskSelected: null
    }
    // Dispatch for exec actions
    const [state, dispatch] = useReducer(taskReducer, initialState);
    // Task
    const setTasksList = (data) => { 
        if (!(data && 'results' in data && 'page' in data && 'lastPage' in data && 'total' in data)) return false;
        dispatch({ 
            type: SET_TASKS,
            data: { tasks: data.results, page: data.page, lastPage: data.lastPage, total: data.total }
        });
        return true;
    }
    const addTask = (data) => {
        let aux= { tasks: [ data, ...state.tasks ], total: state.total+1 };
        dispatch({ type: SET_TASKS, data: aux });
    }
    const selectTask = (data) => { window.scrollTo(0, 0); dispatch({ type: SELECT_TASK, data: data }); }
    const updateTask = (data) => {
        if (!(state.taskSelected && state.taskSelected._id === data._id )) return false;
        let aux= [ ...state.tasks ];
        for (let element of aux) {
            if (element._id === state.taskSelected._id){ element= data; break; }
        }
        dispatch({ type: UPDATE_TASK, taskSelected: data, tasks: aux });
        return true;
    }
    const deleteTask = () => {
        if (!state.taskSelected) return false;
        let data= state.tasks.filter(element => element._id !== state.taskSelected._id);
        dispatch({ type: DELETE_TASK, data });
        return true;
    }

    return (
        <taskContext.Provider value={{
            tasks: state.tasks, page: state.page, 
            lastPage: state.lastPage, total: state.total,
            taskSelected: state.taskSelected,
            setTasksList,
            addTask,
            selectTask,
            updateTask,
            deleteTask,
        }}>
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;