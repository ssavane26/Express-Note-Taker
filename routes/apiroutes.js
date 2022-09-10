// Initating Express and Routers
const router = require('express').Router();
const { readFromFile, readAndAppend, deleteNote } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//GET ROUTES
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
 
  router.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No Note with that ID');
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
