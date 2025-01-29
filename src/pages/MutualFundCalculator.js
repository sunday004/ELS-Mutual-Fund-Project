import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Calculator = () => {
  const [calculators, setCalculators] = useState([
    {
      id: 1,
      fundName: 'Mutual Fund 1',
      initialAmount: 10000,
      timeHorizon: 10,
      monthlyInvestment: 0,
      returnRate: 15.72,
      riskFreeRate: 4.57,
      beta: 1
    }
  ]);

  const [results, setResults] = useState([]);

  const calculateProjections = (calc) => {
    const data = [];
    const monthlyRate = calc.returnRate / 12 / 100;
    let balance = calc.initialAmount;

    for (let year = 0; year <= calc.timeHorizon; year++) {
      data.push({
        year,
        balance: Math.round(balance * 100) / 100,
        earnings: Math.round((balance - calc.initialAmount) * 100) / 100
      });
      balance *= Math.pow(1 + monthlyRate, 12);
      balance += calc.monthlyInvestment * 12;
    }
    return data;
  };

  const handleCalculate = () => {
    const newResults = calculators.map(calc => {
      const totalBalance = calc.initialAmount * 
        Math.pow(1 + calc.returnRate / 100, calc.timeHorizon);
      const earnings = totalBalance - calc.initialAmount;
      return {
        ...calc,
        totalBalance,
        earnings,
        projectionData: calculateProjections(calc)
      };
    });
    setResults(newResults);
  };

  const addFund = () => {
    if (calculators.length < 2) {
      const newCalc = {
        id: 2,
        fundName: 'Mutual Fund 2',
        initialAmount: 20000, // Different default value
        timeHorizon: 10,
        monthlyInvestment: 0,
        returnRate: 14.85,
        riskFreeRate: 4.32,
        beta: 1.2
      };
      setCalculators([...calculators, newCalc]);
    }
  };

  const removeFund = (id) => {
    setCalculators(calculators.filter(calc => calc.id !== id));
    setResults(results.filter(result => result.id !== id));
  };

  const updateCalculator = (id, field, value) => {
    setCalculators(calculators.map(calc => 
      calc.id === id ? { ...calc, [field]: value } : calc
    ));
  };

  return (
    <div className="calculator">
      <h1>Mutual Fund Calculator</h1>
      
      {calculators.map((calc) => (
        <div key={calc.id} className="calculator-form">
          <h3>Fund {calc.id}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Mutual Fund</label>
              <select
                value={calc.fundName}
                onChange={(e) => updateCalculator(calc.id, 'fundName', e.target.value)}
              >
                <option>Mutual Fund 1</option>
                <option>Mutual Fund 2</option>
                <option>Mutual Fund 3</option>
              </select>
            </div>

            <div className="form-group">
              <label>Initial Investment Amount ($)</label>
              <input
                type="number"
                value={calc.initialAmount}
                onChange={(e) => updateCalculator(calc.id, 'initialAmount', Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Time Horizon (years)</label>
              <input
                type="number"
                value={calc.timeHorizon}
                onChange={(e) => updateCalculator(calc.id, 'timeHorizon', Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Monthly Investment ($)</label>
              <input
                type="number"
                value={calc.monthlyInvestment}
                onChange={(e) => updateCalculator(calc.id, 'monthlyInvestment', Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Expected Return Rate (%)</label>
              <input
                type="number"
                value={calc.returnRate}
                onChange={(e) => updateCalculator(calc.id, 'returnRate', Number(e.target.value))}
                step="0.01"
              />
            </div>
          </div>
          {calculators.length > 1 && (
            <button onClick={() => removeFund(calc.id)} className="remove-btn">
              Remove Fund
            </button>
          )}
        </div>
      ))}

      <div className="button-group">
        {calculators.length < 2 && (
          <button onClick={addFund} className="add-btn">
            + Add Another Fund
          </button>
        )}
        <button onClick={handleCalculate} className="calculate-btn">
          Calculate
        </button>
      </div>

      {results.length > 0 && (
        <div className="results">
          <h2>Results Summary</h2>
          <div className="results-container">
            {results.map((result) => (
              <div key={result.id} className="result-section">
                <h3>{result.fundName} Results</h3>
                <div className="summary-table">
                  <table>
                    <tbody>
                      <tr>
                        <td>Initial Amount (USD)</td>
                        <td>$ {result.initialAmount.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Time Horizon (years)</td>
                        <td>{result.timeHorizon}</td>
                      </tr>
                      <tr>
                        <td>Return Rate</td>
                        <td>{result.returnRate}%</td>
                      </tr>
                      <tr>
                        <td>Risk Free Rate</td>
                        <td>{result.riskFreeRate}%</td>
                      </tr>
                      <tr>
                        <td>Mutual Fund Beta</td>
                        <td>{result.beta}</td>
                      </tr>
                      <tr>
                        <td>Monthly Investment</td>
                        <td>$ {result.monthlyInvestment.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Earnings (USD)</td>
                        <td className="earnings">$ {Math.round(result.earnings).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Total Balance (USD)</td>
                        <td>$ {Math.round(result.totalBalance).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="chart">
                    <LineChart width={500} height={300} data={result.projectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        stroke={result.id === 1 ? "#2563eb" : "#7c3aed"} 
                        name={`${result.fundName} Balance`} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="earnings" 
                        stroke={result.id === 1 ? "#16a34a" : "#db2777"} 
                        name={`${result.fundName} Earnings`} 
                      />
                    </LineChart>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;