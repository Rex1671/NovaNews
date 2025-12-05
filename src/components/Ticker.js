import React from 'react';
import '../App.css';

const Ticker = ({ headlines }) => {
    return (
        <div className="ticker-container">
            <div className="ticker-title">BREAKING</div>
            <div className="ticker-wrapper">
                <div className="ticker-content">
                    {headlines.map((headline, index) => (
                        <span key={index} className="ticker-item">
                            🔥 {headline.title} &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ticker;
