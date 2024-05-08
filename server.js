const express = require('express');
const path = require('path');
const fs = require ('fs');


// Port, add || additional port once server is live on Heroku
const PORT = 3001;

// Initialize Express
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

// GET route for notes page
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET api/notes should read db.json and return all saved notes as JSON


// POST api/notes should receive a new note to save in the request body, add it to 'db.json', and then return the new note to the client. Each note must have a unique ID, find an npm package that can do this for you








// Live server at PORT 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

