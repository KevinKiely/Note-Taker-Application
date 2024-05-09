const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('./helpers/fsUtils');



// Port, add || additional port once server is live on Heroku
const PORT = process.env.PORT || 3001;

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
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET api/notes should read db.json and return all saved notes as JSON
app.get('/api/notes', (req, res) => { 
    readFromFile("db/db.json").then((notes) => {
        const dbJson= JSON.parse(notes);
        res.json(dbJson);


    });
});



// POST api/notes should receive a new note to save in the request body, add it to 'db.json', and then return the new note to the client. Each note must have a unique ID, find an npm package that can do this for you


// POST request to add a new Note
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a new Note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if ( title && text ) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      // Obtain existing Notes
      fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
          
  
          // Add a new review
          parsedNotes.unshift(newNote);
  
            console.log(parsedNotes);

          // Write updated Notes back to the file
          fs.writeFile('db/db.json',
            JSON.stringify(parsedNotes, null),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.log('Successfully updated notes')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });
  

// Catch
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Live server at PORT 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);