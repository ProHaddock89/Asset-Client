// dependecies
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

// init express app
const app = express()


//middleware
app.use(
    bodyParser.urlencoded( {extended : false} ),
    bodyParser.json(),
    cors()
)
// Routes

app.get("/", (req, res) => res.send("Notes App API"))
app.use("/notes", require("./routes/notes"))


app.listen(process.env.PORT, () => console.log(`Server running on Port: ${process.env.PORT}`) )