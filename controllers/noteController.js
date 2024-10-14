const fs = require('fs');
const path = require('path');
const notesFilePath = path.join(__dirname, '../data/notes.json');

// Get notes
exports.getNotes = (req, res) => {
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read notes' });
        res.json(JSON.parse(data));
    });
};

// Create a new note
exports.createNote = (req, res) => {
    const newNote = { id: Date.now().toString(), ...req.body };
    
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read notes' });
        const notes = JSON.parse(data);
        notes.push(newNote);
        
        fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), (err) => {
            if (err) return res.status(500).json({ message: 'Failed to save note' });
            res.status(201).json(newNote);
        });
    });
};

// Delete a note
exports.deleteNote = (req, res) => {
    const { id } = req.params;

    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read notes' });
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== id);

        fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), (err) => {
            if (err) return res.status(500).json({ message: 'Failed to delete note' });
            res.status(204).send();
        });
    });
};

// In noteController.js

exports.deleteCalculationHistory = async (req, res) => {
    const { id } = req.params;
    // Logic to delete the entry from your database
    try {
        await YourDatabaseModel.deleteOne({ id }); // Adjust this based on your database setup
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting entry', error });
    }
};
