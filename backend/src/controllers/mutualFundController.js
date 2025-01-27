//import { getBetaValue } from '../services/mutualFundService.js';
const getBetaValue = require('../services/mutualFundService');


// Hardcoded list of mutual funds
const mutualFunds = {
    VSMPX: ['Vanguard Total Stock Market Index Fund;Institutional Plus'],
    FXAIX: ['Fidelity 500 Index Fund'],
    VFIAX: ['Vanguard 500 Index Fund;Admiral'],
    SWPPX: ['Schwab S&P 500 Index Fund'],
    VTSAX: ['Vanguard Total Stock Market Index Fund;Admiral'],
    VMFXX: ['Vanguard Federal Money Market Fund;Investor'],
    FGTXX: ['Goldman Sachs FS Government Fund;Institutional'],
    SWVXX: ['Schwab Value Advantage Money Fund;Investor'],
    VGTSX: ['Vanguard Total International Stock Index Fund;Investor'],
    VFFSX: ['Vanguard 500 Index Fund;Institutional Select'],
    VIIIX: ['Vanguard Institutional Index Fund;Inst Plus'],
    MVRXX: ['Morgan Stanley Inst Liq Government Port;Institutional'],
    VTBNX: ['Vanguard Total Bond Market II Index Fund;Institutional'],
    AGTHX: ['American Funds Growth Fund of America;A'],
    VTBIX: ['Vanguard Total Bond Market II Index Fund;Investor'],
    GVMXX: ['State Street US Government Money Market Fund;Prem'],
    FCTDX: ['Fidelity Strategic Advisers Fidelity US Total Stk'],
    FCNTX: ['Fidelity Contrafund'],
    VINIX: ['Vanguard Institutional Index Fund;Institutional'],
    VMRXX: ['Vanguard Cash Reserves Federal Money Market Fd;Adm'],
    VTSMX: ['Vanguard Total Stock Market Index Fund;Investor'],
    VWITX: ['Vanguard Intermediate-Term Tax-Exempt Fund;Investor'],
    FBGRX: ['Fidelity Blue Chip Growth Fund'],
    FUSEX: ['Fidelity Spartan 500 Index Fund;Investor'],
    VSMGX: ['Vanguard LifeStrategy Moderate Growth Fund'],
    DODFX: ['Dodge & Cox International Stock Fund'],
    PRGFX: ['T. Rowe Price Growth Stock Fund'],
    TRBCX: ['T. Rowe Price Blue Chip Growth Fund'],
    FSKAX: ['Fidelity Total Market Index Fund'],
    VEMAX: ['Vanguard Emerging Markets Stock Index Fund;Admiral'],
    VBTLX: ['Vanguard Total Bond Market Index Fund;Admiral'],
    VWELX: ['Vanguard Wellington Fund;Investor'],
    VFIJX: ['Vanguard GNMA Fund;Admiral'],
    RERGX: ['American Funds EuroPacific Growth Fund;R6'],
    FSTVX: ['Fidelity Total Market Index Fund;Premium Class'],
    VBMFX: ['Vanguard Total Bond Market Index Fund;Investor'],
    FTRNX: ['Fidelity Advisor New Insights Fund;Class A'],
    FSCSX: ['Fidelity Select Software and IT Services Portfolio'],
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
    const marketReturnRate = 0.08; // Hardcoded market return rate

    const rate = riskFreeRate + beta * (marketReturnRate - riskFreeRate);
    const futureValue = initialInvestment * Math.exp(rate * timeHorizon);

    res.json({
        ticker,
        initialInvestment: parseFloat(initialInvestment),
        timeHorizon: parseFloat(timeHorizon),
        futureValue: parseFloat(futureValue.toFixed(2)),
    });
};
