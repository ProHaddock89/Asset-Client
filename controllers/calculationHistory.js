const express = require('express');
const router = express.Router();

// Temporary storage for calculation history
let calculationHistory = [];

// POST calculation history
router.post('/', (req, res) => {
    const newEntry = req.body;
    calculationHistory.push(newEntry); // Save the new entry
    console.log("Received history entry:", newEntry);
    res.status(201).send("History saved");
});

// GET the last 5 entries
router.get('/', (req, res) => {
    const lastFiveEntries = calculationHistory.slice(-5).reverse(); // Get last 5 and reverse
    res.json(lastFiveEntries);
});

module.exports = router;
