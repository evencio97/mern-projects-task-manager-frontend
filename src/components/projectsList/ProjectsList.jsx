import React, { Fragment, useContext, useEffect } from 'react'
import { Button } from '@material-ui/core';
import './ProjectsList.css';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import ProjectContext from '../../context/projects/ProjectContext';
// Services
import { GetAllProjectsService } from '../../services/ProjectService';

const ProjectList = () => {
    // Contexts
    const { setLoading, addNotification }= useContext(AppContext);
    const { token, checkSessionExpError }= useContext(UserContext);
    const { projects, page, lastPage, setProjectList, selectProject }= useContext(ProjectContext);

    // Load of user projects
    useEffect(() => {
        getProjects(1);
        // eslint-disable-next-line
    }, []);
    
    const getProjects = async (newPage, notify=false) => {
        if (newPage>lastPage) return addNotification({ variant: 'error', message: "noMoreProjects" });
        setLoading(true);
        // Projects request
        let result= await GetAllProjectsService(token, newPage);
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        setProjectList(result.projects, newPage>1);
        if (notify) addNotification({ variant: 'success', message: "projectsGet" });
    }

    return (
        <Fragment>
            <div className="flex-div mg-bottom-md">
                <h2 className="sidebar-title-action">Your projects</h2>
                <Button variant="contained" className="btn btn-primary btn-block sidebar-button-action animated fadeIn"
                    size="large" onClick={() => { getProjects(1, true) }}>
                    <i id="projectsListLoadingIcon" className="fas fa-sync-alt" style={{ color: "white" }}></i>
                </Button>
            </div>
            { projects.length?
                <ul className="projects-list">
                    {projects.map(project => {
                        return (
                            <li key={project._id} className="flex-div" onClick={() => { selectProject(project); }}>
                                <span className="mg-right">{project.name}</span>
                                <Button variant="contained" className="btn btn-primary btn-block sidebar-button-action" size="large" >
                                    <i className="fas fa-edit" style={{ color: "white" }}></i>
                                </Button>
                            </li>);
                    })}
                    { page<lastPage?
                        <li className="text-center">
                            <Button variant="contained" className="btn btn-primary btn-block btn-action animated fadeIn"
                                size="large" onClick={() => { getProjects(page+1, true) }}>
                                <i className="fas fa-plus" style={{ color: "white" }}></i>
                            </Button>
                        </li>
                    : null }
                </ul>
            :
                <span>Your projects list is empty, please create a new project.</span>
            }
        </Fragment>
    );
}
 
export default ProjectList;