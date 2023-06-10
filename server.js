const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'))
app.set ("view engine", "ejs")

app.get('/', (req, res) =>{
    res.render("index.ejs")
})

app.get('/login', (req, res)=>{
    res.render("login.ejs")
})

app.get('/register', (req, res)=>{
    res.render("register.ejs")
})

app.get('/profile', (req, res)=>{
    res.render("profile.ejs")
})

app.get('/admin', (req, res)=>{
    res.render("adminProfile.ejs")
})

app.get('/new', (req, res)=>{
    res.render("newFilm.ejs")
})

app.get('/edit', (req, res)=>{
    res.render("editFilm.ejs")
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})