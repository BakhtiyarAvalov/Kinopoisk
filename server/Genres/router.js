const express = require('express');

const router = express.Router();
const {getAllGenres} = require('./controller')
const writeDataGenre = require('./seed')
writeDataGenre()
router.get('/api/genre', getAllGenres)
module.exports = router