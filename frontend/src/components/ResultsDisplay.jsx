import React from 'react';
import '../styles/resultsDisplay.css'

const ResultsDisplay = ({ result }) => {
    if (!result) return null;

    return (
        <div className="results-container">
            <h3 className="results-header">Result Summary</h3>
            <div className="results-row">
                <span>Mutual Fund:</span>
                <span>{result.ticker}</span>
            </div>
            <div className="results-row">
                <span>Initial Investment:</span>
                <span>${result.initialInvestment}</span>
            </div>
            <div className="results-row">
                <span>Time Horizon :</span>
                <span>{result.timeHorizon}</span>
            </div>
            <div className="results-row">
                <span>Future Value :</span>
                <span>${result.futureValue}</span>
            </div>
        </div>
    );
};

export default ResultsDisplay;
