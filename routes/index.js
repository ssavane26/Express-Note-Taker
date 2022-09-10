// Using this Script File to export routers to server
const router = require('express').Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

module.exports = router;