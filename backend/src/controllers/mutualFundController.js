//import { getBetaValue } from '../services/mutualFundService.js';
const getBetaValue = require('../services/mutualFundService');
const marketReturnRate = require('../services/mutualFundService');


// Hardcoded list of mutual funds that run on s&p 500 index
const mutualFunds = {
    FXAIX: ['Fidelity 500 Index Fund'],
    VFIAX: ['Vanguard 500 Index Fund;Admiral'],
    SWPPX: ['Schwab S&P 500 Index Fund'],
    VFFSX: ['Vanguard 500 Index Fund;Institutional Select'],
    VIIIX: ['Vanguard Institutional Index Fund;Inst Plus'],
    VINIX: ['Vanguard Institutional Index Fund;Institutional'],
    FUSEX: ['Fidelity Spartan 500 Index Fund;Investor'],
};


// Get list of mutual funds
exports.getMutualFunds = (req, res) => {
    const fundList = Object.entries(mutualFunds).map(([ticker, [name]]) => ({
        ticker,
        name,
    }));
    res.json(fundList);
};

// Calculate future value
exports.calculateFutureValue = async (req, res) => {
    const { ticker, initialInvestment, timeHorizon } = req.body;

    if (!ticker || !initialInvestment || !timeHorizon) {
        return res.status(400).json({ error: 'Missing required fields: ticker, initialInvestment, timeHorizon' });
    }

    if (!mutualFunds[ticker]) {
        return res.status(400).json({ error: `Mutual fund with ticker ${ticker} not found.` });
    }

    //const beta = mutualFunds[ticker][1];
    const beta = await getBetaValue(ticker)
    console.log(beta)
    const riskFreeRate = 0.04; // Hardcoded risk-free rate
    const marketreturn = await marketReturnRate();
    console.log(marketreturn)

    const rate = riskFreeRate + beta * (marketreturn - riskFreeRate);
    const futureValue = initialInvestment * Math.exp(rate * timeHorizon);

    res.json({
        ticker,
        initialInvestment: parseFloat(initialInvestment),
        timeHorizon: parseFloat(timeHorizon),
        futureValue: parseFloat(futureValue.toFixed(2)),
    });
};
