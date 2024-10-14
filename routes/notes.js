const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// GET notes
router.get('/', noteController.getNotes);

// POST new note
router.post('/', noteController.createNote);

// DELETE note
router.delete('/:id', noteController.deleteNote);

// History delete route:
router.delete('/calculationHistory/:id', noteController.deleteCalculationHistory); // Assuming you have a controller for this


module.exports = router;
