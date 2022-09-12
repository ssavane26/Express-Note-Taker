// Initating Express and Routers
const router = require('express').Router();
const { readFromFile, readAndAppend, deleteNote } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//GET ROUTES
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
 
  // GET ROUTES FOR POSTED NOTES
  router.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No Existing Note with that ID');
      });
  });

//DELETE ROUTE
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    deleteNote(noteId, './db/db.json')
      .then(() => {
        // Respond to the DELETE request
        res.json(`Delete Request for ${noteId} Approved`);
      });
  });

//POST ROUTE
router.post('/notes', (req, res) => {
    console.info(`${req.method} New note request received`);
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error! Unable to post note');
    }
  });
  
  module.exports = router;