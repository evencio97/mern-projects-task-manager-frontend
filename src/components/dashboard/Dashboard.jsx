import React, { useContext, useEffect, Fragment } from 'react';
import $ from 'jquery';
import './Dashboard.css';
// Contexts
import AppContext from '../../context/app/AppContext';
import ProjectContext from '../../context/projects/ProjectContext';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Sidebar from '../sidebar/Sidebar';
import FormTask from '../formTask/FormTask';
import TaskList from '../taskList/TaskList';

function Dashboard() {
    // Contexts
    const { loading }= useContext(AppContext);
    const { projectSelected }= useContext(ProjectContext);

    $('#dashboardMain').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        $('#dashboardMain').removeClass(['animated', 'fadeIn']);
    });
    
    useEffect(() => {
        if (!projectSelected) return;
        $('#dashboardMain').addClass(['animated', 'fadeIn']);
    }, [projectSelected]);
    
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-section">
                <main className="animated fadeIn" id="dashboardMain">
                    { projectSelected?
                        <Fragment>
                            <FormTask />
                            <TaskList />
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

export default Dashboard;