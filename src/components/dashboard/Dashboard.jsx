import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './Dashboard.css';
// Contexts
import ProjectContext from '../../context/projects/ProjectContext';
import AppContext from '../../context/app/AppContext';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Sidebar from '../sidebar/Sidebar';
import FormTask from '../formTask/FormTask';
import TaskList from '../taskList/TaskList';

function Dashboard({ addNotification }) {
    // Project Context
    const projectContext = useContext(ProjectContext);
    const { projectSelected } = projectContext;
    // App Context
    const appContext = useContext(AppContext);
    const { loading } = appContext;
    
    $('#dashboardMain').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        $('#dashboardMain').removeClass(['animated', 'fadeIn']);
    });

    useEffect(() => {
        if (!projectSelected) return;
        $('#dashboardMain').addClass(['animated', 'fadeIn']);
    }, [projectSelected]);

    return (
        <div className="app-container">
            <Sidebar addNotification={addNotification} />
            <div className="main-section">
                <main className="animated fadeIn" id="dashboardMain">
                    { projectSelected?
                        <Fragment>
                            <FormTask addNotification={addNotification} />
                            <TaskList addNotification={addNotification} />
                        </Fragment>
                    :
                        <div className="task-container text-center">
                            <h2>No Project Selected</h2>
                            <p>Please select a project in the sidebar proyects list.</p>
                        </div>
                    }
                </main>
            </div>
            <LoadingSpinner loading={loading} />
        </div>
    );
}

Dashboard.propTypes = {
    addNotification: PropTypes.func.isRequired
}

export default Dashboard;