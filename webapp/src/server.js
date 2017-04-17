var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()


server.use(middlewares)
server.use(function (req, res, next) {
    if (isAuthorized(req)) { // add your authorization logic here 
        next() // continue to JSON Server router 
    } else {
        res.sendStatus(401)
    }
})
server.use(router)
server.listen(3000, function () {
    console.log('JSON Server is running')
})