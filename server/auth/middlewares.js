const isAuth = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(400).send('Unauthorized')
    }
}

module.exports = {
    isAuth
}