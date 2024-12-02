const express = require('express');
const axios = require('axios');
const router = express.Router();

const backendURL = 'https://calc-server-hgvf.onrender.com/api/calculationHistory';

// Route to get all calculation history from the backend
router.get('/', async (req, res) => {
    try {
        console.log('Attempting to fetch calculation history...');
        const response = await axios.get(backendURL);
        console.log('Calculation history received:', response.data);
        res.json(response.data); // Respond with the data from the backend
    } catch (error) {
        const errorMessage = error.response?.data || error.message || 'Unknown error';
        console.error('Error fetching calculation history:', errorMessage);
        res.status(500).json({ error: `Failed to retrieve calculation history: ${errorMessage}` });
    }
});

// Route to create a new calculation history entry in the backend
router.post('/', async (req, res) => {
    try {
        const newEntry = req.body;
        if (!newEntry || Object.keys(newEntry).length === 0) {
            return res.status(400).json({ error: 'Invalid input. Body cannot be empty.' });
        }

        console.log('Sending new entry to backend:', newEntry);
        const response = await axios.post(backendURL, newEntry, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response from backend:', response.data);
        res.status(201).json(response.data); // Respond with the created entry
    } catch (error) {
        const errorMessage = error.response?.data || error.message || 'Unknown error';
        console.error('Error saving calculation history:', errorMessage);
        res.status(500).json({ error: `Failed to save calculation history: ${errorMessage}` });
    }
});

module.exports = router;
