import React, { Fragment, useContext, useEffect } from 'react'
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import './ProjectsList.css';
// Contexts
import ProjectContext from '../../context/projects/ProjectContext';

const ProjectList = ({ addNotification }) => {
    // Project Context
    const projectContext = useContext(ProjectContext);
    const { projectsList, setProjectList, selectProject } = projectContext;

    const projectsListTemp = [
        {   _id: 1, name: 'Project 1',
        tasks: [
            {_id: 1, name:'Task 1', status: true}, {_id: 2, name:'Task 2', status: true},
            {_id: 3, name:'Task 3', status: false}, {_id: 4, name:'Task 4', status: true}
        ]
        },
        {   _id: 2, name: 'Project 2',
            tasks: [{_id: 1, name:'Task 1', status: false}, {_id: 2, name:'Task 2', status: false}]
        },
        { _id: 3, name: 'Project 3', tasks: [] }
    ];

    // Load of user projects
    useEffect(() => {
        getProjects();
    }, []);
    const getProjects = async () => {
        /*setLoading(true);
        let url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=" + tempCryptoData.currency;
        let result = await axios.get(url);
        // Hide Spinner
        setLoading(false);

        // Validate response
        if (result.status !== 200 || !result.data) 
            return addNotification({ variant: 'error', message: 'Please try again later.' });
        if (result.Message === "You are over your rate limit please upgrade your account!")
            return addNotification({ variant: 'error', message: 'Query limit has been reached, please try again later.' });
        let aux = result.data.Data;
        if (!Array.isArray(aux) || aux===0) 
            return addNotification({ variant: 'error', message: "Please try with a different currency." });
        
        let cryptosAux = [];
        aux.forEach(element => {
            cryptosAux.push({ value: element.CoinInfo.Name, label: element.CoinInfo.FullName})
        });
        setCryptosOptions(cryptosAux);*/
        setProjectList(projectsListTemp);
    }

    return (
        <Fragment>
            <div className="flex-div mg-bottom-md">
                <h2 className="sidebar-title-action">Your projects</h2>
                <Button variant="contained" className="btn btn-primary btn-block sidebar-button-action animated fadeIn"
                    size="large" onClick={() => { return true }}>
                    <i id="projectsListLoadingIcon" className="fas fa-sync-alt" style={{ color: "white" }}></i>
                </Button>
            </div>
            { projectsList.length?
                <ul className="projects-list">
                    {projectsList.map(project => {
                        return (
                            <li key={project._id} className="flex-div" onClick={() => { selectProject(project); }}>
                                <span className="mg-right">{project.name}</span>
                                <Button variant="contained" className="btn btn-primary btn-block sidebar-button-action" size="large" >
                                    <i className="fas fa-edit" style={{ color: "white" }}></i>
                                </Button>
                            </li>);
                    })}
                </ul>
            :
                <span>Your projects list is empty, please create a new project.</span>
            }
        </Fragment>
    );
}

ProjectList.propTypes = {
    addNotification: PropTypes.func.isRequired
}
 
export default ProjectList;