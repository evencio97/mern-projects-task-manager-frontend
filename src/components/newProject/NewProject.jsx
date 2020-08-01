import React, { useState, useContext, Fragment } from 'react'
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import './NewProject.css';
import $ from 'jquery';
// Contexts
import AppContext from '../../context/app/AppContext';
import ProjectContext from '../../context/projects/ProjectContext';
// Components
import Input from '../input/Input';

const NewProject = ({ addNotification }) => {
    // Project Context
    const projectContext = useContext(ProjectContext);
    const { addProject } = projectContext;
    // App Context
    const appContext = useContext(AppContext);
    const { setLoading } = appContext;
    // Local States
    const [newProject, setNewProject] = useState({ name: '', show: false});
    
    const initForm = () => {
        setNewProject({ name: '', show: false});
        toggleNewProjectForm(false)
    }

    const checkNewProject = (event) => {
        event.preventDefault();
        if (!(newProject.name.length && newProject.name.trim().length))
            return addNotification({ variant: 'error', message: "The name of the project can't be empty." });
        
        requestAPI();
    };
        
    const requestAPI = async () => {
        // setLoading(true);
        // let url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=" + tempCryptoData.currency;
        // let result = await axios.get(url);
        // // Hide Spinner
        // setLoading(false);

        // // Validate response
        // if (result.status !== 200 || !result.data) 
        //     return addNotification({ variant: 'error', message: 'Please try again later.' });
        // if (result.Message === "You are over your rate limit please upgrade your account!")
        //     return addNotification({ variant: 'error', message: 'Query limit has been reached, please try again later.' });
        // let aux = result.data.Data;
        // if (!Array.isArray(aux) || aux===0) 
        //     return addNotification({ variant: 'error', message: "Please try with a different currency." });
        
        // let cryptosAux = [];
        // aux.forEach(element => {
        //     cryptosAux.push({ value: element.CoinInfo.Name, label: element.CoinInfo.FullName})
        // });
        // setCryptosOptions(cryptosAux);
        // addProject({name: newProject.name});
        initForm();
    }

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

NewProject.propTypes = {
    addNotification: PropTypes.func.isRequired
}
 
export default NewProject;