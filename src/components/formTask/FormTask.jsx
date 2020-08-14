import React, { useState, useContext, useEffect } from 'react'
import { Button } from '@material-ui/core';
import Input from '../input/Input';
import './FormTask.css';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
// Services
import { CreateTaskService, UpdateTaskService } from '../../services/TaskService';

const FormTask = () => {
    // Contexts
    const { setLoading, addNotification }= useContext(AppContext);
    const { token, checkSessionExpError }= useContext(UserContext);
    const { projectSelected }= useContext(ProjectContext);
    const { taskSelected, addTask, updateTask, selectTask }= useContext(TaskContext);
    // Local States
    const iniTaskTemp = {name:''}
    const [taskTemp, setTaskTemp] = useState(iniTaskTemp);
    
    useEffect(() => {
        if (taskSelected) setTaskTemp(taskSelected);
        else if (taskTemp !== iniTaskTemp) setTaskTemp(iniTaskTemp);
        // eslint-disable-next-line
    }, [taskSelected]);

    const checkFormTask = (event) => {
        event.preventDefault();
        if (!(taskTemp.name.length && taskTemp.name.trim().length))
            return addNotification({ variant: 'error', message: "The name of the task can't be empty." });
        // Check if new or update
        if (!taskSelected) makeCreateTask();
        else makeUpdateTask();
    };
    
    const makeCreateTask = async () => {
        setLoading(true);
        // Task update request
        let result= await CreateTaskService(projectSelected._id, taskTemp, token);
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        addTask(result.task);
        addNotification({ variant: 'success', message: "taskAdded" });
        // Init form
        setTaskTemp(iniTaskTemp);
    }

    const makeUpdateTask = async () => {
        setLoading(true);
        // Task update request
        let result= await UpdateTaskService(projectSelected._id, taskTemp._id, taskTemp, token);
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        updateTask(result.task);
        addNotification({ variant: 'success', message: "taskUpdated" });
        // Init form
        setTaskTemp(iniTaskTemp);
    }

    const valTextInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        return false;
    }
    const onChangeFormTask = target => {
        setTaskTemp( {...taskTemp, name: target.value} )
    }

    return (
        <div className="custom-form animated fadeIn">
            <form className="text-left" id="taskForm" onSubmit={(e) => checkFormTask(e)}>
                <div className="form-container">
                    <Input type="text" id="taskName" name="name" label="Enter your task name" variant="outlined" 
                        setValue={onChangeFormTask} valValue={valTextInput} className="mg-bottom-md"
                        value={taskTemp.name} fullWidth />
                    <div className="flex-div">
                        <Button type="submit" id="taskSubmit" variant="contained"
                            className="btn btn-primary btn-block mg-right" size="large">
                            {taskTemp._id? 'Update' : 'Create'} <i className="fas fa-plus" style={{ color: "white", marginLeft: "10px" }}></i>
                        </Button>
                        {taskTemp._id? 
                            <Button variant="contained" className="btn btn-danger btn-block animated fadeIn" size="large"
                                onClick={() => { selectTask(null) }}>
                                Cancel <i className="fas fa-times" style={{ color: "white", marginLeft: "10px" }}></i>
                            </Button>
                        : 
                            null
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormTask;