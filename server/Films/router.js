const express = require('express');

const router = express.Router();
const{upload} = require('./multer');
const {createFilm, editFilm, deleteFilms, saveFilm, deleteFromToWatch} = require('./controller');
const {isAdmin, isAuthUser} = require('../auth/middlewares')

router.post('/api/films/new', isAdmin, upload.single('image'), createFilm);
router.post('/api/films/edit', isAdmin, upload.single('image'), editFilm);
router.delete('/api/films/:id', isAdmin, deleteFilms);
router.post('/api/films/save', isAuthUser, saveFilm)
router.delete('/api/films/save/:id', isAuthUser, deleteFromToWatch);


module.exports = router;