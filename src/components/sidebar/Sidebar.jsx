import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import './Sidebar.css';
// Contexts
import AppContext from '../../context/app/AppContext';
// Components
import NewProject from '../newProject/NewProject';
import ProjectsList from '../projectsList/ProjectsList';

const Sidebar = ({ addNotification }) => {
    // App Context
    const appContext = useContext(AppContext);
    const { user } = appContext;

    return ( 
        <aside className="animated fadeInLeft">
            <h1>MERN<span>Tasks</span></h1>
            <div className="sidebar-section text-center">
                <i className="fas fa-user-circle user-icon"></i>
                <h2>Hi {user.name+" "+user.lastname}!</h2>
                <Button variant="contained" className="btn btn-primary btn-block edit-profile" size="large">
                    Edit profile <i className="fas fa-edit" style={{ color: "white", marginLeft: "10px" }}></i>
                </Button>
            </div>
            <div className="sidebar-section">
                <NewProject addNotification={addNotification} />
            </div>
            <div className="sidebar-section">
                <ProjectsList addNotification={addNotification} />
            </div>
            <div className="sidebar-section logout-button">
                <span><i className="fas fa-power-off mg-right"></i>Logout</span>
            </div>
        </aside>
    );
}

Sidebar.propTypes = {
    addNotification: PropTypes.func.isRequired
}
 
export default Sidebar;