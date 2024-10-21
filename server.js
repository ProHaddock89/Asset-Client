const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes'); // Ensure this path is correct
const calculationHistoryRouter = require('./routes/calculationHistory'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use('/api/notes', notesRouter); // Use the notes routes
app.use('/api/calculationHistory', calculationHistoryRouter); // Use the calculation history routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on the port: http://localhost:${PORT}`);
});
