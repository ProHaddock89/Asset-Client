const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');
const calculationHistoryRouter = require('./routes/calculationHistory'); // Add this line

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use('/api/notes', notesRouter); // Use the notes routes
app.use('/api/calculationHistory', calculationHistoryRouter); // Add this line

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on the port: http://localhost:${PORT}`);
});
