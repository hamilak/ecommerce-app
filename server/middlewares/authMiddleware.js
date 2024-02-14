const requireAuth = (req, res, next) => {
    if (req.session.id) {
        next()
    } else {
        res.redirect('/login')
    }
}
