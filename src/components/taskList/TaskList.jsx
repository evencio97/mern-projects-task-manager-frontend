import React, { useContext, useEffect } from 'react'
import { Button } from '@material-ui/core';
import './TaskList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
// Services
import { GetAllTaskService, UpdateTaskService, DeleteTaskService } from '../../services/TaskService';
import { DeleteProjectService } from '../../services/ProjectService';

const TaskList = () => {
    // Contexts
    const { setLoading, addNotification }= useContext(AppContext);
    const { token, checkSessionExpError }= useContext(UserContext);
    const { projectSelected, deleteProject }= useContext(ProjectContext);
    const { tasks, page, lastPage, iniTaskState, setTasksList, changeTaskStatus, deleteTask, selectTask }= useContext(TaskContext);
    
    const makeDeleteProject = async () => {
        setLoading(true);
        // Task delete request
        let result= await DeleteProjectService(projectSelected._id, token );
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        deleteProject();
        iniTaskState();
        addNotification({ variant: 'success', message: "projectDeleted" });
    }

    const makeDeleteTask = async (id) => {
        setLoading(true);
        // Task delete request
        let result= await DeleteTaskService(projectSelected._id, id, token );
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        deleteTask(id);
        addNotification({ variant: 'success', message: "taskDeleted" });
    }

    const toggleTaskStatus = async (task) => {
        // Toggle task status
        task.status = !task.status;
        setLoading(true);
        // Task update request
        let result= await UpdateTaskService(projectSelected._id, task._id, task, token);
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        changeTaskStatus(result.task);
        addNotification({ variant: 'success', message: "taskUpdated" });
    }

    // Load of projects tasks
    useEffect(() => {
        if (projectSelected) getTasks(1);
        // eslint-disable-next-line
    }, [projectSelected]);

    const getTasks = async (newPage, notify=false) => {
        if (newPage>lastPage) return addNotification({ variant: 'error', message: "noMoreTasks" });
        setLoading(true);
        // Projects request
        let result= await GetAllTaskService(projectSelected._id, token, newPage);
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        setTasksList(result.tasks, newPage>1);
        if (notify) addNotification({ variant: 'success', message: "tasksGet" });
    }

    return (
        <div className="task-container animated fadeIn text-center">
            <h2>Project: {projectSelected.name}</h2>
            { tasks.length?
                <ul className="task-list text-left">
                    <TransitionGroup>
                        {tasks.map(task => {
                            return (
                            <CSSTransition key={task._id} timeout={200} classNames="task">
                                <li className="task custom-shadow">
                                    <p>{task.name}</p>
                                    <div className="task-status">
                                        {task.status?
                                            <Button variant="contained" className="completed" size="large" 
                                                onClick={() => toggleTaskStatus(task)}>
                                                Completed
                                            </Button>
                                        :
                                            <Button variant="contained" className="incompleted" size="large"
                                                onClick={() => toggleTaskStatus(task)}>
                                                Incompleted
                                            </Button>
                                        }
                                    </div>
                                    <div className="actions">
                                        <Button variant="contained" className="btn btn-primary task-button-action" size="large"
                                            onClick={() => { selectTask(task) }}>
                                            <i className="fas fa-edit" style={{ color: "white" }}></i>
                                        </Button>
                                        <Button variant="contained" className="btn btn-secundary task-button-action delete" 
                                            size="large" onClick={() => { makeDeleteTask(task._id) }}>
                                            <i className="fas fa-trash-alt" style={{ color: "white" }}></i>
                                        </Button>
                                    </div>
                                </li>
                            </CSSTransition>);
                        })}
                    </TransitionGroup>
                    { page<lastPage?
                        <li className="text-center">
                            <Button variant="contained" className="btn btn-primary btn-block btn-action animated fadeIn"
                                size="large" onClick={() => { getTasks(page+1, true) }}>
                                <i className="fas fa-plus" style={{ color: "white" }}></i>
                            </Button>
                        </li>
                    : null }
                </ul>
            :
                <p>Your project's task list is empty, please create a task.</p>
            }
            <Button variant="contained" className="btn btn-danger mg-top-lg" size="large"
                onClick={() => { makeDeleteProject() }}>
                Delete project <i className="fas fa-trash-alt mg-left" style={{ color: "white" }}></i>
            </Button>
        </div>
    );
}

export default TaskList;