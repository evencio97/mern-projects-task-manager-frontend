import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import './Sidebar.css';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
// Services
import { LogoutService } from '../../services/UserService';
// Components
import NewProject from '../newProject/NewProject';
import ProjectsList from '../projectsList/ProjectsList';

const Sidebar = () => {
    // App Context
    const { setLoading, addNotification }= useContext(AppContext);
    // User Context
    const { user, token, logout }= useContext(UserContext);

    const logoutProcess= async () => {
        setLoading(true);
        // Logout request
        let result= await LogoutService(token);
        setLoading(false);
        // Check error
        if (result.error) return addNotification({ variant: 'error', message: result.errorCode });
        // Update state
        logout(token);
        addNotification({ variant: 'success', message: "logout" });
    }

    return ( 
        <aside className="animated fadeInLeft">
            <h1>MERN<span>Tasks</span></h1>
            { user && "name" in user? 
                (<div className="sidebar-section text-center">
                    <i className="fas fa-user-circle user-icon"></i>
                    <h2>Hi {user.name+" "+user.lastname}!</h2>
                    <Button variant="contained" className="btn btn-primary btn-block edit-profile" size="large">
                        Edit profile <i className="fas fa-edit" style={{ color: "white", marginLeft: "10px" }}></i>
                    </Button>
                </div>)
            :
                null
            }
            <div className="sidebar-section">
                <NewProject />
            </div>
            <div className="sidebar-section">
                <ProjectsList />
            </div>
            <div className="sidebar-section logout-button" onClick={()=>{logoutProcess()}}>
                <span><i className="fas fa-power-off mg-right"></i>Logout</span>
            </div>
        </aside>
    );
}
 
export default Sidebar;