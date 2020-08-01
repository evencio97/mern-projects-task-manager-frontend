import React, { useState, useContext } from 'react';
import { Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { Link } from 'react-router-dom'
import './Auth.css';
// Contexts
import AppContext from '../../context/app/AppContext';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Input from '../input/Input';

function Login({ addNotification }) {
    // App Context
    const appContext = useContext(AppContext);
    const { loading, setLoading, setUser } = appContext;

    const [loginData, setLoginData] = useState({ email: '', password: '', showPassword: false });
    const { email, password, showPassword } = loginData
    var passwordCheck = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    const initForm = (email=true) => {
        let aux =  { email: '', password: '', showPassword: false };
        if (!email) aux.email = email
        setLoginData( aux );
    }

    const checkSubmitData = (event) => {
        event.preventDefault();
        if (!(email.length && email.trim().length))
            return addNotification({ variant: 'error', message: "The email can't be empty." });
        if (!(password.length && passwordCheck.test(password)))
            return addNotification({ variant: 'error', message: "The password can't be empty or is invalid." });
        
        setLoading(true);
        // requestAPI();
    };
    
    /*const requestAPI = async () => {
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
        setCryptosOptions(cryptosAux);
        initForm();
    }*/

    const valTextInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        return false;
    }
    const valPasswordInput = value => {
        // var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (value.length === 0) return false;
        if (value.trim().length === 0 || !passwordCheck.test(value)) return true;
        return false;
    }
    const onChangeForm = target => {
        setLoginData( {...loginData, [target.name]: target.value} )
    }
    
    const mouseDownPassword = (event) => { event.preventDefault(); };
    const togglePassword = () => {
        setLoginData({ ...loginData, showPassword: !showPassword })
    };

    return (
        <div className="user-form">
            <div className="form-container custom-shadow-dark animated fadeInDown text-center">
                <h1>Please login to your account</h1>
                <form className="text-left" id="loginForm" onSubmit={(e) => checkSubmitData(e)}>
                    <div className="form-field">
                        <Input type="email" id="loginEmail" name="email" label="Enter your email" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={email} fullWidth />
                    </div>
                    <div className="form-field">
                        <Input type={showPassword? 'text':'password'} id="loginPassword" name="password" 
                            label="Enter your password" variant="outlined" setValue={onChangeForm} valValue={valPasswordInput}
                            className="" value={password} 
                            errorText="The password must have a minimum of 6 characters, a number and a capital letter" fullWidth
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={togglePassword}
                                            onMouseDown={mouseDownPassword} edge="end">
                                            {!showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                    </div>
                    <div className="form-field">
                        <Button type="submit" id="loginSubmit" variant="contained" color="primary"
                            className="btn btn-primary btn-block" size="large">
                            Login <i className="fas fa-check" style={{ color: "white", marginLeft: "10px" }}></i>
                        </Button>
                    </div>
                </form>
                <span className="new-account-text">Don't have an account? Click here to <Link to={'register'}>create an account</Link></span>
                <LoadingSpinner loading={loading} />
            </div>
        </div>
    );
}

Login.propTypes = {
    addNotification: PropTypes.func.isRequired
}

export default Login;