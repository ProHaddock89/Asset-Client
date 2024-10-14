const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let calculationHistory = []; // Temporary storage for calculation history

app.post('/api/calculationHistory', (req, res) => {
    const newEntry = req.body;
    calculationHistory.push(newEntry); // Save the new entry
    console.log("Received history entry:", newEntry);
    res.status(201).send("History saved");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
