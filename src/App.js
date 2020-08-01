import React, { Fragment, useState, useEffect } from 'react';
// import 'mdbreact/dist/css/mdb.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// States
import ProjectState from './context/projects/ProjectState';
import AppState from './context/app/AppState';
//Components
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
    // Notifications State
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const addNotification = ({ variant="default", message, duration=6000 }) => {
        // { variant: '', message: '', duration: }
        // default, success, error, warning, info
        if (!message || !message.trim()) return;
        const action = key => (
            <Fragment><Button onClick={() => { closeSnackbar(key) }}>
                <i className="fas fa-times" style={{ color: "white" }}></i>
            </Button></Fragment>
        );
        enqueueSnackbar( message, { variant: variant, autoHideDuration: duration, action } );
    };

    /*useEffect(() => {
        if (!cryptoData || !cryptoData.currency.trim() || !cryptoData.crypto.trim()) return;
        setQuote(undefined);
        setLoading(true);
        requestAPI();
    }, [cryptoData]);

    const requestAPI = async () => {
        let url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+cryptoData.crypto+"&tsyms="+cryptoData.currency;
        let result = await axios.get(url);
        // Hide Spinner
        setLoading(false);

        // Validate response
        if (result.status !== 200 || !result.data) 
            return addNotification({ variant: 'error', message: 'Please try again later.' });
        if (result.Message === "You are over your rate limit please upgrade your account!")
            return addNotification({ variant: 'error', message: 'Query limit has been reached, please try again later.' });
        let aux = result.data;
        if (!(aux && aux.DISPLAY && aux.DISPLAY[cryptoData.crypto][cryptoData.currency] )) 
            return addNotification({ variant: 'error', message: "An error has occurred, please try again." });
        setQuote({ ...aux.DISPLAY[cryptoData.crypto][cryptoData.currency], cryptoName: cryptoData.cryptoName });
    }*/

    return (
        <AppState>
            <ProjectState>
                <Router>
                    <Switch>
                        <Route exact path="/" render={ (props) => 
                            <Dashboard {...props} addNotification={addNotification} /> 
                        }/>
                        <Route exact path="/register" render={ (props) => 
                            <Register {...props} addNotification={addNotification} /> 
                        }/>
                        <Route exact path="/login" render={ (props) => 
                            <Login {...props} addNotification={addNotification} /> 
                        }/>
                    </Switch>
                </Router>
                <Footer author={{ name: "Evencio Hernández", link: "https://evenciohernandez.com.ve" }} />
            </ProjectState>
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