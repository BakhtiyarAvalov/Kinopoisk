const express = require('express')
const router = express.Router();
const Genres = require('../Genres/Genres');
const Country = require('../Country/Country');
const User = require('../auth/user');
const Film = require('../Films/film');

router.get('/', async(req, res) =>{
    const allGenres = await Genres.find()
    const films = await Film.find().populate('country').populate('genre')
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render("index.ejs" , {genres: allGenres, user : {}, films})
})

router.get('/login', (req, res)=>{
    res.render("login.ejs", {user: req.user ? req.user : {}})
})

router.get('/register', (req, res)=>{
    res.render("register.ejs", {user: req.user ? req.user : {}})
})

router.get('/profile/:id', async(req, res)=>{
    const allGenres = await Genres.find();
    const user = await User.findById(req.params.id).populate('toWatch')
    .populate({path: 'toWatch', populate: {path: 'country'}})
    .populate({path: 'toWatch', populate: {path: 'genre'}})
    if(user){
        res.render("profile.ejs", {genres: allGenres, user: user, loginUser: req.user})
    }else{
        res.redirect('/not-found')
    }
});

router.get('/admin/:id', async(req, res)=>{
    const allGenres = await Genres.find();
    const user = await User.findById(req.params.id)
    const films = await Film.find().populate('country').populate('genre').populate('author')
    res.render("adminProfile.ejs", {genres: allGenres, user: user, loginUser: req.user ? req.user : {}, films: films})
})

router.get('/new', async(req, res)=>{
    const allGenres = await Genres.find()
    const getAllCountries = await Country.find()
    res.render("newFilm.ejs", {genres : allGenres, countries: getAllCountries, user: req.user ? req.user : {} })
})

router.get('/edit/:id', async(req, res)=>{
    const allGenres = await Genres.find()
    const getAllCountries = await Country.find()
    const film = await Film.findById(req.params.id)
    res.render("editFilm.ejs", {genres : allGenres, countries: getAllCountries, user: req.user ? req.user : {}, film})
})

router.get('/not-found', (req, res)=>{
    res.render("notFound.ejs")
})
module.exports = router