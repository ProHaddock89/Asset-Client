const axios = require('axios');

const backendURL = 'https://calc-server-hgvf.onrender.com/api/calculationHistory';

// Fetch all history entries from the backend
const getHistory = async (req, res) => {
    try {
        const response = await axios.get(backendURL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching calculation history:', error.message);
        res.status(500).json({ error: 'Failed to retrieve calculation history' });
    }
};

// Add a new history entry to the backend
const createHistoryEntry = async (req, res) => {
    try {
        const newEntry = req.body;
        const response = await axios.post(backendURL, newEntry);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error saving calculation history:', error.message);
        res.status(500).json({ error: 'Failed to save calculation history' });
    }
};

module.exports = {
    getHistory,
    createHistoryEntry
};
