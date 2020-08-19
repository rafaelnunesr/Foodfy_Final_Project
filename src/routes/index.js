const express = require('express')
const routes = express.Router()

//const users = require('./users')
//const chefs = require('./chefs')
const public = require('./public')
const admin = require('./admin')
const login = require('./login')


routes.get('/', function(req, res) {
    return res.render('index')
})
    .use('/', public)
    .use('/', login)
    .use('/admin', admin)

module.exports = routes