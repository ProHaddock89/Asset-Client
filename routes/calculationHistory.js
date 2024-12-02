const express = require('express');
const axios = require('axios');
const router = express.Router();

const backendURL = 'https://calc-server-hgvf.onrender.com/api/calculationHistory';

// Route to get all calculation history from the backend
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(backendURL);
        res.json(response.data); // Respond with the data from the backend
    } catch (error) {
        console.error('Error fetching calculation history:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to retrieve calculation history' });
    }
});

// Route to create a new calculation history entry in the backend
router.post('/', async (req, res) => {
    try {
        const newEntry = req.body;
        console.log('Sending new entry to backend:', newEntry); // Debugging log

        const response = await axios.post(backendURL, newEntry, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response from backend:', response.data); // Debugging log
        res.status(201).json(response.data); // Respond with the created entry
    } catch (error) {
        console.error('Error saving calculation history:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to save calculation history' });
    }
});

module.exports = router;
