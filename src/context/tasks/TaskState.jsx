import React, { useReducer } from 'react';
import taskContext from './TaskContext';
import taskReducer from './TaskReducer';
import { INI_TASKS_STATE, SET_TASKS, SELECT_TASK, UPDATE_TASK, CHANGE_TASK_STATUS, DELETE_TASK } from '../../types';

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
    const iniTaskState = () => { 
        dispatch({ type: INI_TASKS_STATE, data: initialState });
        return true;
    }
    const setTasksList = (data, concat=false) => { 
        if (!(data && 'results' in data && 'page' in data && 'lastPage' in data && 'total' in data)) return false;
        dispatch({ 
            type: SET_TASKS,
            data: { tasks: concat? state.tasks.concat(data.results):data.results,
                page: data.page, lastPage: data.lastPage, total: data.total }
        });
        return true;
    }
    const addTask = (data) => {
        let aux= { tasks: [ data, ...state.tasks ], total: state.total+1 };
        dispatch({ type: SET_TASKS, data: aux });
    }
    const selectTask = (data) => { window.scrollTo(0, 0); dispatch({ type: SELECT_TASK, data: data }); }
    const updateTask = (data) => {
        if (!state.taskSelected) return false; 
        let aux= [ ...state.tasks ];
        for (let index = 0; index < aux.length; index++) {
            if (aux[index]._id === state.taskSelected._id){ aux[index]= data; break; }
        }
        dispatch({ type: UPDATE_TASK, tasks: aux });
        return true;
    }
    const changeTaskStatus = (data) => { 
        let aux= [ ...state.tasks ];
        for (let index = 0; index < aux.length; index++) {
            if (aux[index]._id === data._id){ aux[index]= data; break; }
        }
        dispatch({ type: CHANGE_TASK_STATUS, tasks: aux });
        return true;
    }
    const deleteTask = (id) => {
        let data= state.tasks.filter(element => element._id !== id);
        dispatch({ type: DELETE_TASK, data });
        return true;
    }

    return (
        <taskContext.Provider value={{
            tasks: state.tasks, page: state.page, 
            lastPage: state.lastPage, total: state.total,
            taskSelected: state.taskSelected,
            iniTaskState,
            setTasksList,
            addTask,
            selectTask,
            updateTask,
            changeTaskStatus,
            deleteTask,
        }}>
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;