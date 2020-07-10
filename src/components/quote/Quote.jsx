import React from 'react';
import PropTypes from 'prop-types';
import './Quote.css';

function Quote({ quote }) {
    if (!quote) return null;

    return (
        <div className="quote-card text-left animated fadeIn" id="quote-card">
            {quote.cryptoName? <h2>{quote.cryptoName}</h2> : null}
            <p className="price">The price is: <span>{quote.PRICE}</span> | Currency symbol: <span>{quote.FROMSYMBOL}</span></p>
            <p>Highest price of the day: <span>{quote.HIGHDAY}</span></p>
            <p>Lowest price of the day: <span>{quote.LOWDAY}</span></p>
            <p>Variation last 24 hours: <span>{quote.CHANGEPCT24HOUR}</span></p>
            <p style={{ marginBottom: '0px' }}>Last update: <span>{quote.LASTUPDATE}</span></p>
        </div>
    );
}

Quote.propTypes = {
    quote: PropTypes.object,
}

export default Quote;