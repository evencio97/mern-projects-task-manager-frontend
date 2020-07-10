import React, { Fragment, useState, useEffect } from 'react';
// import 'mdbreact/dist/css/mdb.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//Components
import Footer from './components/footer/Footer';
// import Form from './components/form/Form';
// import Quote from './components/quote/Quote';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
    // User Data State
    const [user, setUser] = useState(null);
    // Loading State
    const [loading, setLoading] = useState(false);
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
        <Fragment>
            <Router>
                <Switch>
                    {/* <Route exact path="/" component={Dashboard} />
                    <Route exact path="/register" component={Register} /> */}
                    <Route exact path="/login" render={ (props) => 
                        <Login {...props} loading={loading} setLoading={setLoading} setUser={setUser} addNotification={addNotification} /> 
                    }/>
                </Switch>
            </Router>
            {/* <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 text-center animated fadeIn">
                        <img src={process.env.PUBLIC_URL + "cryptomonedas.png"} className="crypto-img" alt="cryptocurrency img" />
                    </div>
                    <div className="col-12 col-md-5 offset-md-1 animated fadeIn">
                        <h1>Instantly Quote Cryptocurrencies</h1>
                        <Form loading={loading} setLoading={setLoading} setCryptoData={setCryptoData} addNotification={addNotification} />
                        <Quote loading={loading} quote={quote} />
                    </div>
                </div>
            </div> */}
            {/* <Footer author={{ name: "Evencio Hernández", link: "https://evenciohernandez.com.ve" }} /> */}
        </Fragment>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={4} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <App />
        </SnackbarProvider>
    );
}