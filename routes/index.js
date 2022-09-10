// Using this Script File to export routers to server
const express = require('express');

const notesRouter = require('./notes')


const app = express();

app.use('/notes', notesRouter)

module.exports = app;