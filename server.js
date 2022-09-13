const express = require('express');
const routes = require('./routes');
const path = require('path');
const api = require('./routes/apiroutes.js');
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json')
const app = express();


// Middleware for connecting data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));
app.use(routes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
