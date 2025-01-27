//import axios from 'axios'
const axios = require('axios')

const getBetaValue = async (ticker) => {
    try{
        let url = `https://api.newtonanalytics.com/stock-beta/?ticker=${ticker}&index=^GSPC&interval=1mo%E2%80%8B&observations=12`;
        const response = await axios.get(url);
        
        return response.data.data;
    } catch (error) {
        console.error("Error fetching beta value:", error.message);
        throw new Error("Error fetching beta value")
    }
    
};

module.exports = getBetaValue;