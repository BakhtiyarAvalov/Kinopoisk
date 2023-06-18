const express = require('express')
const router = express.Router();
const Genres = require('../Genres/Genres')

router.get('/', async(req, res) =>{
    const allGenres = await Genres.find()
    console.log({genres: allGenres});
    res.render("index.ejs" , {genres: allGenres})
})

router.get('/login', (req, res)=>{
    res.render("login.ejs")
})

router.get('/register', (req, res)=>{
    res.render("register.ejs")
})

router.get('/profile', (req, res)=>{
    res.render("profile.ejs")
})

router.get('/admin', (req, res)=>{
    res.render("adminProfile.ejs")
})

router.get('/new', async(req, res)=>{
    const allGenres = await Genres.find()
    res.render("newFilm.ejs", {genres : allGenres })
})

router.get('/edit', async(req, res)=>{
    const allGenres = await Genres.find()
    res.render("editFilm.ejs", {genres : allGenres})
})
module.exports = router