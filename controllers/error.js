exports.get404 = (req, res, next) => {
    res.status(404).render('404', { // 404 : the name of pug file
        pageTitle: '404',
        path: '/404'
    }) // will use the default template engine - ex:pug 
}