import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import './TaskList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Contexts
import AppContext from '../../context/app/AppContext';
import ProjectContext from '../../context/projects/ProjectContext';

const TaskList = ({ addNotification }) => {
    // Project Context
    const projectContext = useContext(ProjectContext);
    const { projectSelected, selectTask, deleteProject, setTask } = projectContext;
    // App Context
    const appContext = useContext(AppContext);
    const { setLoading } = appContext;
    
    // Toggle task status
    const toggleTaskStatus = task => {
        task.status = !task.status;
        setTask(task);
    }

    return (
        <div className="task-container animated fadeIn text-center">
            <h2>Project: {projectSelected.name}</h2>
            { projectSelected.tasks.length?
                <ul className="task-list text-left">
                    <TransitionGroup>
                        {projectSelected.tasks.map(task => {
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
                                        <Button variant="contained" className="btn btn-secundary task-button-action delete" size="large">
                                            <i className="fas fa-trash-alt" style={{ color: "white" }}></i>
                                        </Button>
                                    </div>
                                </li>
                            </CSSTransition>);
                        })}
                    </TransitionGroup>
                </ul>
            :
                <p>Your project's task list is empty, please create a task.</p>
            }
            <Button variant="contained" className="btn btn-danger mg-top-lg" size="large"
                onClick={() => { deleteProject() }}>
                Delete project <i className="fas fa-trash-alt mg-left" style={{ color: "white" }}></i>
            </Button>
        </div>
    );
}

TaskList.propTypes = {
    addNotification: PropTypes.func.isRequired
}
 
export default TaskList;