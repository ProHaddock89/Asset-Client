const fs = require('fs');
const path = require('path');
const notesFilePath = path.join(__dirname, '../data/notes.json');
const calculationHistoryFilePath = path.join(__dirname, '../data/calculationHistory.json');

// Get notes
exports.getNotes = (req, res) => {
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read notes' });

        let notes = JSON.parse(data);
        
        // Ensure each note has an id
        notes = notes.map(note => {
            if (!note.id) {
                // Generate a new id for notes without an id
                note.id = Date.now().toString();  // Or use another logic to generate a unique id
            }
            return note;
        });

        res.json(notes);
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

// Delete a calculation history entry
exports.deleteCalculationHistory = (req, res) => {
    const { id } = req.params;

    fs.readFile(calculationHistoryFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read calculation history' });
        
        let history = JSON.parse(data);
        history = history.filter(entry => entry.id !== id);

        fs.writeFile(calculationHistoryFilePath, JSON.stringify(history, null, 2), (err) => {
            if (err) return res.status(500).json({ message: 'Failed to delete calculation history entry' });
            res.status(204).send(); // No content
        });
    });
};
