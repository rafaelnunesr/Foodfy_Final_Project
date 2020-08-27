const express = require('express')
const routes = express.Router()

const users = require('./users')
const chefs = require('./chefs')
const login = require('./login')
const recipes = require('./recipes')


routes.get('/', recipes)
    .use('/', login)
    .use('/', chefs)
    .use('/', recipes)
    .use('/', users)

module.exports = routes