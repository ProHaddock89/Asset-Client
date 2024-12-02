const sqlite3 = require('sqlite3').verbose();

// Set up database connection
const db = new sqlite3.Database('./calculationHistory.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                PP REAL,
                SL REAL,
                NC REAL,
                result REAL
            )
        `);
    }
});

// Fetch all history entries
const getHistory = (req, res) => {
    db.all(`SELECT * FROM history`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to retrieve history' });
        } else {
            res.json(rows);
        }
    });
};

// Add a new history entry
const createHistoryEntry = (req, res) => {
    const { title, PP, SL, NC, result } = req.body;
    const sql = `INSERT INTO history (title, PP, SL, NC, result) VALUES (?, ?, ?, ?, ?)`;
    const params = [title, PP, SL, NC, result];

    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to add history entry' });
        } else {
            res.status(201).json({ id: this.lastID, title, PP, SL, NC, result });
        }
    });
};

module.exports = {
    getHistory,
    createHistoryEntry
};
