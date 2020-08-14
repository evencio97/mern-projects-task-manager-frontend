import React, { useState, useContext, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import './PrivateRoutes.css';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
// Services
import { CheckSessionService } from '../../services/UserService';

function PrivateRoutes({ component: Component, ...props }) {
    // Contexts
    const { addNotification }= useContext(AppContext);
    const { token, user, login, checkSessionExpError }= useContext(UserContext);
    const { iniProjectState }= useContext(ProjectContext);
    const { iniTaskState }= useContext(TaskContext);
    // Local state
    const [checkingSession, setCheckingSession] = useState(true);

    const checkSession= async () => {
        // Check session request
        let result= await CheckSessionService(token);
        // Check error
        if (result.error){
            checkSessionExpError(result.errorCode);
            addNotification({ variant: 'error', message: result.errorCode });
            return false;
        }
        login(result.user, result.token);
        return true;
    }
    
    const callForCheckSession= async () => {
        await checkSession();
        setCheckingSession(false);
    }
    // Check session when firts open app
    useEffect(() => {
        if (!user){
            callForCheckSession();
            return;
        } 
        setCheckingSession(false);
        // eslint-disable-next-line
    }, []);
    // Observate token
    useEffect(() => {
        if (!checkingSession && (!token || token===null || token===undefined)){
            // Init contexts if session has been close
            iniTaskState();
            iniProjectState();
        } 
        // eslint-disable-next-line
    }, [token]);

    return (
        <Route {...props} render={ props => {
            if (!checkingSession)
                return token && token!==undefined? (<Component {...props} />):(<Redirect to="/login"/>);
            else
                return (
                    <div className="loading-pulse">
                        <img src="/loading-pulse-200px.svg" alt="loading pulse"/>
                    </div>
                );
        }}/>
    );
}

export default PrivateRoutes;