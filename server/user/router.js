const express = require('express');

const router = express.Router();
const saveToWotch = require('./controller');

router.post('/api/saveToWotch', saveToWotch)
module.exports = router