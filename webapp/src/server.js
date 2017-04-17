var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

var isAuthorized = function (req) {
    return true
}

var doesExist = function (req) {
    return req.body.user === 'dude'
}

var secret = 'dude_token'

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.post('/login', function (req, res) {
    if (doesExist(req)) {
        res.jsonp({
            token: 'dude_token'
        })
    } else {
        res.sendStatus(403)
    }

})
server.use(function (req, res, next) {
    if (isAuthorized(req)) {
        next()
    } else {
        res.sendStatus(401)
    }
})
server.use(router)
server.listen(3000, function () {
    console.log('JSON Server is running')
})