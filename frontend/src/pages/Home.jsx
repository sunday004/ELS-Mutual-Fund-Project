import React, { useEffect, useState } from 'react';
import { getMutualFunds, calculateFutureValue } from '../services/api';
import MutualFundDropdown from '../components/MutualFundDropdown';
import InvestmentForm from '../components/InvestmentForm';
import ResultsDisplay from '../components/ResultsDisplay';

const Home = () => {
    const [funds, setFunds] = useState([]);
    const [selectedFund, setSelectedFund] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Fetch mutual funds when the component loads
        const fetchFunds = async () => {
            const data = await getMutualFunds();
            setFunds(data);
        };
        fetchFunds();
    }, []);

    const handleCalculate = async (investmentData) => {
        const response = await calculateFutureValue({
            ticker: selectedFund,
            ...investmentData,
        });
        setResult(response);
        
    };

    return (
        <div>
            <h1>Mutual Fund Investment Predictor</h1>
            <MutualFundDropdown
                funds={funds}
                selectedFund={selectedFund}
                onChange={setSelectedFund}
            />
            <InvestmentForm onSubmit={handleCalculate} />
            
            <ResultsDisplay result={result} />
        </div>
    );
};

export default Home;
