import React, { useState, useContext, useEffect } from 'react'
import { Button } from '@material-ui/core';
import Input from '../input/Input';
import PropTypes from 'prop-types';
import './FormTask.css';
// Contexts
import AppContext from '../../context/app/AppContext';
import ProjectContext from '../../context/projects/ProjectContext';

const FormTask = ({ addNotification }) => {
    // Project Context
    const projectContext = useContext(ProjectContext);
    const { taskSelected, selectTask } = projectContext;
    // App Context
    const appContext = useContext(AppContext);
    const { setLoading } = appContext;
    // Local States
    const initTaskState = {name:''}
    const [taskTemp, setTaskTemp] = useState(initTaskState);
    
    useEffect(() => {
        if (taskSelected) setTaskTemp(taskSelected);
        else if (taskTemp !== initTaskState) setTaskTemp(initTaskState);
    }, [taskSelected]);

    const checkFormTask = (event) => {
        event.preventDefault();
        if (!(taskTemp.name.length && taskTemp.name.trim().length))
            return addNotification({ variant: 'error', message: "The name of the task can't be empty." });
        
        // requestAPI();
    };
        
    /*const requestAPI = async () => {
        setLoading(true);
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
    const onChangeFormTask = target => {
        setTaskTemp( {...taskTemp, name: target.value} )
    }

    return (
        <div className="custom-form animated fadeIn">
            <form className="text-left" id="taskForm" onSubmit={(e) => checkFormTask(e)}>
                <div className="form-container">
                    <Input type="text" id="taskName" name="name" label="Enter your task name" variant="outlined" 
                        setValue={onChangeFormTask} valValue={valTextInput} className="mg-bottom-md"
                        value={taskTemp.name} fullWidth />
                    <div className="flex-div">
                        <Button type="submit" id="taskSubmit" variant="contained"
                            className="btn btn-primary btn-block mg-right" size="large">
                            {taskTemp._id? 'Update' : 'Create'} <i className="fas fa-plus" style={{ color: "white", marginLeft: "10px" }}></i>
                        </Button>
                        {taskTemp._id? 
                            <Button variant="contained" className="btn btn-danger btn-block animated fadeIn" size="large"
                                onClick={() => { selectTask(null) }}>
                                Cancel <i className="fas fa-times" style={{ color: "white", marginLeft: "10px" }}></i>
                            </Button>
                        : 
                            null
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}

FormTask.propTypes = {
    addNotification: PropTypes.func.isRequired
}
 
export default FormTask;