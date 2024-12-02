const express = require('express');
const router = express.Router();

// Example: In-memory storage for calculation history
let history = [];

// Route to get all calculation history
router.get('/', (req, res) => {
    res.json(history);
});

// Route to create a new calculation history entry
router.post('/', (req, res) => {
    const newEntry = req.body;
    history.push(newEntry); // Save the entry
    res.status(201).json(newEntry); // Respond with the created entry
});

// Additional routes for history (e.g., delete) can go here

module.exports = router;