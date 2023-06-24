const express = require('express')
const router = express.Router();
const Genres = require('../Genres/Genres')
const Country = require('../Country/Country')
const User = require('../auth/user')

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

router.get('/profile/:id', async(req, res)=>{
    const allGenres = await Genres.find();
    const user = await User.findById(req.params.id)
    if(user){
        res.render("profile.ejs", {user: user, genres: allGenres, loginUser: req.user})
    }else{
        res.redirect('/not-found')
    }
});

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

router.get('/not-found', (req, res)=>{
    res.render("notFound")
})
module.exports = router