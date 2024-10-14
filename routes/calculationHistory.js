const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// GET history
router.get('/', historyController.getHistory);

// POST new calculation entry
router.post('/', historyController.createHistoryEntry);

module.exports = router;
