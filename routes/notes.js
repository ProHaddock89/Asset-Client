// in routes
const router = require('express').Router()
const path = require('path');
const fs = require('fs');

router.get("/", (req,res) => res.sendFile(path.join(__dirname, '..', 'database', 'notes.json')) )
router.post("/", (req,res) => {
    // Resolve the full path to the JSON file
    const filePath = path.join(__dirname, '..', 'database', 'notes.json');
  
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read file' });
      }
  
      try {
          // Parse the JSON data
          const notes = JSON.parse(data);
          req.body.id = generateRandomId()
          let newNote = req.body
          console.log(newNote)
          notes.items.push(newNote);
          // Convert the updated data back to JSON format
          const updatedData = JSON.stringify(notes, null, 2)
          console.log(updatedData)
          // Write the updated JSON back to the file
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                  console.log(err)
                  return res.status(500).json({ error: 'Failed to save file' });
              }
              console.log("Saved Note", newNote)
              res.status(200).json({ message: 'File updated successfully', newNote });
          });
  
      } catch (parseErr) {
        res.status(500).json({ error: 'Failed to parse JSON' });
      }
    });
  })

  function generateRandomId(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }

    return randomId;
}



module.exports = router

