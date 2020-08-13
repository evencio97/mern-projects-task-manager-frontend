import React, { useState, useContext, Fragment } from 'react'
import { Button } from '@material-ui/core';
import './NewProject.css';
import $ from 'jquery';
// Contexts
import AppContext from '../../context/app/AppContext';
import ProjectContext from '../../context/projects/ProjectContext';
import UserContext from '../../context/user/UserContext';
// Services
import { CreateProjectService } from '../../services/ProjectService';
// Components
import Input from '../input/Input';

const NewProject = () => {
    // Contexts
    const { setLoading, addNotification }= useContext(AppContext);
    const { token, checkSessionExpError }= useContext(UserContext);
    const { addProject }= useContext(ProjectContext);
    // Local States
    const [newProject, setNewProject] = useState({ name: '', show: false});

    const initForm = () => {
        setNewProject({ name: '', show: false});
        toggleNewProjectForm(false)
    }

    const checkNewProject = async (event) => {
        event.preventDefault();
        if (!(newProject.name.length && newProject.name.trim().length))
            return addNotification({ variant: 'error', message: "The name of the project can't be empty." });
        setLoading(true);
        // New project request
        let result= await CreateProjectService({ ...newProject, show: undefined }, token);
        setLoading(false);
        // Check error
        if (result.error){
            addNotification({ variant: 'error', message: result.errorCode });
            return checkSessionExpError(result.errorCode);
        }
        // Update state
        addProject(result.project);
        addNotification({ variant: 'success', message: "projectAdded" });
        // Init form
        initForm();
    };

    const valTextInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        return false;
    }
    const onChangeNewProject = target => {
        setNewProject( {...newProject, name: target.value} )
    }

    const toggleNewProjectForm = (show) => {
        if (show) $('#newProjectForm').slideDown()
        else $('#newProjectForm').slideUp()
        setNewProject({ ...newProject, show: show })
    }

    return (
        <Fragment>
            {!newProject.show?
                (<div className="flex-div">
                    <h2 className="sidebar-title-action">Add project</h2>
                    <Button id="addProjectButton" variant="contained" className="btn btn-primary btn-block sidebar-button-action animated fadeIn"
                        size="large" onClick={() => {toggleNewProjectForm(true)}}>
                        <i className="fas fa-plus" style={{ color: "white" }}></i>
                    </Button>
                </div>)
            :
                (<h2 id="addProjectTitle">Add project</h2>)
            }
            <form className="text-left new-project-form" id="newProjectForm" onSubmit={(e) => checkNewProject(e)}>
                <div className="form-field">
                    <Input type="text" id="newProjectName" name="projectName" label="Enter your project name" variant="outlined" 
                        setValue={onChangeNewProject} valValue={valTextInput} className="" value={newProject.name} fullWidth />
                </div>
                <div className="flex-div">
                    <Button type="submit" id="newProjectSubmit" variant="contained"
                        className="btn btn-primary btn-block mg-right" size="large">
                        Create <i className="fas fa-plus" style={{ color: "white", marginLeft: "10px" }}></i>
                    </Button>
                    <Button variant="contained" className="btn btn-danger btn-block" size="large"
                            onClick={() => {toggleNewProjectForm(false)}}>
                        Cancel <i className="fas fa-times" style={{ color: "white", marginLeft: "10px" }}></i>
                    </Button>
                </div>
            </form>
        </Fragment>
    );
}
 
export default NewProject;