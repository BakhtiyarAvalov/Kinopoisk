const express = require('express')
const router = express.Router();
const Genres = require('../Genres/Genres')
const Country = require('../Country/Country')

router.get('/', async(req, res) =>{
    const allGenres = await Genres.find()
    const getAllCountries = await Country.find()
    res.render("index.ejs" , {genres: allGenres, user: req.user ? req.user : {}})
})

router.get('/login', (req, res)=>{
    res.render("login.ejs", {user: req.user ? req.user : {}})
})

router.get('/register', (req, res)=>{
    res.render("register.ejs", {user: req.user ? req.user : {}})
})

router.get('/profile/:id', (req, res)=>{
    res.render("profile.ejs", {user: req.user ? req.user : {}})
})

router.get('/admin', (req, res)=>{
    res.render("adminProfile.ejs", {user: req.user ? req.user : {}})
})

router.get('/new', async(req, res)=>{
    const allGenres = await Genres.find()
    const getAllCountries = await Country.find()
    res.render("newFilm.ejs", {genres : allGenres, countries: getAllCountries, user: req.user ? req.user : {} })
})

router.get('/edit', async(req, res)=>{
    const allGenres = await Genres.find()
    const getAllCountries = await Country.find()
    res.render("editFilm.ejs", {genres : allGenres, countries: getAllCountries, user: req.user ? req.user : {}})
})
module.exports = router