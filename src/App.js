import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// States
import AppState from './context/app/AppState';
import UserState from './context/user/UserState';
import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/TaskState';
//Components
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import SessionControl from './components/auth/SessionControl';
import PrivateRoutes from './components/routes/PrivateRoutes';

function App() {
    return (
        <AppState>
            <UserState>
                <ProjectState>
                    <TaskState>
                        <Router>
                            <Switch>
                                <PrivateRoutes exact path="/" component={Dashboard}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/login" component={Login}/>
                            </Switch>
                        </Router>
                        <Footer author={{ name: "Evencio Hernández", link: "https://evenciohernandez.com.ve" }} />
                    </TaskState>
                </ProjectState>
            </UserState>
        </AppState>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={4} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <App />
        </SnackbarProvider>
    );
}