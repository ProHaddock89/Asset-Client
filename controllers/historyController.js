let calculationHistory = []; // This is a simple in-memory store; consider using a database

const getHistory = (req, res) => {
    res.json(calculationHistory);
};

const createHistoryEntry = (req, res) => {
    const newEntry = req.body;
    calculationHistory.push(newEntry);
    res.status(201).json(newEntry);
};

module.exports = {
    getHistory,
    createHistoryEntry
};
