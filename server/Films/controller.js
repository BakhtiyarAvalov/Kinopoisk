const Film = require('./film');
const User = require('../auth/user');
const fs = require('fs');
const path = require('path');


const createFilm = async(req, res) => {
    if( req.file &&
        req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.year > 0 &&
        req.body.time > 10 &&
        req.body.country.length > 2 &&
        req.body.genre.length > 2
        ){
            await new Film({
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country,
                genre: req.body.genre,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id,
            }).save()
            res.redirect(`/admin/${req.user._id}`)
        }else{
            res.redirect('/new?error1')
        }
};

const editFilm = async(req, res)=>{
    if( req.file &&
        req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.year > 0 &&
        req.body.time > 0 &&
        req.body.country.length > 2
        ){
            const films = await Film.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public/' + films.image))
            // films.titleRus = req.body.titleRus;
            // films.titleEng = req.body.titleEng;
            // films.year= req.body.year;
            // films.time = req.body.time;
            // films.country = req.body.country;
            // films.image = `images/files/${req.file.filename}`;
            // films.author = req.user._id
            // films.save()
            await Film.findByIdAndUpdate(req.body.id, {
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country,
                image: `/images/films/${req.file.filename}`,
                genre: req.body.genre
            })
        }else{
 ;          res.redirect(`/edit/${req.body.id}?error=1`)
        }
}
const deleteFilms = async (req, res) => {
    const film = await Film.findById(req.params.id)
    if(film){
        fs.unlinkSync(path.join(__dirname + '../../../public/' + film.image))
        await Film.deleteOne({_id: req.params.id})
        res.status(200).send('OK')
    }else{
        res.status(404).send('Not found')
    }
}

const saveFilm = async(req, res) => {
    console.log(req.body);
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findFilm = user.toWatch.filter(item => item._id == req.body.id)
        if (findFilm.length == 0){
            user.toWatch.push(req.body.id)
            user.save()
            res.send('Фильм успешно сохранен')
        }else{
            resizeBy.send('Фильм уже сохранен')
        }
    }
    res.send('ok')
}

module.exports ={
    createFilm,
    editFilm,
    deleteFilms, 
    saveFilm
};