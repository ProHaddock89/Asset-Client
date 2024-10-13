const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');
const calculationHistoryRouter = require('./routes/calculationHistory'); // Import the new route

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', notesRouter); // Existing notes routes
app.use('/api/calculationHistory', calculationHistoryRouter); // New calculation history routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on the port: http://localhost:${PORT}`);
});
