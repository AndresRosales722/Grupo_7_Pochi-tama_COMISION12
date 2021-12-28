function cookieSession (req, res, next) {
    if(req.cookies.userArtisticaDali){
        req.session.user = req.cookies.userPochiTama;
        res.locals.user = req.session.user
    }
    next()
}

module.exports = cookieSession