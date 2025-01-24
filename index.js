const express = require('express');
const axios = require('axios');
const path = require('path');
import {React, useState} from 'react';


const app = express();
const PORT = 3000;

// Mutual Funds Data
const Fund_Codes = {
    VSMPX: "Vanguard Total Stock Market Index Fund;Institutional Plus",
    FXAIX: "Fidelity 500 Index Fund",
    VFIAX: "Vanguard 500 Index Fund;Admiral",
    VTSAX: "Vanguard Total Stock Market Index Fund;Admiral",
    SPAXX: "Fidelity Government Money Market Fund",
    // Add the remaining funds here...
};

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve the static HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/get-beta', async (req, res) => {
    const selectedFund = req.body.fundKey;
    const url = `https://api.newtonanalytics.com/stock-beta/?ticker=${selectedFund}&index=%5eGSPC&interval=1mo%E2%80%8B&observations=12`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === '200') {
            const betaValue = data.data;
            res.send(`
                <h1>Beta Value for ${selectedFund} (${Fund_Codes[selectedFund]}): ${betaValue}</h1>
                <a href="/">Go Back</a>
            `);
        } else {
            res.send(`
                <h1>Mutual Fund not exposed or no data available.</h1>
                <a href="/">Go Back</a>
            `);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.send(`
            <h1>Error fetching data for ${selectedFund}.</h1>
            <a href="/">Go Back</a>
        `);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
