const express = require('express')
const router = express.Router();
const Genres = require('../Genres/Genres')
const Country = require('../Country/Country')

router.get('/', async(req, res) =>{
    const allGenres = await Genres.find()
    const getAllCountries = await Country.find()
    res.render("index.ejs" , {genres: allGenres, countries: getAllCountries})
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
    const getAllCountries = await Country.find()
    res.render("newFilm.ejs", {genres : allGenres, countries: getAllCountries })
})

router.get('/edit', async(req, res)=>{
    const allGenres = await Genres.find()
    const getAllCountries = await Country.find()
    res.render("editFilm.ejs", {genres : allGenres, countries: getAllCountries})
})
module.exports = router