const express = require('express');

const router = express.Router();
const{upload} = require('./multer');
const createFilm = require('./controller');

router.post('/api/new', createFilm);

module.exports = router;