import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Input from '../input/Input';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Form.css';

function Form({ loading, setLoading, setCryptoData, addNotification }) {
    const [tempCryptoData, setTempCryptoData] = useState({ currency: '', crypto: '' });
    const [cryptosOptions, setCryptosOptions] = useState([]);
    const currencies = [
        {value: 'USD', label: "Dollar ($ USD)"},
        {value: 'EUR', label: "Euro (€)"},
        {value: 'GBP', label: "Sterling (£)"},
    ];
    
    useEffect(() => {
        if (!tempCryptoData.currency || !tempCryptoData.currency.trim()) return;
        setLoading(true);
        requestAPI();
    }, [tempCryptoData.currency]);

    const requestAPI = async () => {
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
    }
    
    const initForm = () => {
        setTempCryptoData({ currency: '', crypto: '' });
        setCryptosOptions([]);
    }
        
    const updateCryptoData = (event) => {
        event.preventDefault();
        if (!tempCryptoData.currency) return addNotification({ variant: 'error', message: 'Please enter a currency.' });
        if (!tempCryptoData.crypto) return addNotification({ variant: 'error', message: 'Please enter a cryptocoin.' });
        
        let aux = cryptosOptions.find( element => tempCryptoData.crypto === element.value );
        aux = aux? aux.label:undefined; 
        setCryptoData({ ...tempCryptoData, cryptoName: aux });
        initForm();
    };

    const setCurrency = value => { setTempCryptoData({ currency: value, crypto: tempCryptoData.crypto }); };
    const setCrypto = value => { setTempCryptoData({ currency: tempCryptoData.currency, crypto: value }); };
    
    return (
        <div className="crypto-form">
            <form className="text-left" id="cryptoForm" onSubmit={(e) => updateCryptoData(e)}>
                <div className="form-group">
                    <Input type="select" id="inputCurrency" name="currency" label="Choose a currency" select={true} 
                        options={currencies} variant="outlined" setValue={setCurrency} className="crypto-form-select"
                        defaultValue="" value={tempCryptoData.currency} />
                </div>
                <div className="form-group">
                    <Input type="select" id="inputCrypto" name="crypto" label="Choose a cryptocurrency" select={true}
                        options={cryptosOptions} variant="outlined" setValue={setCrypto} className="crypto-form-select"
                        disabled={cryptosOptions.length? false:true} defaultValue="" value={tempCryptoData.crypto} />
                </div>
                <div className="center-align">
                    <Button type="submit" id="cryptoSubmit" variant="contained" color="primary"
                        className="crypto-form-submit" size="large">
                        Get Price<i className="fas fa-rocket" style={{ color: "white", marginLeft: "10px" }}></i>
                    </Button>
                </div>
            </form>
            <LoadingSpinner loading={loading} />
        </div>
    );
}

Form.propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    setCryptoData: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired
}

export default Form;