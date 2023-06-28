const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FilmSchema = new mongoose.Schema({
    titleRus: String,
    titleEng: String,
    year: Number,
    time: String,
    country: {type: Schema.Types.ObjactId, ref: 'Country'},
    gener: {type: Schema.Types.ObjactId, ref: 'Genre'},
    Image: String,
    author: {type: Schema.Types.ObjactId, ref: 'User'}
})
module.exports = mongoose.model('film', FilmSchema)