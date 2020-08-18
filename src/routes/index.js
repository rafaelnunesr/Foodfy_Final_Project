const express = require('express')
const routes = express.Router()

//const users = require('./users')
//const chefs = require('./chefs')
const public = require('./public')


routes.get('/', function(req, res) {
    return res.render('index')
})

routes.use('/', public)

module.exports = routes