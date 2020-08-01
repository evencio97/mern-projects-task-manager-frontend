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

function Register({ addNotification }) {
    // App Context
    const appContext = useContext(AppContext);
    const { loading, setLoading, setUser } = appContext;

    const [registerData, setRegisterData] = useState(
        { name: '', lastname: '', email: '', password: '', confirmedPassword: '', showPasswords: false }
    );
    const {name, lastname, email, password, confirmedPassword, showPasswords} = registerData
    var passwordCheck = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    const initForm = (all=true) => {
        let aux = all? { name: '', lastname: '', email: '', password: '',
            confirmedPassword: '', showPasswords: false } :
            { ...registerData, password: '', confirmedPassword: '', showPasswords: false };
        setRegisterData( aux );
    }

    const checkSubmitData = (event) => {
        event.preventDefault();
        if (!(name.length && name.trim())) 
            return addNotification({ variant: 'error', message: "The name can't be empty." });
        if (!(lastname.length && lastname.trim())) 
            return addNotification({ variant: 'error', message: "The lastname can't be empty." });
        if (!(email.length && email.trim())) 
            return addNotification({ variant: 'error', message: "The email can't be empty." });
        if (!(password.length && passwordCheck.test(password)))
            return addNotification({ variant: 'error', message: "The password can't be empty or is invalid." });
        if (password !== confirmedPassword)
            return addNotification({ variant: 'error', message: "The passwords don't macth." });
        
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
    const valPasswordConfirmInput = value => {
        if (value.length === 0) return false;
        if (value !== password) return true;
        return false;
    }

    const onChangeForm = target => {
        setRegisterData( {...registerData, [target.name]: target.value} )
    }
    
    const mouseDownPassword = (event) => { event.preventDefault(); };
    const togglePassword = () => {
        setRegisterData({ ...registerData, showPasswords: !showPasswords })
    };

    return (
        <div className="user-form">
            <div className="form-container custom-shadow-dark animated fadeInDown text-center">
                <h1>Please enter your info</h1>
                <form className="text-left" id="registerForm" onSubmit={(e) => checkSubmitData(e)}>
                    <div className="form-field col-md-6">
                        <Input type="text" id="registerName" name="name" label="Enter your name" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={name} fullWidth />
                    </div>
                    <div className="form-field col-md-6">
                        <Input type="text" id="registerLastname" name="lastname" label="Enter your lastname" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={lastname} fullWidth />
                    </div>
                    <div className="form-field">
                        <Input type="email" id="registerEmail" name="email" label="Enter your email" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={email} fullWidth />
                    </div>
                    <div className="form-field">
                        <Input type={showPasswords? 'text':'password'} id="registerPassword" name="password" 
                            label="Enter your password" variant="outlined" setValue={onChangeForm} valValue={valPasswordInput}
                            className="" value={password} 
                            errorText="The password must have a minimum of 6 characters, a number and a capital letter." fullWidth
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={togglePassword}
                                            onMouseDown={mouseDownPassword} edge="end">
                                            {!showPasswords ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                    </div>
                    <div className="form-field">
                        <Input type={showPasswords? 'text':'password'} id="registerPasswordConfirmed" name="confirmedPassword" 
                            label="Confirm your password" variant="outlined" setValue={onChangeForm} valValue={valPasswordConfirmInput}
                            className="" value={confirmedPassword} 
                            errorText="Must be equal to your password." fullWidth
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={togglePassword}
                                            onMouseDown={mouseDownPassword} edge="end">
                                            {!showPasswords ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                    </div>
                    <div className="form-field">
                        <Button type="submit" id="registerSubmit" variant="contained" color="primary"
                            className="btn btn-primary btn-block" size="large">
                            Create account <i className="fas fa-check" style={{ color: "white", marginLeft: "10px" }}></i>
                        </Button>
                    </div>
                </form>
                <span className="new-account-text">Already have an account? Click here to <Link to={'login'}>login</Link></span>
                <LoadingSpinner loading={loading} />
            </div>
        </div>
    );
}

Register.propTypes = {
    addNotification: PropTypes.func.isRequired
}

export default Register;