import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { Link } from 'react-router-dom'
import Input from '../input/Input';
import './Auth.css';

function Form({ loading, setLoading, setUser, addNotification }) {
    const [loginData, setLoginData] = useState({ email: '', password: '', showPassword: false });
    const { email, password, showPassword } = loginData

    const initForm = (email=true) => {
        let aux =  { email: '', password: '', showPassword: false };
        if (!email) aux.email = email
        setLoginData( aux );
    }

    const checkLoginData = (event) => {
        event.preventDefault();
        if (!(email && email.trim())) return addNotification({ variant: 'error', message: 'Please enter your account email.' });
        if (!(password.value && password.value.trim())) return addNotification({ variant: 'error', message: "The password can't be empty." });
        
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
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (value.length === 0) return false;
        if (value.trim().length === 0 || !re.test(value)) return true;
        return false;
    }
    const onChangeForm = target => {
        setLoginData( {...loginData, [target.name]: target.value} )
    }
    // const setPasswordValue = value => { setPassword({ value: value, show: password.show }); };
    
    const mouseDownPassword = (event) => { event.preventDefault(); };
    const togglePassword = () => { 
        // setPassword({ value: password.value, show: !password.show }); 
        setLoginData({ ...loginData, showPassword: !showPassword })
    };

    return (
        <div className="user-form">
            <div className="form-container custom-shadow-dark animated fadeInDown text-center">
                <h1>Please login to your account</h1>
                <form className="text-left" id="loginForm" onSubmit={(e) => checkLoginData(e)}>
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
                            Login <i className="fas fa-rocket" style={{ color: "white", marginLeft: "10px" }}></i>
                        </Button>
                    </div>
                </form>
                <span className="new-account-text">Don't have an account? Click here to <Link to={'register'} className="new-account-link">create an account</Link></span>
            </div>
            <LoadingSpinner loading={loading} />
        </div>
    );
}

Form.propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired
}

export default Form;