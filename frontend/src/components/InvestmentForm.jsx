import React, { useState } from 'react';
import '../styles/components.css';

const InvestmentForm = ({ onSubmit }) => {
    const [investment, setInvestment] = useState('');
    const [timeHorizon, setTimeHorizon] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            initialInvestment: parseFloat(investment),
            timeHorizon: parseFloat(timeHorizon),
        });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>Initial Investment</label>
            <input
                type="number"
                placeholder="Initial Investment ($)"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                required
            />
            <label >Time Horizon</label>
            <input
                type="number"
                placeholder="Time Horizon (Years)"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                required
            />
            <button type="submit">Calculate Future Value</button>
        </form>
    );
};

export default InvestmentForm;
