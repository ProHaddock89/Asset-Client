const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use('/api/notes', notesRouter); // Use the notes routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on the port: http://localhost:${PORT}`);
});
