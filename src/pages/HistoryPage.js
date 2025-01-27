// pages/HistoryPage.js
import React from 'react';

const HistoryPage = () => {
  const calculations = [
    {
      date: '2024-01-26',
      initialAmount: 10000,
      timeHorizon: 10,
      returnRate: 15.72,
      totalBalance: 48162.71
    },
    // Add more history items
  ];

  return (
    <div className="history">
      <h2>Calculation History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Initial Amount</th>
            <th>Time Horizon</th>
            <th>Return Rate</th>
            <th>Total Balance</th>
          </tr>
        </thead>
        <tbody>
          {calculations.map((calc, index) => (
            <tr key={index}>
              <td>{calc.date}</td>
              <td>${calc.initialAmount}</td>
              <td>{calc.timeHorizon} years</td>
              <td>{calc.returnRate}%</td>
              <td>${calc.totalBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;