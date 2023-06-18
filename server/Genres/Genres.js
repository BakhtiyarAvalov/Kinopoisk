const mongoose = require('mongoose')

const GenreSchema = new mongoose.Schema({
    name: String,
    kay: Number,
})
module.exports = mongoose.model('genre', GenreSchema)