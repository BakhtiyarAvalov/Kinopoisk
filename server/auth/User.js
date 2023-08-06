const mongoose = require('mongoose');
const { watch } = require('../Films/film');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    isAdmin: Boolean,
    githubId: String,
    googleId: String,
    toWatch: [{type: Schema.Types.ObjectId, ref: 'film'}],
    watched: [{type: Schema.Types.ObjectId, ref: 'film'}]
});
module.exports = mongoose.model('user', UserSchema);