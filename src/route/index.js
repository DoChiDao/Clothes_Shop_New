

const siteRoute = require('./site')
const logroute = require('./log')
const admroute = require('./admin')

function route(app){
    app.use('/admin', admroute)
    app.use('/login#',logroute)
    app.use('/', siteRoute);
}


module.exports = route